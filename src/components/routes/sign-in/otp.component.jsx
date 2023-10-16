import React, { useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './otp.component.css';
import { Button } from "react-bootstrap";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import { useNavigate } from "react-router-dom";

const NumberPhone = () => {
    const [phone, setPhone] = useState("");
    const [user, setUser] = useState(null);
    const [otp, setOTP] = useState("");

    const sendOtp = async () => {
        try {
            const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
            const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
            setUser(confirmation);
            console.log(confirmation);
        } catch (error) {
            console.log(error.message);
        }
    }

    const verifyOtp = async () => {
        try {
            const data = await user.confirm(otp); // Verify OTP
            console.log(data);
            navigateHandler(); // go other router
        } catch (error) {
            console.log(error.message);
        }
    };

    const navigate = useNavigate();

    const navigateHandler = () => {
        navigate("/form-validation");
    }

    return (
        <div className="phone-signin">
            <div className="phone-content">
                <PhoneInput
                    country={"id"}
                    value={phone}
                    onChange={(phone) => setPhone("+" + phone)}
                />
                <Button onClick={sendOtp} sx={{ marginTop: "10px" }} variant='contained' className="btn">Send OTP</Button>
                <div style={{ marginTop: "10px" }} id="recaptcha"></div>
                <input
                    type='text'
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    placeholder="Enter OTP"
                />
                <Button onClick={verifyOtp} sx={{ marginTop: "10px" }} variant="contained" color="success" className="btn1">Verify OTP</Button>
            </div>
        </div>
    )
}

export default NumberPhone;
