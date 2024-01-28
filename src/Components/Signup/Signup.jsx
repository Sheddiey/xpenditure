import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserAuth } from "../../Context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    try {
      await createUser(email, password);
      console.log("User successfully signed up.");
      navigate("/home");
    } catch (err) {
      setError("Failed to sign up. Please try again later.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <main>
      <section>
        <div>
          <div className="login-page">
            <h1>
              Budget <span>Tracker</span>
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="email-input">
                <label htmlFor="email-address">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="password-input">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="password-input">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  style={{
                    outline:
                      password !== confirmPassword ? "1px dotted red" : "",
                  }}
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button className="btn-login" type="submit" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
            <p>
              Already have an account?{" "}
              <span>
                <NavLink to={"/login"}>Sign in</NavLink>
              </span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
