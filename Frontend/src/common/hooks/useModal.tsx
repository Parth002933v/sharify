import { ModalWrapper } from "@/components/richText/editor/components";
import { useCallback, useMemo, useState } from "react";
import * as React from "react";

// Define the shape of the modal content
interface IUseModal {
  title: string;
  content: React.ReactNode;
  closeOnClickOutside: boolean;
}

// Define the type for the function that returns content for the modal
type GetContentFunction = (onClose: () => void) => React.ReactNode;

export default function useModal() {
  const [modalContent, setModalContent] = useState<IUseModal | null>(null);

  const onClose = useCallback(() => {
    setModalContent(null);
  }, []);

  // Memoize the modal component to avoid unnecessary re-renders
  const modal = useMemo(() => {
    if (modalContent === null) {
      return null;
    }
    const { title, content } = modalContent;

    return (
      <ModalWrapper onClose={onClose} title={title} open={!!modalContent}>
        {content}
      </ModalWrapper>
    );
  }, [modalContent, onClose]);

  // Function to display the modal with specific content and title
  const showModal = useCallback(
    (
      title: string,
      getContent: GetContentFunction,
      closeOnClickOutside: boolean = false,
    ) => {
      setModalContent({
        closeOnClickOutside,
        content: getContent(onClose),
        title,
      });
    },
    [onClose],
  );

  // Return the modal component and the function to show it
  return [modal, showModal] as const;
}
