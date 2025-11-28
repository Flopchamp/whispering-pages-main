import { Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-primary text-primary animate-pulse" />
            <span>for poetry lovers</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {currentYear} Mary B. Paul. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
