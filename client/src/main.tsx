import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { createHead } from "@/lib/create-head";

// Create head element for the HTML document
createHead({
  title: "HealthHub - Integrated Wellness Center",
  description: "Your complete wellness destination with integrated medical care, fitness, nutrition, and healthy products.",
  url: window.location.href,
});

createRoot(document.getElementById("root")!).render(<App />);
