import Footer from "@/components/root/Footer";
import Header from "@/components/root/Header";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="flex h-screen flex-col bg-secondary">
      <Header />

      {/* <div className=' justify-between h-full pt-16 '> */}
      <div className="flex-grow">
        <Outlet />
      </div>
      {/* </div> */}
      <Footer />
    </div>
  );
}
