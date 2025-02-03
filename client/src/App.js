import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import VideoChat from './pages/VideoChat';
import Preview from "./components/Preview.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/video/preview' element={<Preview />} />
        <Route path='/video/:roomId' element={<VideoChat />} />
      </Routes>
    </Router>
  );
}

export default App;
