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
import ProtectedRoute from './protectroute.js';
import reportWebVitals from './reportWebVitals';

const  App = () =>{
  
  const isLoggedIn = localStorage.getItem("user") !== null || localStorage.getItem("rememberLogin") === "true";



    return(
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
              <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Introduce />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path='/register' element={<Register />} />
                <Route path='/forgotpass' element={<Forgotpass />} />
                <Route path="/introduce" element={<Introduce />} />
                <Route path="*" element={<Navigate to="/" />} />
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
