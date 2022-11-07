import { Routes, Route } from 'react-router-dom'
import Scheduler from "./pages/WeekPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/week-view" element={<Scheduler />} />
    </Routes>
  );
}

export default App;
