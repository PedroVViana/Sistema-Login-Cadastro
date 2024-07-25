import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className='container'>
      <div className='card'>
        <h1>Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
