import Image from "next/image";
import { cn, getInitials } from "@/lib/utils";

type AvatarProps = {
  name: string;
  src?: string | null;
  size?: number;
  className?: string;
};

/** Avatar : photo si disponible, sinon initiales sur fond vert pâle. */
export function Avatar({ name, src, size = 48, className }: AvatarProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className={cn("rounded-full object-cover", className)}
      />
    );
  }
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-full bg-primary/10 font-bold text-primary",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {getInitials(name)}
    </span>
  );
}
