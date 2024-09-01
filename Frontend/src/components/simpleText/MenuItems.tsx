import { Earth } from "lucide-react";

export function MenuItem() {
  return (
    <div className="my-2 flex h-12 w-full items-center justify-center rounded-md border bg-white px-3">
      <Earth />
      <p className="text-center text-sm">Publish As Web Page</p>
    </div>
  );
}
