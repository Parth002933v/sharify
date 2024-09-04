import Footer from "@/components/root/Footer";
import Header from "@/components/root/Header";
import { Link, Outlet, useNavigation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { HOME_PATH } from "@/common/routeConstant";

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
      <LoadingBar color="#ffffff" ref={loadingBarRef} />
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

export function Uploaderlayout() {
  return (
    <Link to={HOME_PATH} className="min-h-screen ">
      <header className="bg-indigo-600 py-4 text-white shadow-lg">
        <h1 className="text-center text-4xl font-bold">Sharify</h1>
        <p className="mt-2 text-center">Share your files easily and securely</p>
      </header>

      <Outlet />
    </Link>
  );
}
