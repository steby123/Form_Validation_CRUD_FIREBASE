import React, { useEffect, useState } from "react";
import emailjs from 'emailjs-com';
import './Form_Valadation.styles.css';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";

const FormValidation = (props) => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "users");

  const createUser = async () => {
    try {
      await addDoc(userCollectionRef, {
        nama: nama,
        email: email,
        age: age,
        message: message,
      });

      // Fetch the updated user data from Firebase and update the state.
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      // Clear input fields
      setNama('');
      setEmail('');
      setAge('');
      setMessage('');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const updateUser = async (id, newAge) => {
    try {
      const userRef = doc(db, 'users', id);
      await updateDoc(userRef, { age: newAge });

      // Fetch the updated user data from Firebase and update the state.
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const userRef = doc(db, 'users', id);
      await deleteDoc(userRef);

      // Update the state by filtering out the deleted user.
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const namaHandler = (event) => {
    const x = event.target.value;
    if (x.length <= 30) {
      setNama(x);
      console.log(x);
    } else {
      alert("Maaf, kamu melebihi dari 30 huruf");
    }
  };

  const emailHandler = (event) => {
    const x = event.target.value;
    if (x.length <= 50) {
      setEmail(x);
      console.log(x);
    } else {
      alert("Maaf, kamu melebihi dari 50 huruf");
    }
  };

  const ageHandler = (event) => {
    const x = event.target.value;
    const isNumeric = /^[0-9]+$/.test(x);

    if (isNumeric && x.length <= 100) {
      setAge(x);
      console.log(x);
    } else {
      alert("Maaf, harus berisi maksimal 30 karakter numerik.");
    }
  };

  const messageHandler = (event) => {
    const x = event.target.value;
    setMessage(x);
    console.log(x);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_pjwvzzp', // email service
        'template_sf6bou4', // email template
        e.target,
        "FgxMdZ3_Tm80blQq1" // public key
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error.message));

    const expenses = {
      nama: nama,
      email: email,
      age: age,
      message: message,
    };
    console.log(expenses);
    setMessage(''); // Clear the fields after submission
    setNama('');
    setAge('');
    setEmail('');
  };

  return (
    <div className="body">
      <div className="form-validation-container">
        <h1>Form Validation</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nama:</label>
            <input
              className="text1"
              type="text"
              name="name"
              value={nama}
              onChange={namaHandler}
            />
            <label>Email:</label>
            <input
              className="text1"
              type="email"
              name="email"
              value={email}
              onChange={emailHandler}
            />
            <label>Age:</label>
            <input
              className="text1"
              type="text"
              name="age"
              value={age}
              onChange={ageHandler}
            />
            <label>Message:</label>
            <textarea
              name="message"
              rows="4"
              value={message}
              onChange={messageHandler}
            />
          </div>
          <input type="submit" value="Form" onClick={createUser} />
        </form>
      </div>

      <div className="user-table">
        {users.map((user) => (
          <div key={user.id}>
            {/* Display user data */}
            <h1>Nama: {user.nama}</h1>
            <h1>Email: {user.email}</h1>
            <h1>Age: {user.age}</h1>
            <h1>Message: {user.message}</h1>

            {/* Add buttons for editing and deleting */}
            <button onClick={() => updateUser(user.id, user.age)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormValidation;
