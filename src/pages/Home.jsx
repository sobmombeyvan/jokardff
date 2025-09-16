import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard after 5 seconds
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Demo Notice */}
      <div className="bg-blue-600 text-white text-center py-2 px-4">
        <p className="text-sm font-medium">
          🎉 Demo Mode - Jokard App is Working!
        </p>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to Jokard</h1>
        <p className="text-center text-lg mb-8">Digital Business Card Platform</p>
        
        <div className="text-center space-y-4">
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors block w-full max-w-xs mx-auto"
          >
            Go to Dashboard
          </Button>
          
          <Button 
            onClick={() => navigate('/test')}
            variant="secondary"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors block w-full max-w-xs mx-auto"
          >
            Test Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
