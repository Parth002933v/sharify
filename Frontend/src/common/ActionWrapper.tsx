import MenuBar from "@/components/simpleText/MenuBar";
import { ProtectTextButtonDialog } from "@/components/simpleText/protectTextButtonDialog";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks.ts";

type ActionWrappperProp = {
  children: React.ReactNode;
};

export default function ActionWrappper(prop: ActionWrappperProp) {
  const [messageDialog, setMessageDialog] = useState(false);
  const [isAskPassword, setAskPassword] = useState<boolean>(false);

  const isProtectedState = useAppSelector(
    (state) => state.simpleNote.isProtected,
  );

  useEffect(() => {
    if (isProtectedState) {
      setMessageDialog(true);
      setAskPassword(true);
    } else {
      setMessageDialog(false);
      setAskPassword(false);
    }
  }, [isProtectedState]);

  return (
    <div className="relative min-h-[calc(100vh-8rem)] bg-secondary max-lg:px-5">
      {/* Menus and Loaders */}
      <MenuBar />

      {/* Protect Text Button */}
      <div className="mx-[calc(100vw-13rem)] mb-6 flex h-5 flex-col">
        <ProtectTextButtonDialog
          isAskPassword={isAskPassword}
          messageDialog={messageDialog}
          setMessageDialog={setMessageDialog}
        />
      </div>

      {/* Children */}
      <div className="pb-3">{prop.children}</div>
    </div>
  );
}
