import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errorStatus: false,
    errorMsg: "",
  };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service
      .login(username, password)
      .then((response) => {
        this.setState({ username: "", password: "" });
        this.props.getUser(response);
        this.props.history.push(`/profile/${response._id}`);
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            errorStatus: true,
            errorMsg: error.response.data.message,
          });
        }
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const errorStatus = this.state.errorStatus;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label className="attributes"> Username: </label>
          <input
            type="text"
            name="username"
            onChange={(e) => this.handleChange(e)}
            value={this.state.username}
          />
          <label className="attributes"> Password: </label>
          <input
            name="password"
            type="password"
            onChange={(e) => this.handleChange(e)}
            value={this.state.password}
          />

          <input type="submit" value="Login" />
        </form>
        {errorStatus ? (
          <p className="error">{this.state.errorMsg}</p>
        ) : (
          <p>&nbsp;</p>
        )}
        <p>
          Don't have account?
          <Link to={"/signup"}> Signup</Link>
        </p>
      </div>
    );
  }
}

export default Login;
