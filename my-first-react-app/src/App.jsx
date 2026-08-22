import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import UserPage from "./UserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/user/:username" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;