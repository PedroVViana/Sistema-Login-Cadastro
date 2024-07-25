import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';

// Validação do formulário de registro
const validationSchema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  phone: Yup.string().matches(/^\d{10,11}$/, 'Telefone inválido').required('Telefone é obrigatório'),
  password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
});

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await register(values.name, values.email, values.phone, values.password);
      alert('Registro realizado com sucesso!');
      navigate('/login');  // Redireciona para a página de login após o sucesso
    } catch (error) {
      alert('Falha no registro: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', phone: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className='content'>
            <label htmlFor="name">Nome:</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div className='content'>
            <label htmlFor="email">Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div className='content'>
            <label htmlFor="phone">Telefone:</label>
            <Field type="text" name="phone" />
            <ErrorMessage name="phone" component="div" />
          </div>
          <div className='content'>
            <label htmlFor="password">Senha:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>Register</button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
