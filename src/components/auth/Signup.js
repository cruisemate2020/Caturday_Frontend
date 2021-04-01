import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    errorStatus: false,
    errorMsg: "",
  };

  service = new AuthService();

  // handleChange() and handleSubmit() will be added here

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const location = this.state.location;
    const email = this.state.email;

    this.service
      .signup(username, password, firstName, lastName, location, email)
      .then((response) => {
        this.setState({
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          location: "",
          email: "",
        });
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

    // this.props.history.push("/");
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const errorStatus = this.state.errorStatus;
    return (
      <div>
        <h1>Sign Up</h1>
        <p className="required">Fields denoted with an '*' are required.</p>
        <form onSubmit={this.handleFormSubmit}>
          <label className="attributes">
            <span className="required">* </span>
            First Name:&nbsp;&nbsp;
          </label>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            required
            onChange={(e) => this.handleChange(e)}
          />
          <label className="attributes"> Last Name: </label>
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={(e) => this.handleChange(e)}
          />
          <br />
          <br />
          <label className="attributes"> Location: </label>
          <input
            type="text"
            name="location"
            value={this.state.location}
            onChange={(e) => this.handleChange(e)}
          />
          <label className="attributes">
            &nbsp;&nbsp;<span className="required">* </span>
            Email:&nbsp;&nbsp;
          </label>
          <input
            type="email"
            name="email"
            required
            value={this.state.email}
            onChange={(e) => this.handleChange(e)}
          />
          <br />
          <br />
          <p>
            <label className="attributes">Create your Login</label>
          </p>
          <label className="attributes">
            <span className="required">* </span>
            Username:&nbsp;&nbsp;
          </label>
          <input
            type="text"
            name="username"
            required
            value={this.state.username}
            onChange={(e) => this.handleChange(e)}
          />

          <label className="attributes">
            &nbsp;&nbsp;<span className="required">* </span>
            Password:&nbsp;&nbsp;
          </label>
          <input
            name="password"
            type="password"
            required
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}
          />
          <p>
            <button>Sign Up</button>
          </p>
        </form>
        {errorStatus ? (
          <p className="error">{this.state.errorMsg}</p>
        ) : (
          <p>&nbsp;</p>
        )}

        <p>
          Already have account?
          <Link to={"/login"}> Login</Link>
        </p>
      </div>
    );
  }
}

export default Signup;
