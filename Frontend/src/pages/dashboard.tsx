import { Button } from "../components/ui/button";
import { useNavigate, Navigate } from "react-router-dom";
import { generateRandomHash } from "@/lib/utils";
import { useCheckNoteExistQuery } from "@/features/note/notesAPI";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [hashID, setHashID] = useState<string | null>(null);

  const { data, error, isFetching } = useCheckNoteExistQuery(hashID!, {
    skip: !hashID,
  });

  const handleGetStarted = () => {
    const newHash = generateRandomHash();
    setHashID(newHash);
  };

  useEffect(() => {
    if (hashID && !isFetching) {
      if (data?.statusCode == 200) {
        handleGetStarted();
      } else {
        navigate({ hash: hashID });
      }
    }
  }, [data, error, hashID, isFetching, navigate]);

  return (
    <div className="h-full place-content-center bg-secondary p-6 text-center">
      <h1 className="mb-4 text-3xl font-bold">Welcome to Sharify!</h1>
      <p className="mb-6 text-lg">
        Share your content, connect with others, and explore a world of ideas.
      </p>
      <Button
        onClick={() => handleGetStarted()}
        variant="default"
        className="bg-blue-500 px-7 py-6 text-lg hover:bg-blue-600"
      >
        Get Started
      </Button>
    </div>
  );
}
