import { Outlet } from "react-router-dom";
import Header from "./Header";
import ErrorBoundary from "../components/ErrorHandling";

const Layout = () => {
  return (
    <div>
        <ErrorBoundary><Header /></ErrorBoundary>
      
      <Outlet />
    </div>
  );
};

export default Layout;
