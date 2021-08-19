import "./Loginform.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import { useState } from "react";

const Loginform = () => {
  const [overlay, setOverlay] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };
    email === ""
      ? alert("provide email")
      : password === ""
      ? alert("Provide Password")
      : console.log(JSON.stringify(data));
    setEmail("");
    setPassword("");
  };

  const onSubmit2 = (e) => {
    e.preventDefault();
    const data = { email, password };
    email === ""
      ? alert("provide email")
      : password === ""
      ? alert("Provide Password")
      : console.log(JSON.stringify(data));

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h2>Welcome to IIIT - H Issue Tracking</h2>
      <div
        className={overlay ? "container" : "container right-panel-active"}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form action="#" onSubmit={onSubmit2}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="/" className="social">
                <FacebookIcon />
              </a>
              <a href="/" className="social">
                <GitHubIcon />
              </a>
              <a href="/" className="social">
                <LinkedInIcon />
              </a>
            </div>
            <span>or use your email for registration</span>
            {/* <input type="text" placeholder="Name" /> */}
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
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" id="sign-in-form" onSubmit={onSubmit}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="/" className="social">
                <FacebookIcon />
              </a>
              <a href="/" className="social">
                <GitHubIcon />
              </a>
              <a href="/" className="social">
                <LinkedInIcon />
              </a>
            </div>
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
            <div className="msg"></div>
            <a href="/">Forgot your password?</a>
            <button type="submit">Sign In</button>
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
