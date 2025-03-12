import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ElectricalTechnician from './pages/Electrical-Technician';
import Developer from './pages/Developer';
import Main from './pages/Main';
import Global from './styles/global';

function App() {
  return (
  <>
    <Global/>
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/electrical-technician" element={<ElectricalTechnician />} />
        <Route path="/Developer" element={<Developer />} />
      </Routes>
    </Router>
  </>
  )
}

export default App
