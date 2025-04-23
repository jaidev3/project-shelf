import { Outlet } from "react-router-dom";
import PublicHeader from "../navigation/PublicHeader";
import Footer from "../navigation/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
