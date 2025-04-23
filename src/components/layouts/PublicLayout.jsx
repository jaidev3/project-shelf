import { Outlet } from "react-router-dom";
import PublicHeader from "../navigation/PublicHeader";
import Footer from "../navigation/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
