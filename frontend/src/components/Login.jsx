import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import validation from '../validations/LoginValidation'
import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {
    const [values, setValues] = useState({
        email:'',
        password:'',
    });

    const navigate = useNavigate();

    const [error, setErrors] = useState(null);
    // const [token, setToken] = useState(localStorage.getItem('token') || "");

    const handleInput = (event) => {
        setValues((prev) => ({...prev, [event.target.name]:event.target.value }));
    }

    const handleSubmit = async (event) => {
        // setErrors(validation(values));
        event.preventDefault();
        setErrors(null);
        try {
          const response = await axios.post('http://localhost:8080/login', values);
          alert("Login Successfull");
          console.log(response);
          const receivedToken = response.data.token;
          Cookies.set('token', receivedToken, { expires: 1 / 24 });
          navigate('/home');
        } catch (err) {
            setErrors("Invalid Credentials.")
            alert("Login failed");
            console.error('Login failed: ', err);
        //   setErrors(err.response.data);
        }
      };

    //   useEffect(() => {
    //     console.log("Updated token: ", token);
    //   }, [token]);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setErrors(validation(values));
    //     if(errors.email === "" && errors.password === "") {
    //         axios.post("http://localhost:5000/login", values)
    //         .then(res => {
    //             if(res.data === "Success")
    //             {
    //                 navigate('/home');
    //             }
    //             else{
    //                 alert("No record found");
    //             }
    //         })
    //         .catch(err => console.log(err));
    //     }
    // }

    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign in</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong> Email </strong></label>
                        <input type='email' placeholder='Enter Email' name='email' value={values.email}
                        onChange={handleInput} className='form-control rounded-0'/>
                        {/* {errors.email && <span className='text-danger'>{errors.email}</span>} */}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong> Password </strong></label>
                        <input type='password' placeholder='Enter Password' name='password' value={values.password}
                        onChange={handleInput} className='form-control rounded-0'/>
                        {/* {errors.password && <span className='text-danger'>{errors.password}</span>} */}
                    </div>
                    {error && <span className='text-danger'>{error}</span>}
                    <button type='submit' className='btn btn-success w-100'><strong> Log in </strong></button>
                    <p>You are agree to our terms and policies</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login;