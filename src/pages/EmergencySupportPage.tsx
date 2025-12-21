import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EmergencySupport = () => {
  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <div className="space-y-3">
          {/* <h1 className="text-4xl md:text-5xl font-semibold text-primary leading-tight">
          </h1> */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            We're Here for You
          </h1>
          <p className="text-lg text-muted-foreground">
            If you're feeling overwhelmed or need support, help is just one tap
            away.
          </p>
        </div>

        <div
          className="mt-12 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <Link to="/crisis">
            <Button size="lg" className="text-base px-8 py-6">
              I Need Help Now
            </Button>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            Access immediate support and resources
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencySupport;
