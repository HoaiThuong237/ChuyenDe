import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme/theme.js';
import Home from './pages/home/index.js';
import Login from './pages/login/index.js';
import Register from './pages/register/index.js';
import Forgotpass from './pages/forgotpass/index.js';
import Introduce from './pages/introduce';
import ChatAI from './pages/ai';

import ProtectedRoute from './protectroute.js';
import reportWebVitals from './reportWebVitals';

const  App = () =>{
  const user = localStorage.getItem("user");
  const rememberLogin = localStorage.getItem("rememberLogin") === "true";
  const isLoggedIn = user !== null && (rememberLogin || sessionStorage.getItem("user") !== null);
  
    return(
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
              <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/bepnhaminh" /> : <Introduce />} />
                <Route path="/dangnhap" element={<Login />} />
                <Route path="/bepnhaminh/*" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path='/dangky' element={<Register />} />
                <Route path='/quenmatkhau' element={<Forgotpass />} />
                <Route path="/gioithieu" element={<Introduce />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/ai" element={<ChatAI />} />
              </Routes>
        </ThemeProvider>
      </Router>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
