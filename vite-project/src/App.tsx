import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Global from './styles/global';

function App() {
  return (
    <>
      <Global />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          {/* Rotas antigas continuam funcionando e levam direto para a seção */}
          <Route path="/developer" element={<Main section="frontend" />} />
          <Route path="/electrical-technician" element={<Main section="automacao" />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
