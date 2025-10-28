const BreathingCircle = () => {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="relative w-40 h-40 flex items-center justify-center">
        <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-primary/30 to-accent/30 animate-breathe" />
        <div
          className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-breathe"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 animate-breathe"
          style={{ animationDelay: "1s" }}
        />
      </div>
      <div className="text-center space-y-2 animate-gentle-pulse">
        <p className="text-sm font-medium text-foreground/80">
          Breathe with the circle
        </p>
        <p className="text-xs text-muted-foreground">
          Inhale as it grows, exhale as it shrinks
        </p>
      </div>
    </div>
  );
};

export default BreathingCircle;
