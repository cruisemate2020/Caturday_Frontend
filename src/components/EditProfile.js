import axios from "axios";
import React, { Component } from "react";

export default class EditProfile extends Component {
  state = {
    loggedInUser: null,
    editedName: "",
    editedBreed: "",
    editedAge: "",
    editedStory: "",
    story: {},
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  componentDidMount() {
    const { params } = this.props.match;

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/editstory/${params.id}`)
      .then((response) => {
        this.setState({
          loggedInUser: this.props.userInSession
            ? this.props.userInSession
            : null,
          editedName: response.data.name,
          editedBreed: response.data.breed,
          editedAge: response.data.age,
          editedStory: response.data.story,
        });
      })
      .catch((error) => console.log(error.response.data));
    console.log(this.props);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    const { params } = this.props.match;
    const name = this.state.editedName;
    const breed = this.state.editedBreed;
    const age = this.state.editedAge;
    const story = this.state.editedStory;

    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/api/edit/${params.id}`, {
        name,
        breed,
        age,
        story,
      })
      .then(() => {
        this.props.history.push(`/profile/${this.props.userInSession._id}`);
      })
      .catch((err) => console.log(err));
  };

  showForm = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            onChange={this.handleChange}
            name="editedName"
            value={this.state.editedName}
          />
        </label>
        <br />
        <label>
          Breed:
          <input
            type="text"
            onChange={this.handleChange}
            name="editedBreed"
            value={this.state.editedBreed}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            onChange={this.handleChange}
            name="editedAge"
            value={this.state.editedAge}
          />
        </label>
        <br />
        <label>Tell your cat's story:</label>
        <br />
        <textarea
          type="text"
          onChange={this.handleChange}
          name="editedStory"
          value={this.state.editedStory}
          cols="80"
          rows="10"
        ></textarea>
        <br />
        <button>Save</button>
      </form>
    );
  };

  render() {
    return (
      <div>
        <h1>Edit Your Profile</h1>
        {this.showForm()}
      </div>
    );
  }
}
