import { Toaster } from "react-hot-toast";
import "./styles/App.css";

// Import the extracted routes
import { AppRoutes } from "./routes";

export default function App() {
  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#4CAF50",
              color: "white",
            },
          },
          error: {
            style: {
              background: "#F44336",
              color: "white",
            },
          },
        }}
      />
    </>
  );
}
