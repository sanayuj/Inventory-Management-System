import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRoute from "./Routes/UserRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
