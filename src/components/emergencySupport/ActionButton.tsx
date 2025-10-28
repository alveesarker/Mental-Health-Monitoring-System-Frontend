import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "default" | "secondary" | "outline";
}
const ActionButton = ({
  icon: Icon,
  label,
  onClick,
  variant = "default",
}: ActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      className="w-full h-auto py-4 px-6 flex items-center justify-start gap-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-stone-50">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <span className="text-base font-medium">{label}</span>
    </Button>
  );
};
export default ActionButton;
