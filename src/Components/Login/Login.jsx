import React from 'react'

const Login = () => {

    const onLogin = (e) => {
       
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
                    />
                  </div>
                  <div>
                    <button className="btn-login" onClick={onLogin}>
                      Login
                    </button>
                  </div>
                </form>
                <p>
                  No account yet?
                  <span>
                    Sign up
                  </span>
                </p>
              </div>
            </section>
          </main>
        </>
      );
}

export default Login
