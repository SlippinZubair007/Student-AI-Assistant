"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Message = {
  type?: string;
  transcript?: string;
  transcriptType?: string;
  role?: string;
  content?: string;
};

const GenerateProgramPage = () => {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [callEnded, setCallEnded] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Ignore known "Meeting has ended" error
  useEffect(() => {
    const originalError = console.error;
    console.error = function (msg, ...args) {
      if (
        msg &&
        (msg.includes("Meeting has ended") ||
          (args[0] && args[0].toString().includes("Meeting has ended")))
      ) {
        console.log("Ignoring known error: Meeting has ended");
        return;
      }
      return originalError.call(console, msg, ...args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Redirect to profile
  useEffect(() => {
    if (callEnded) {
      const redirectTimer = setTimeout(() => {
        router.push("/profile");
      }, 1500);
      return () => clearTimeout(redirectTimer);
    }
  }, [callEnded, router]);

  useEffect(() => {
    const handleCallStart = () => {
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };

    const handleCallEnd = () => {
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    };

    const handleSpeechStart = () => {
      setIsSpeaking(true);
    };

    const handleSpeechEnd = () => {
      setIsSpeaking(false);
    };

    const handleMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { content: message.transcript, role: message.role };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const handleError = (error: unknown) => {
      console.log("Vapi Error", error);
      setConnecting(false);
      setCallActive(false);
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    };
  }, []);

  const toggleCall = async () => {
    if (callActive) {
      vapi.stop();
    } else {
      try {
        setConnecting(true);
        setMessages([]);
        setCallEnded(false);

        const fullName = user?.firstName
          ? `${user.firstName} ${user.lastName || ""}`.trim()
          : "There";

        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
          variableValues: {
            full_name: fullName,
            user_id: user?.id,
          },
        });
      } catch (error) {
        console.log("Failed to start call", error);
        setConnecting(false);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden  pb-6 pt-24">
      <div className="container mx-auto px-4 h-full max-w-5xl">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-mono">
            <span>Flare.AI </span>
            <span className="text-red-900 ">Agent</span>
          </h1>
          <p className=" text-gray-400 mt-2">
            Have a voice conversation with Flare.AI assistant to ask any queries or create your study plans
          </p>
        </div>

        {/* VIDEO CALL AREA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* AI ASSISTANT CARD */}
          <Card className="bg-black backdrop-blur-sm border border-red-900 overflow-hidden relative">
            <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
              {/* AI VOICE ANIMATION */}
              <div
                className={`absolute inset-0 ${
                  isSpeaking ? "opacity-30" : "opacity-0"
                } transition-opacity duration-300`}
              >
                {/* Voice wave animation when speaking */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-20">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`mx-1 h-16 w-1 bg-primary rounded-full ${
                        isSpeaking ? "animate-sound-wave" : ""
                      }`}
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        height: isSpeaking ? `${Math.random() * 50 + 20}%` : "5%",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* AI IMAGE */}
              <div className="relative size-32 mb-4">
                <div
                  className={`absolute inset-0 bg-primary opacity-10 rounded-full blur-lg ${
                    isSpeaking ? "animate-pulse" : ""
                  }`}
                />

                <div className="relative w-full h-full rounded-full bg-card flex items-center justify-center border border-border overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-secondary/10"></div>
                 <Image
  src="/Flarelogo.png"
  alt="Flare AI"
  fill
  className="object-cover"
/>

<Image
  src={user?.imageUrl || "/placeholder.png"} // fallback if user image fails
  alt="User"
  width={128}
  height={128}
  className="rounded-full object-cover"
/>
                </div>
              </div>

              <h2 className="text-xl font-bold text-amber-500">Flare.AI</h2>
              <p className="text-sm text-gray-400 mt-1">Flarepreps virtual assistant</p>

              {/* SPEAKING INDICATOR */}

              <div
                className={`mt-4 bg-amber-500 flex items-center gap-2 px-3 py-1 rounded-full border-red-900  ${
                  isSpeaking ? "border-green-600" : ""
                }`}
              >
                <div
                  className={`bg-red-600 w-2 h-2 rounded-full ${
                    isSpeaking ? "bg-green-600 animate-pulse" : "bg-muted"
                  }`}
                />

                <span className="text-xs text-">
                  {isSpeaking
                    ? "Speaking..."
                    : callActive
                      ? "Listening..."
                      : callEnded
                        ? "Redirecting to profile..."
                        : "Waiting..."}
                </span>
              </div>
            </div>
          </Card>

          {/* USER CARD */}
          <Card className={`bg-black backdrop-blur-sm border border-red-900 overflow-hidden relative`}>
            <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
              {/* User Image */}
              <div className="relative size-32 mb-4">
<Image
  src={user?.imageUrl || "/placeholder.png"}
  alt="User"
  className="size-full object-cover rounded-full"
  fill // only if the container is position-relative
/>

              </div>

              <h2 className="text-xl font-bold text-amber-500">You</h2>
              <p className="text-sm text-gray-400 mt-1">
                {user ? (user.firstName + " " + (user.lastName || "")).trim() : "Guest"}
              </p>

              {/* User Ready Text */}
              <div className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 border-red-500`}>
                <div className={`w-2 h-2 rounded-full bg-red-600`} />
                <span className="text-xs text-black">Ready</span>
              </div>
            </div>
          </Card>
        </div>

        {/* MESSAGE COINTER  */}
        {messages.length > 0 && (
          <div
            ref={messageContainerRef}
            className="w-full bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 mb-8 h-64 overflow-y-auto transition-all duration-300 scroll-smooth"
          >
            <div className="space-y-3">
              {messages.map((msg, index) => (
                <div key={index} className="message-item animate-fadeIn">
                  <div className="font-semibold text-xs text-muted-foreground mb-1">
                    {msg.role === "assistant" ? "Flare.AI" : "You"}:
                  </div>
                  <p className="text-foreground">{msg.content}</p>
                </div>
              ))}

              {callEnded && (
                <div className="message-item animate-fadeIn">
                  <div className="font-semibold text-xs text-primary mb-1">System:</div>
                  <p className="text-foreground">
                    Study Plan created ! Redirecting to your profile...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CALL CONTROLS */}
        <div className="w-full flex justify-center gap-4">
          <Button
            className={`w-40 text-xl rounded-3xl ${
              callActive
                ? "bg-destructive hover:bg-destructive/90"
                : callEnded
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-primary hover:bg-primary/90"
            } text-white relative`}
            onClick={toggleCall}
            disabled={connecting || callEnded}
          >
            {connecting && (
              <span className="absolute inset-0 rounded-full animate-ping bg-primary/50 opacity-75"></span>
            )}

            <span>
              {callActive
                ? "End Call"
                : connecting
                  ? "Connecting..."
                  : callEnded
                    ? "View Profile"
                    : "Start Call"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default GenerateProgramPage;