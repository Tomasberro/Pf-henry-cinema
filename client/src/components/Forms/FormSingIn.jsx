import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory,Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getToken, login } from "../../redux/users/usersAction";

function FormSingIn() {
  const usuario = useSelector((state) => state.users);
  const history = useHistory();
  const [userLog, setUserLog] = useState({
    msgErr: "",
    userData: undefined,
  });

  console.log("my users ", usuario);

  return (
    <div>
      <div>
        <Formik
          initialValues={{
            mail: "",
            password: "",
          }}
          validate={(valores) => {
            let errors = {};
            if (!valores.mail) {
              errors.mail = "Por favor ingresar un mail";
            }
            return errors;
          }}
          onSubmit={(body) => {
            async function sendLogin() {
              try {
                console.log('esto me llega al body',body)
                const x = await login(body);
                console.log("respuesta del log", x);
                if (!x.data) {
                  setUserLog({
                    msgErr: x,
                  });
                } else {
                  setUserLog({
                    userData: x,
                  });
                  history.push("/");
                }
              } catch (err) {
                console.log(err);
              }
            }
            sendLogin();
          }}
        >
          {({ errors }) => (
            <Form name="form">
              <label>Email</label>
              <Field name="mail" type="text" />
              <ErrorMessage
                name="mail"
                component={() => <div>{errors.mail}</div>}
              />
              <label>Contraseña</label>
              <Field name="password" type="password" />
              <button type="submit">Login</button>
              {console.log("este es log ", userLog)}
              {userLog.msgErr && <div>{userLog.msgErr}</div>}
            </Form>
          )}
        </Formik>
          <p>¿Todavia no tienes un usuario?
            <Link to = "/login/singUp">
            Create uno! 
            </Link>
          </p>
         
      </div>
    </div>
  );
}

export default FormSingIn;