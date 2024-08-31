import { Editor } from "@/components/richText/editor";

export default function RrichText() {
  return (
    <div className="min-h-[calc(100vh-8rem)] w-full bg-secondary max-lg:px-5">
      richText
      <div className="pb-3">
        <Editor />
      </div>
    </div>
  );
}
