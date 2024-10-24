import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import LoginForm from './components/auth/LoginForm';
import Navigation from './components/layout/Navigation';
import PrizeWheel from './components/PrizeWheel';
import WalletPage from './pages/WalletPage';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/game" /> : <Navigate to="/login" />} 
          />
          <Route path="/login" element={<LoginForm />} />
          <Route 
            path="/game" 
            element={
              <PrivateRoute 
                element={
                  <div className="container mx-auto pt-20 pb-24 flex flex-col items-center justify-center min-h-screen">
                    <PrizeWheel />
                  </div>
                } 
              />
            } 
          />
          <Route 
            path="/wallet" 
            element={
              <PrivateRoute 
                element={<WalletPage />} 
              />
            } 
          />
          <Route 
            path="/referral" 
            element={
              <PrivateRoute 
                element={
                  <div className="container mx-auto pt-20 pb-24">
                    <h1 className="text-2xl font-bold">Referral Program</h1>
                    {/* Referral component will go here */}
                  </div>
                } 
              />
            } 
          />
          <Route 
            path="/quests" 
            element={
              <PrivateRoute 
                element={
                  <div className="container mx-auto pt-20 pb-24">
                    <h1 className="text-2xl font-bold">Daily Quests</h1>
                    {/* Quests component will go here */}
                  </div>
                } 
              />
            } 
          />
        </Routes>
        {isAuthenticated && <Navigation />}
      </div>
    </Router>
  );
}

export default App;