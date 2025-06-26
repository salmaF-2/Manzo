// Configuration principale
// import Sidebar from './components/Sidebar';
import AppRoutes from './routes';
import { Toaster } from 'sonner';
import React from 'react';
// import './App.css';

function App() {
  return (
    <div>
      <AppRoutes/>
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}

export default App;
