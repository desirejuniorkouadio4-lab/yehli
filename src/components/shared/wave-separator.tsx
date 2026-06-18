import { cn } from "@/lib/utils";

type WaveSeparatorProps = {
  topColor?: string;
  bottomColor?: string;
  className?: string;
  flip?: boolean;
};

export function WaveSeparator({
  topColor = "#FFFFFF",
  bottomColor = "#EAF4EC",
  className,
  flip = false,
}: WaveSeparatorProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative w-full leading-[0]", className)}
      style={{ backgroundColor: bottomColor }}
    >
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className={cn("block h-[28px] w-full sm:h-[40px]", flip && "scale-x-[-1]")}
        role="presentation"
      >
        <path
          d="M0,0 L0,32 Q360,52 720,32 Q1080,12 1440,32 L1440,0 Z"
          fill={topColor}
        />
      </svg>
    </div>
  );
}
