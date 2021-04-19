import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/UseForm';


import '../styles/components/login.css';

export const LoginPage = () => {

    const dispatch = useDispatch();

   const [ formLoginValues , handleLoginInputChange] = useForm({


    lEmail:'sspencer@gmail.com',
    lPassword:'123456'

   } );

   const { lEmail,lPassword} = formLoginValues;

   const handleLogin = (e) => {
       e.preventDefault();

       dispatch(startLogin(lEmail,lPassword));

   }
   



    return (

        <div className="container login-container">

            <form onSubmit={ handleLogin }>
                <div className="form-row">
                    <div className="col-md-6 login-form-1">
                        <h3>Login</h3>
                        <div className="form-group">

                            <input
                                type="email"
                                className="form-control"
                                name="lEmail"
                                autoComplete="off"
                                placeholder="example@example.com"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                                />

                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                name="lPassword"
                                placeholder="your password"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                                />
                        </div>
                        <button className="btnSubmit">

                    ingresar

                </button>
                    </div>
                </div>

            </form >
        </div >
    )
}
