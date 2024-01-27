import React from 'react'

const Signup = () => {
    const onSubmit = () => {

    }
    return (
        <main>
          <section>
            <div>
              <div className="login-page">
                <h1>
                  Budget <span>Tracker</span>
                </h1>
                <form action="">
                  <div className="email-input">
                    <label htmlFor="email-address">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="password-input">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  <div
                    className='password-input'
                  >
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                    />
                   
                    
                  </div>
                  <button className="btn-login" type="submit" onClick={onSubmit}>
                    Sign up
                  </button>
                </form>
                <p>
                  Already have an account?
                  <span>
                    Sign in
                  </span>
                </p>
              </div>
            </div>
          </section>
        </main>
      );
}

export default Signup
