import { RouterProvider } from 'react-router-dom';
import { router } from './router/index';
import ToastContainer from './components/ToastContainer';
import './App.css';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;

