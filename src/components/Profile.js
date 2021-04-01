import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Profile extends Component {
  state = {
    loggedInUser: null,
    listOfUserStories: [],
    editedName: "",
    editedBreed: "",
    editedAge: "",
    editedStory: "",
    username: "",
    firstName: "",
    lastName: "",
    location: "",
    email: "",
    hidden: true,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/rescue-story`)
      .then((response) => {
        this.setState({
          listOfUserStories: response.data,
          loggedInUser: this.props.userInSession
            ? this.props.userInSession
            : null,
        });
      });

    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/profile/${this.props.match.params.id}`
      )
      .then((userRes) => {
        this.setState({
          username: userRes.data.username,
          firstName: userRes.data.firstName,
          lastName: userRes.data.lastName,
          location: userRes.data.location,
          email: userRes.data.email,
        });
      });
  }

  showAllStories = () => {
    return this.state.listOfUserStories.map((eachStory) => {
      if (eachStory.userId._id === this.state.loggedInUser._id)
        return (
          <div className="cat" key={eachStory._id}>
            <img className="rescueImg" src={eachStory.imageUrl} alt="Cat Pic" />{" "}
            <br />
            <span className="attributes">Name:</span> {eachStory.name}
            <br /> <br />
            <span className="attributes">Age:</span> {eachStory.age}
            <br /> <br />
            <span className="attributes">Breed:</span> {eachStory.breed}
            <br /> <br />
            <span className="attributes">Story:</span> {eachStory.story}
            <br /> <br />
            <span className="attributes">Made by:</span>{" "}
            {eachStory.userId.username}
            <br /> <br />
            <div className="stories-btn">
              <button onClick={() => this.deleteStory(eachStory._id)}>
                Delete
              </button>
              <Link to={`/edit/${eachStory._id}`}>
                <button>Edit</button>
              </Link>
            </div>
          </div>
        );
    });
  };

  deleteStory = (id) => {
    console.log("deleting story:", id);
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/api/rescue-story/delete/${id}`
      )
      .then((res) => {
        console.log("deleted frontend", res);
        // this.setState({
        //   listOfStories:
        //     !!this.state.listOfStories && this.state.listOfStories.length > 0
        //       ? this.state.listOfStories.filter((story) => story._id !== id)
        //       : [],
        // });
        this.props.history.push("/rescueStories");
      })
      .catch((err) => console.log(err));
  };

  editStory = (id) => {
    const name = this.state.editedName;
    const breed = this.state.editedBreed;
    const age = this.state.editedAge;
    const story = this.state.editedStory;

    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/api/rescue-story/edit/${id}`, {
        name,
        breed,
        age,
        story,
      })
      .then(() => {
        this.props.history.push("/rescueStories");
      })
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api/edit-user/${this.props.match.params.id}`,
      this.state,
      {
        withCredentials: true,
      }
    );
  };

  showForm = () => {
    this.setState({
      hidden: !this.state.hidden,
    });
  };

  hideForm = () => {
    this.setState({ hidden: true });
  };

  editProfileForm = () => {
    return (
      <>
        <button onClick={this.showForm}>Update personal info</button>
        <div className="update-form">
        <form onSubmit={this.handleSubmit} hidden={this.state.hidden}>
          <label>
            Username:
            <input
              className="username"
              value={this.state.username}
              name="username"
              type="text"
              readOnly={true}
            />
          </label>

          <label>
            First name:
            <input
              onChange={this.handleChange}
              value={this.state.firstName}
              name="firstName"
              type="text"
            />
          </label>

          <label>
            Last name:
            <input
              onChange={this.handleChange}
              value={this.state.lastName}
              name="lastName"
              type="text"
            />
          </label>

          <label>
            Location:
            <input
              onChange={this.handleChange}
              value={this.state.location}
              name="location"
              type="text"
            />
          </label>

          <label>
            Email:
            <input
              onChange={this.handleChange}
              value={this.state.email}
              name="email"
              type="email"
            />
          </label>
          <br />
          <div className="update-form"><button onClick={this.hideForm}>Update</button></div>
        </form>
        </div>
      </>
    );
  };

  render() {
    if (this.state.loggedInUser) {
      return (
        <div>
          <h1>Profile</h1>

          <div>
            Welcome, {this.state.firstName} {this.state.lastName}
            <br />
            {this.state.location}
            <br />
            {this.state.email}
          </div>
          <p>{this.editProfileForm()}</p>
          <h2>{this.state.username}'s Rescue Stories</h2>
          <div className="cat-grid">{this.showAllStories()}</div>
        </div>
      );
    } else {
      return <div>&nbsp;</div>;
    }
  }
}

export default Profile;
