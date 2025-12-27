import { Badge } from "./ui/badge";
import type { PhraseLabel } from "../types";

interface PhraseBadgeProps {
  label: PhraseLabel;
  size?: 'sm' | 'md' | 'lg';
}

export function PhraseBadge({ label, size = 'md' }: PhraseBadgeProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  return (
    <Badge 
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold bg-primary text-primary-foreground`}
    >
      {label}
    </Badge>
  );
}
