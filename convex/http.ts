import {httpRouter} from 'convex/server';
import {WebhookEvent} from '@clerk/nextjs/server';
import {Webhook} from 'svix';
import {api} from './_generated/api';
import {httpAction} from './_generated/server';

const http =httpRouter();

http.route({
    path:"/clerk-webhook",
    method:"POST",
    handler:httpAction(async (ctx,request)=>{
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
        if (!webhookSecret) {
            throw new Error("Missing ENV CLERK_WEBHOOK_SECRET is not set");
        }


        const svix_id=request.headers.get("svix-id");
        const svix_signature =request.headers.get("svix-signature");
        const svix_timestamp = request.headers.get("svix-timestamp");

        if (!svix_id || !svix_signature || !svix_timestamp) {
            throw new Response("Missing required headers: svix-id, svix-signature, svix-timestamp", {
                status: 400,
            });
        }

        const payload = await request.json();
        const body = JSON.stringify(payload);

        const wh= new Webhook(webhookSecret);
        let evt:WebhookEvent;

        try{
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-signature": svix_signature,
                "svix-timestamp": svix_timestamp,
            }) as WebhookEvent;
        } catch (error) {
            console.error("Webhook verification failed:", error);
            return new Response("Invalid webhook signature", { status: 400 });
        }

        const eventType = evt.type;

        if(eventType==="user.created"){
            const {id,first_name,last_name,image_url,email_addresses}=evt.data;
            const email = email_addresses[0].email_address;
            const name= `${first_name || ""} ${last_name || ""}`.trim();
            try{ 
                await ctx.runMutation(api.users.syncUser, {
                    clerkId: id,
                    name,
                    email,
                    profilePicture: image_url || undefined,
                });
            } catch (error) {
                console.error("Error syncing user:", error);
                return new Response("Failed to sync user", { status: 500 });
            }
        }
        return new Response("Webhook processed successfully", { status: 200 });
    })
})

export default http;