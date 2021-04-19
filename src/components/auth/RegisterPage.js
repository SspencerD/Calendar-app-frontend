import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useForm } from "../../hooks/UseForm";
import { startRegister} from '../../actions/auth';


export const RegisterPage = () => {

    const dispatch = useDispatch();


  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName: "David Rodriguez",
    rEmail: "drag@gmail.com",
    rPassword: "123456",
    rPassword2: "123456",
  });

  const { rName, rEmail, rPassword, rPassword2 } = formRegisterValues;

  const handleRegister = (e) =>{
      e.preventDefault();

      if( rPassword !== rPassword2){
          return Swal.fire('Error','Las contraseñas deben coincidir','error');
      }


      dispatch(startRegister(rEmail, rPassword, rName) );


  }

  return (
    <div>
      <div className="container login-container">
        <form onSubmit={handleRegister}>
          <div className="form-row">
            <div className="col-md-6 login-form-1">
              <h3>Register</h3>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  placeholder="your name"
                  name="rName"
                  value={rName}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  autoComplete="off"
                  placeholder="example@example.com"
                  name="rEmail"
                  value={rEmail}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="your password"
                  name="rPassword"
                  value={rPassword}
                  onChange={handleRegisterInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="reply your password"
                  name="rPassword2"
                  value={rPassword2}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <button className="btnSubmit">Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
