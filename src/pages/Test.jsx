import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const Test = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-600">Test Page Working!</h1>
      <p className="text-lg mt-4">If you can see this, the routing is working.</p>
      <Button 
        onClick={() => navigate('/')}
        className="mt-4"
      >
        Go back to home
      </Button>
    </div>
  );
};

export default Test;
