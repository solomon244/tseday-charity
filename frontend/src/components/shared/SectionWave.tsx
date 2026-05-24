import { cn } from "@/lib/cn";

type SectionWaveProps = {
  fillClass?: string;
  fill?: string;
  flip?: boolean;
  className?: string;
};

export function SectionWave({
  fillClass = "fill-theme-surface",
  fill,
  flip = false,
  className,
}: SectionWaveProps) {
  return (
    <div
      className={cn("pointer-events-none relative -mt-px block w-full leading-[0]", flip && "rotate-180", className)}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block h-10 w-full sm:h-14 md:h-16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,32 C240,80 480,0 720,32 C960,64 1200,16 1440,40 L1440,80 L0,80 Z"
          className={fill ? undefined : fillClass}
          fill={fill}
        />
      </svg>
    </div>
  );
}
