import "../css/auth-page.css";

import { useState } from "react";

function App() {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const googleLogin = (e) => {
    e.preventDefault();
  };
  const swapLogin = (e) => {
    e.preventDefault();
    setLogin(!login);
  };
  const registerUser = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      return;
    }
  };
  return (
    <div className="App">
      <div className="auth-page">
        <img src={"/logo.png"} className="auth-logo" alt="Breads" />
        {login === true ? (
          <form className="login-form">
            <button className="google-login" onClick={googleLogin}>
              <img src={"/google.svg"} alt="Google" />
              Sign in using google
            </button>
            <div className="separator">or</div>
            <label htmlFor="email" className="input-holder">
              <img src={"/email.svg"} alt="Email" />
              <input
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label htmlFor="password" className="input-holder">
              <img src={"/password.svg"} alt="Password" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="Password"
              />
            </label>
            <div className="button-holder">
              <button className={"register"} onClick={swapLogin}>
                Register
              </button>
              <button className={"login" + (login === true ? " active" : "")}>
                Login
              </button>
            </div>
          </form>
        ) : (
          <form className="login-form">
            <button className="google-login" onClick={googleLogin}>
              <img src={"/google.svg"} alt="Google" />
              Sign in using google
            </button>
            <div className="separator">or</div>
            <label htmlFor="email" className="input-holder">
              <img src={"/email.svg"} alt="Email" />
              <input
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label htmlFor="password" className="input-holder">
              <img src={"/password.svg"} alt="Password" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="Password"
              />
            </label>
            <label htmlFor="confirm-password" className="input-holder">
              <img src={"/password.svg"} alt="Password" />
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirm-password"
                type="password"
                placeholder="Confirm Password"
              />
            </label>
            <div className="button-holder">
              <button className={"login"} onClick={swapLogin}>
                Login
              </button>
              <button className={"register active"} onClick={registerUser}>
                Register
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
