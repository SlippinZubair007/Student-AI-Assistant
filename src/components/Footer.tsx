import {Instagram,Phone,BookOpen,FlameKindling,Youtube,Facebook,Flame } from "lucide-react";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm">
      {/* Top border glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

      <div className="container mx-auto px-5 py-10">
        <div className="flex flex-col md:flex-row justify-between items-left gap-6">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="px-1 bg-primary/10 rounded">
                <Flame className="w-4 h-4 animate-pulse" />
              </div>
              <span className="text-xl font-bold text-white">
                Flare<span className="text-white">prep</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Flareprep - All rights reserved
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-10 gap-y-10 text-md pt-8">
            <div className="group relative flex flex-col items-center">
            <Link
              href="https://drive.google.com/drive/folders/1j9SDgreJRAUvoqpEHqiZTMhlPAXZonM4"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <BookOpen className="cursor-pointer"/>
              </Link>
              <span className="scale-0 transition-transform group-hover:scale-100">Resources</span>
            </div>
   
          <div className="group relative flex flex-col items-center">
            <Link
              href="https://www.instagram.com/flareprep?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram/>
            </Link>
            <span className="scale-0 transition-transform group-hover:scale-100">Instagram</span>
            </div>

         <div className="group relative flex flex-col items-center">
            <Link
              href="https://api.whatsapp.com/send?phone=03044767165"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone/>
            </Link>
            <span className="scale-0 transition-transform group-hover:scale-100">WhatsApp</span>
            </div>
          <div className="group relative flex flex-col items-center">
            <Link
              href="https://chat.whatsapp.com/FdximA88cIRFysOnwxRfc5 "
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FlameKindling/>
            </Link>
            <span className="scale-0 transition-transform group-hover:scale-100">Community</span>
            </div>

            <div className="group relative flex flex-col items-center">
            <Link
              href="https://www.youtube.com/@flareprep"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Youtube/>
            </Link>
            <span className="scale-0 transition-transform group-hover:scale-100">YouTube</span>
            </div>

            <div className="group relative flex flex-col items-center">
            <Link
              href="https://www.facebook.com/profile.php?id=61563112982377"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
                <Facebook/>
            </Link>
            <span className="scale-0 transition-transform group-hover:scale-100">Facebook</span>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-md bg-background/50">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-xs font-mono">SYSTEM OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;