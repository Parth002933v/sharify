import Footer from "@/components/root/Footer";
import Header from "@/components/root/Header";
import { Outlet, useNavigation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

export default function Root() {
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "loading") {
      loadingBarRef.current?.continuousStart();
    } else if (navigation.state === "idle") {
      loadingBarRef.current?.complete();
    }
  }, [navigation.state]);

  return (
    <div className="flex h-screen flex-col bg-secondary">
      <LoadingBar color="#f11946" ref={loadingBarRef} />
      <Header />

      {/* <div className=' justify-between h-full pt-16 '> */}
      <div className="flex-grow">
        <Outlet />
        <Toaster />
      </div>
      {/* </div> */}
      <Footer />
    </div>
  );
}
