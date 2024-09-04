import gsap from "gsap";
import { Earth, LucideProps } from "lucide-react";
import { useRef } from "react";

export function MenuItem({
  text = "value is not provide",
  Icon = Earth,
  onClick,
}: {
  text?: string;
  Icon?: React.ComponentType<LucideProps>;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="my-2 flex h-12 w-full items-center hover:bg-black/10 justify-center gap-2 rounded-md border bg-white px-3 hover:cursor-pointer"
      onClick={onClick}
    >
      <Icon />
      <p className="text-center text-sm">{text}</p>
    </div>
  );
}
