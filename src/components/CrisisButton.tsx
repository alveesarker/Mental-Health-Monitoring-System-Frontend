import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertCircle, MessageSquare, Phone } from "lucide-react"; // Added MessageSquare for the text line

export function CrisisButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          // **Redesign: Enhanced visual prominence and style**
          variant="destructive"
          className="
            gap-2 
            font-semibold 
            rounded-lg // Matches the corners in the image
            shadow-xl // Stronger to pop off the clean dashboard
            hover:scale-[1.03] // Slightly reduced scale for elegance
            transition-all duration-300
            px-5 py-3 // Extra padding for a more solid, inviting button
          "
        >
          <AlertCircle className="w-5 h-5 animate-pulse" />{" "}
          {/* Subtle pulse animation for urgency */}
          Need Help Now?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-destructive font-extrabold text-2xl">
            <AlertCircle className="w-7 h-7" />
            Immediate Support
          </DialogTitle>
          <DialogDescription className="text-left pt-3 text-base text-gray-700">
            If you're in immediate danger or experiencing a mental health
            crisis, please reach out for confidential help:
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-3">
          {/* CARD 1: National Hotline (Destructive Color Focus) */}
          <div className="bg-destructive/10 rounded-xl p-5 border border-destructive/30 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-3">
              <Phone className="w-6 h-6 text-destructive flex-shrink-0" />
              <h3 className="font-bold text-lg text-foreground">
                24/7 Crisis Hotline
              </h3>
            </div>
            {/* Call to action button for mobile users */}
            <Button
              asChild
              variant="destructive"
              className="w-full text-2xl font-extrabold h-14"
            >
              <a href="tel:988">Call 988</a>
            </Button>
            <p className="text-sm text-center text-destructive/80 mt-2">
              Suicide & Crisis Lifeline
            </p>
          </div>

          {/* CARD 2: Crisis Text Line (Accent/Primary Color) */}
          {/* Using the primary color palette for a friendly, action-oriented look */}
          <div className="bg-primary/5 rounded-xl p-5 border border-primary/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-3">
              <MessageSquare className="w-6 h-6 text-primary flex-shrink-0" />
              <h3 className="font-bold text-lg text-foreground">
                Crisis Text Support
              </h3>
            </div>
            <p className="text-2xl font-extrabold text-primary mb-1">
              Text "HELLO" to 741741
            </p>
            <p className="text-sm text-muted-foreground">
              Free, 24/7 support via text message
            </p>
          </div>

          {/* CARD 3: Emergency Services (Subtle Styling) */}
          <div className="rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg text-foreground mb-2">
              Local Emergency Services
            </h3>
            <p className="text-2xl font-extrabold text-gray-800 mb-1">911</p>
            <p className="text-sm text-muted-foreground">
              For immediate medical or life-threatening emergencies.
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground text-center pt-4 italic">
          Remember, you are not alone. Help is available and people care about
          you.
        </p>
      </DialogContent>
    </Dialog>
  );
}
