import React, { useState, FormEvent } from "react";
import InputText from "../../component/Input/inputText";
import ErrorText from "../../component/Typography/ErrorText";
import { useNavigate } from "react-router-dom";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const INITIAL_LOGIN_OBJ = {
    password: "",
    emailId: "",
  };
  // const [error, setError] = useState(false);

  const navitage = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] =
    useState<typeof INITIAL_LOGIN_OBJ>(INITIAL_LOGIN_OBJ);

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (loginObj.emailId.trim() === "")
      return setErrorMessage("Email Id is required! (use any value)");
    if (loginObj.password.trim() === "")
      return setErrorMessage("Password is required! (use any value)");
    else {
      setLoading(true);
      navitage("/");
      // signInWithEmailAndPassword(loginObj.emailId, loginObj.password)
      //   .then((userCredential) => {
      //     // Signed in
      //     const user = userCredential.user;
      //     console.log(user);
      //     navitage("/");
      //   })
      //   .catch((error) => {});
      localStorage.setItem("token", "DumyTokenHere");
      setLoading(false);
      window.location.href = "/dashboard";
    }
  };

  const updateFormValue = ({
    updateType,
    value,
  }: {
    updateType: string;
    value: string;
  }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src="./assets/images/logo.svg" alt="logo" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <form onSubmit={(e) => submitForm(e)}>
                  <InputText
                    type="text"
                    defaultValue={loginObj.emailId}
                    updateType="emailId"
                    containerStyle="mt-4"
                    labelTitle="No Telepon"
                    updateFormValue={updateFormValue}
                  />

                  <InputText
                    defaultValue={loginObj.password}
                    type="password"
                    updateType="password"
                    containerStyle="mt-4"
                    labelTitle="Password"
                    updateFormValue={updateFormValue}
                  />

                  <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                  <button
                    type="submit"
                    className={
                      "btn mt-2 w-full btn-primary" +
                      (loading ? " loading" : "")
                    }
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
