import React, { useEffect, useState } from "react";
import { auth, provider } from "../../Firebase/Firebase";
import { signInWithPopup } from "firebase/auth";
import FormValidation from "../Form-Valadation/Form_Valadation.component";
import './google.style.css';
import { useNavigate } from "react-router-dom";

const Google = () => {
    const [value, setValue] = useState('');

    // Use the useNavigate hook to get the navigate function
    const navigate = useNavigate();

    // Function to navigate to another route
    const navigates = (email) => {
        navigate(`/form-validation/${email}`);
    }

    const signIn = () => {
        signInWithPopup(auth, provider).then((data) =>{
            setValue(data.user.email);
            navigates(data.user.email);
            localStorage.setItem("email", data.user.email);
        });
    };

    useEffect(() => {
        setValue(localStorage.getItem('email'))
    })

    return (
        <div className="button-container">
            {value ? <FormValidation /> :
                <button onClick={signIn} className="google-button">Sign In with Google</button>
            }
        </div>
    );
};

export default Google;
