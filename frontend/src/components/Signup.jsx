import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import validation from '../validations/SignupValidation';
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues((prev) => ({...prev, [event.target.name]:event.target.value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost:8080/signup', values);
          console.log(response.data);
          alert("User Successfully Register.");
          navigate('/');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                const errorData = err.response.data.errors;
          
                const errorMap = {};
                errorData.forEach(error => {
                  errorMap[error.param] = error.msg;
                });
          
                setErrors(errorMap);
              } else {
                console.error('Registration failed: ', err);
              }
        }
      };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setErrors(validation(values));
    //     if(errors.name === "" && errors.email === "" && errors.password === "") {
    //         axios.post("http://localhost:5000/signup", values)
    //         .then(res => {
    //             navigate('/');
    //         })
    //         .catch(err => console.log(err));
    //     }
    // }

    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign up</h2>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name'><strong> Name </strong></label>
                        <input type='name' placeholder='Enter Your Name' name='name'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {/* {errors.name && <span className='text-danger'>{errors.name}</span>} */}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong> Email </strong></label>
                        <input type='email' placeholder='Enter Email' name='email'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {/* {errors.email && <span className='text-danger'>{errors.email}</span>} */}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong> Password </strong></label>
                        <input type='password' placeholder='Enter Password' name='password' 
                        onChange={handleInput} className='form-control rounded-0'/>
                        {/* {errors.password && <span className='text-danger'>{errors.password}</span>} */}
                    </div>
                    <button type='submit' className='btn btn-success w-100'><strong> Sign up </strong></button>
                    <p>You are agree to our terms and policies</p>
                    <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log in</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup;