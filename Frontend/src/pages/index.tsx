import { useLocation } from "react-router-dom";
import SimpleText from "./SimpleText";
import Dashboard from "@/pages/Dashboard";

export default function Index() {
  const isUrlhasHash = useLocation();

  if (isUrlhasHash.hash) {
    return <SimpleText />;
    // return import("@/pages/SimpleText");
  } else {
    return <Dashboard />;
    // return import("@/pages/Dashboard");
  }
}
