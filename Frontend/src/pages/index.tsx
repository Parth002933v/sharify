import Dashboard from "@/pages/Dashboard";
import SimpleText from "@/pages/SimpleText";
import { useLocation } from "react-router-dom";

export default function Index() {
  const isUrlhasHash = useLocation();

  if (isUrlhasHash.hash) {
    return <SimpleText />;
  } else {
    return <Dashboard />;
  }
}
