import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, Navigate } from 'react-router-dom';
import { LoginApi } from '../Services/Api';
import { isAuthenticated } from '../Services/Auth';
import { storeUserData } from '../Services/Storage';
import NavBar from '../components/NavBar';
import './LoginPage.css';

export default function LoginPage() {
    const initialStateErrors = {
        email: { required: false },
        password: { required: false },
        custom_error: null
    };

    const [errors, setErrors] = useState(initialStateErrors);
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        console.log(inputs);
        event.preventDefault();
        let errors = initialStateErrors;
        let hasError = false;

        if (inputs.email === "") {
            errors.email.required = true;
            hasError = true;
        }
        if (inputs.password === "") {
            errors.password.required = true;
            hasError = true;
        }
        if (!hasError) {
            setLoading(true);
            // Sending login API request
            LoginApi(inputs).then((response) => {
                storeUserData(response.data.idToken);
            }).catch((err) => {
                if (err.code === "ERR_BAD_REQUEST") {
                    setErrors({ ...errors, custom_error: "Invalid Credentials." });
                }
            }).finally(() => {
                setLoading(false);
            });
        }
        setErrors({ ...errors });
    }

    if (isAuthenticated()) {
        // Redirect to the dashboard
        return <Navigate to="/dashboard" />
    }

    return (
        <div>
            <NavBar />
            <section className="login-block">
                <div className="container">
                    <div className="row ">
                        <div className="col login-sec">
                            <h2 className="text-center">Login Now</h2>
                            <form onSubmit={handleSubmit} className="login-form" action="">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                                    <input type="email" className="form-control" onChange={handleInput} name="email" id="" placeholder="email" />
                                    {errors.email.required ? (
                                        <span className="text-danger" >
                                            Email is required.
                                        </span>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                                    <div className="input-group">
                                        <input
                                            className="form-control"
                                            type={passwordVisible ? "text" : "password"}
                                            name="password"
                                            placeholder="password"
                                            value={inputs.password}
                                            onChange={handleInput}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                type="button"
                                                className="toggle-password btn btn-outline-secondary"
                                                onClick={() => setPasswordVisible(!passwordVisible)}
                                            >
                                                {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                                            </button>
                                        </div>
                                    </div>
                                    {errors.password.required ? (
                                        <span className="text-danger">Password is required.</span>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    {loading ? (
                                        <div className="text-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="sr-only"></span>
                                            </div>
                                        </div>
                                    ) : null}
                                    <span className="text-danger">
                                        {errors.custom_error ? (
                                            <p>{errors.custom_error}</p>
                                        ) : null}
                                    </span>
                                    <Button type="submit" className="btn btn-login float-right" disabled={loading}>Login</Button>
                                </div>
                                <div className="clearfix"></div>
                                <div className="form-group">
                                    Create a new account? Please <Link to="/register">Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}