import "./Loginform.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

// const api = axios.create({
//   baseURL: `http://localhost:5000/users`,
// });

const Loginform = () => {
  const [overlay, setOverlay] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("error-msg");

  const requestLogin = (e) => {
    e.preventDefault();
    const data = { email, password };
    email === ""
      ? errorAlert("Email")
      : password === ""
      ? errorAlert("Password")
      : login(data);
  };

  const errorAlert = (type) => {
    setErr(true);

    if (type === -1) {
      setErrMsg(`Authentication Failed`);
    } else {
      setErrMsg(`Please provide ` + type);
    }

    setTimeout(() => {
      setErr(false);
      setErrMsg("");
    }, 3000);
  };

  // const getCasInfo = (res) => {
  //   localStorage.setItem("casAuth", res.data.casAuth);
  //   localStorage.setItem("casName", res.data.name);
  //   localStorage.setItem("casRoll", res.data.roll);
  // };
  const handleCasLogin = () => {
    window.location.href = "http://localhost:5000/login";

    // axios
    //   .get("/casLogin")
    //   .then((res) => {
    //     console.log(res.data.casAuth);
    //     getCasInfo(res);
    //     history.push("/front");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     window.location.href = "http://localhost:5000/login";
    //   });
  };
  const login = (data) => {
    axios
      .post("/auth", data)
      .then((res) => {
        console.log(res.data.name, res.data.role);
        localStorage.setItem("user_name", res.data.name);
        localStorage.setItem("user_role", res.data.role);
        history.push("/front");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
        errorAlert(-1);
      });
  };

  const requestRegister = (e) => {
    e.preventDefault();
    const data = { name, email, password };
    email === ""
      ? errorAlert("Email")
      : password === ""
      ? errorAlert("Password")
      : register(data);
  };

  const register = (data) => {
    axios
      .post("/register", data)
      .then((res) => {
        console.log(res.data);
        alert("Registration Successful");
      })
      .catch((err) => {
        console.log(err);
        alert("Registration failed");
      });
    setName("");
    setEmail("");
    setPassword("");
  };

  const history = useHistory();

  return (
    <div>
      <h2>Welcome to IIIT - H Issue Tracking</h2>
      <div
        className={overlay ? "container" : "container right-panel-active"}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form action="#" onSubmit={requestRegister}>
            <h1>Create Account</h1>
            <br />
            <div>
              <button onClick={handleCasLogin}>Cas Login</button>
            </div>
            <br />
            <span>or use your email for registration</span>
            {/* <input type="text" placeholder="Name" /> */}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {err ? (
              <div className="msg">{errMsg}</div>
            ) : (
              <button type="submit">Sign Up</button>
            )}
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" id="sign-in-form" onSubmit={requestLogin}>
            <h1>Sign in</h1>
            <br />
            <div>
              <Button variant="outlined" onClick={handleCasLogin}>
                Cas Login
              </Button>
            </div>
            <br />
            <span>or use your account</span>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="pass"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="/">Forgot your password?</a>
            {err ? (
              <div className="msg">{errMsg}</div>
            ) : (
              <button type="submit">Sign In</button>
            )}
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To stay connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => {
                  setOverlay(!overlay);
                }}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => {
                  setOverlay(!overlay);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginform;
