import axios from "axios";
import React, { Component } from "react";

class RescueStories extends Component {
  state = {
    name: "",
    age: "",
    breed: "",
    story: "",
    imageUrl: "",
    listOfStories: [],
    loggedInUser: null,
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
          listOfStories: response.data,
        });
      });
  }

  showAllStories = () => {
    return this.state.listOfStories.map((eachStory) => {
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
        </div>
      );
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/rescue-story`,
      this.state,
      {
        withCredentials: true,
      }
    );
    this.props.history.push("/");
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Image file", file);
  };

  showForm = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  render() {
    return (
      <div>
        <h1>Rescue Stories</h1>
        {this.state.loggedInUser && (
          <button onClick={this.showForm}>Add story</button>
        )}
        <p className="notes">
          To add a story of your own, please login or signup.
        </p>
        <p className="stories">{this.showAllStories()}</p>
      </div>
    );
  }
}

export default RescueStories;
