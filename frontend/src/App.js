import { BrowserRouter, Routes, Route } from "react-router-dom";
 import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import UserRoute from "./Routes/UserRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserRoute />} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
