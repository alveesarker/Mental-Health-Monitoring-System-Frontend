import { Button } from "@/components/ui/button";
import {  BookOpen, Sparkles, Calendar, Settings } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-foreground">WellBeing Hub</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary">
                <BookOpen className="h-4 w-4" />
                Dashboard
              </a>
              <a href="/hello" className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                <Sparkles className="h-4 w-4" />
                Recommendations
              </a>
              <a href="#" className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                <Calendar className="h-4 w-4" />
                Sessions
              </a>
              <a href="#" className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                <Settings className="h-4 w-4" />
                Settings
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-muted-foreground">
              Welcome back, <span className="font-medium text-foreground">Alvee</span>
            </div>
            <Button size="sm" className="gap-2">
              Quick Log
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
