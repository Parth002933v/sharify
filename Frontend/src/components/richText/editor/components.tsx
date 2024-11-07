import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import React from "react";

//ModalWrapper
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

export function CEditable() {
  return (
    <ContentEditable
      title="editor"
      className="min-h-[900px] w-full rounded-bl-md rounded-br-md bg-white p-6 text-black outline-none"
    />
  );
}

export const Placeholder = () => {
  return (
    <div className="pointer-events-none absolute p-6 max-md:top-24 max-sm:top-32 md:top-10">
      Enter some text...
    </div>
  );
};

export function Divider() {
  return <div className="h-[1px]"></div>;
}

export function ModalWrapper({
  children,
  onClose,
  open,
  title,
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <DialogHeader>
            {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
            <DialogDescription>
              <div className="absolute left-1/2 top-1/2 min-w-[300px] -translate-x-1/2 -translate-y-1/2 transform bg-white shadow-xl">
                {title}
              </div>
              <Divider />
              <div className="p-2"> {children}</div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ px: 1 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {title}
          </Typography>
          <Divider />
          <Box sx={{ p: 2 }}>{children}</Box>
        </Box>
      </Modal> */}
    </div>
  );
}
