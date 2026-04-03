import ContactApp from "./components/contact/ContactApp";
import "./global.css";
import { Route, Routes } from "react-router-dom";

const SlashRoute = () => (
  <div className="h-screen w-screen flex flex-col justify-center items-center">
    <h1 className="text-2xl">React powered by vite</h1>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={SlashRoute()} />
      <Route path="/contact" element={<ContactApp />} />
    </Routes>
  );
}

export default App;
