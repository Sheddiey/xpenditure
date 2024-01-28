import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserAuth } from "../../Context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signIn } = UserAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      console.log("User succesfully sign in");
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <main>
        <section>
          <div className="login-page">
            <h1>
              Budget <span>Tracker</span>
            </h1>
            <form action="">
              <div className="email-input">
                <label htmlFor="email-address">Email Address</label>
                <input
                  type="email"
                  id="email-address"
                  name="email"
                  required
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="password-input">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button className="btn-login" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </form>
            <p>
              No account yet?
              <span>
                <NavLink to={"/dashboard"}>Sign up</NavLink>
              </span>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
