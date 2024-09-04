import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProviderProps,
} from "react-router-dom";

// pages
import Root, { Uploaderlayout } from "../pages/Root";
import Index from "../pages";
import RichText from "@/pages/RichText";
import {
  HOME_PATH,
  RICHTEXT_PATH,
  UPLOAD_FILE_PATH,
} from "@/common/routeConstant";
import FileUploader from "@/pages/FileUploader";

export const RoutesTSX: RouterProviderProps = {
  router: createBrowserRouter(
    createRoutesFromElements([
      <Route path={HOME_PATH} element={<Root />}>
        <Route index element={<Index />} />
        <Route path={RICHTEXT_PATH} element={<RichText />} />
      </Route>,
      <Route path={HOME_PATH} element={<Uploaderlayout />}>
        <Route path={UPLOAD_FILE_PATH} element={<FileUploader />} />
      </Route>,
    ]),
  ),
};
