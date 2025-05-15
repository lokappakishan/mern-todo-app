import { ToastContainer } from 'react-toastify';
import './App.css';
import AuthPage from './pages/AuthPage';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div data-theme="light" className="min-h-screen bg-base-200">
        <ToastContainer />
        <AuthPage />
      </div>
    </BrowserRouter>
  );
}

export default App;
