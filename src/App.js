import React from 'react';
import './App.css';
import FormValidation from './components/routes/Form-Valadation/Form_Valadation.component.jsx';
import SignIn from './components/routes/sign-in/register-login.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NumberPhone from './components/routes/sign-in/otp.component';

const expenses = [
  {
    id: 'e1',
    nama: 'Nama',
    email: 'Email',
    age: 'Umur',
    message: 'Message',
  }
];

const form = [
  {
    id: 'e2',
    nama: 'Nama',
    email: 'Email',
    password:'Password'
  }
];

const App = () => {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn form={form} />} />
          <Route path='/number' element={<NumberPhone />} />
          <Route path="/form-validation" element={<FormValidation expenses={expenses} />} /> 
        </Routes>
      </div>
  );
}

export default App;
