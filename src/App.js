import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { CssBaseline } from '@mui/material';
import SessionStorage from './store/SessionStorage';
import Fallback from './components/Fallback';

function App() {
  const user = SessionStorage.getUser() ? JSON.parse(SessionStorage.getUser()) : '';

  return (
    <React.Fragment>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<Fallback />}>
          <Routes>
            {!Boolean(user) && <Route path="/login" element={<Login />} />}
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to={'/'} replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
