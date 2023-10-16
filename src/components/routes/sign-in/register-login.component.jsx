import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Google from "./google.component";
import { auth } from "../../Firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './sign-in.style.css';


const SignIn = (props) => {
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const namaHandler = (event) => {
        const x = event.target.value;
        setNama(x);
    };

    const emailHandler = (event) => {
        const x = event.target.value;
        setEmail(x);
    };

    const passHandler = (event) => {
        const x = event.target.value;
        setPassword(x);
    }

    const expenses = (e) => {
        e.preventDefault();
        const data = {
            nama:nama,
            email:email,
            password:password
        };
        console.log(data);
        setNama('');
        setEmail('');
        setPassword('');

        createUserWithEmailAndPassword(auth,email,password,nama).then(data => {
            console.log(data,"authData");
            navigateHandler(data);
        }).catch((error) => {
            console.log(error.message)
        });
    };

    const navigate = useNavigate()
    const navigateHandler = () => {
        navigate("/number");
    }

    return (
        <div>
            <form onSubmit={expenses}>
                {props.form.map((items) => (
                    <div key={items.id}>
                        <label>{items.nama}</label>
                        <input type="text" name="name" value={nama} onChange={namaHandler} />
                        <label>{items.email}</label>
                        <input type="email" name="email" value={email} onChange={emailHandler} />
                        <label>{items.password}</label>
                        <input type="password" name="password" value={password} onChange={passHandler} />
                        <div className="button-container">
                            <button className="sign-in-button">Sign in</button>
                        </div>
                        <Google />
                    </div>
                ))}               
            </form>
        </div>
    );
}

export default SignIn;
