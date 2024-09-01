import { Button } from "../components/ui/button";
import { useHashID } from "@/hooks/useHashID";

export default function Dashboard() {
  const { generateAndSetHash } = useHashID();

  return (
    <div className="h-full place-content-center bg-secondary p-6 text-center">
      <h1 className="mb-4 text-3xl font-bold">Welcome to Sharify!</h1>
      <p className="mb-6 text-lg">
        Share your content, connect with others, and explore a world of ideas.
      </p>
      <Button
        onClick={() => generateAndSetHash()}
        variant="default"
        className="bg-blue-500 px-7 py-6 text-lg hover:bg-blue-600"
      >
        Get Started
      </Button>
    </div>
  );
}
