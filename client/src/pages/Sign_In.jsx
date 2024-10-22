import React from 'react';
import { SignIn } from '@clerk/clerk-react';

function Sign_In() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <SignIn forceRedirectUrl="/"/>
    </div>
  );
}

export default Sign_In;
