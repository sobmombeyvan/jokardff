import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import Test from './pages/Test';
import Help from './pages/Help';
import Dashboard from './pages/Dashboard';
import BusinessCards from './pages/BusinessCards';
import AddBusinessCard from './pages/AddBusinessCard';
import Settings from './pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/test" element={<Test />} />
            <Route path="/help" element={<Help />} />
            
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/bcards" element={<BusinessCards />} />
              <Route path="/dashboard/bcards/add" element={<AddBusinessCard />} />
              <Route path="/dashboard/settings" element={<Settings />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
