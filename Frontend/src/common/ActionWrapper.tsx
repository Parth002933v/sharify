import MenuBar from "@/components/simpleText/MenuBar";
import { ProtectTextButtonDialog } from "@/components/simpleText/protectTextButtonDialog";
import React, { useState } from "react";

type ActionWrappperProp = {
  children: React.ReactNode;
};

export default function ActionWrappper(prop: ActionWrappperProp) {
  const [isProtected, setIsProtected] = useState(false);
  const [messageDialog, setMessageDialog] = useState(false);

  return (
    <div className="relative min-h-[calc(100vh-8rem)] bg-secondary max-lg:px-5">
      {/* Menus and Loaders */}
      <MenuBar />

      {/* Protect Text Button */}
      <div className="mx-[calc(100vw-13rem)] flex flex-col">
        <ProtectTextButtonDialog
          text={`${isProtected ? "Unprotect Text" : "Protect Text"}`}
          messageDialog={messageDialog}
          setMessageDialog={setMessageDialog}
        />
      </div>

      {/* Children */}
      <div className="pb-3 ">{prop.children}</div>
    </div>
  );
}
