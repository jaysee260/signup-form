import React, { Component } from 'react';

import SignupForm from './components/SignupForm';

class App extends Component {

  // For development purposes
  componentWillMount() {
    if (!("testCreds" in localStorage)) {
      let testCreds = {
        username: "myusername",
        password: "mypassword123",
        email: "email@me.com"
      };

      localStorage.setItem("testCreds", JSON.stringify(testCreds));
    }
  }

  // For development purposes
  componentWillUnmount() {
    if ("testCreds" in localStorage)
      localStorage.removeItem("testCreds");
  }

  render() {
    return (
      <div id="app-entry">
        <section className="section">
          <div id="login-container" className="container">
            <SignupForm />
          </div>
        </section>
      </div>
    )
  }
}

export default App;