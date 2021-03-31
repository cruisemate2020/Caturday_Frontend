import React, { Component } from "react";
export default class PetFinderSearch extends Component {
  state = {
    location: "",
    rescueCats: [],
  };

  giveData = () => {
    let key = "Ww2Mo8xNzXhbFxBtwEN3er2rnOqCUAmamXIQ1AhdCA0Yd4ueb1";
    let secret = "EkIYCERn1x0yevjN5f1VPwEXgaP7pNQ07s3bBBG7";

    // Call details
    const type = "cat";
    const status = "adoptable";
    let location = this.state.location;

    // Call the API
    // This is a POST request, because we need the API to generate a new token for us
    fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      body:
        "grant_type=client_credentials&client_id=" +
        key +
        "&client_secret=" +
        secret,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((resp) => {
        // Return the response as JSON
        return resp.json();
      })
      .then((data) => {
        // Log the API data

        // Return a second API call
        // This one uses the token we received for authentication
        return fetch(
          "https://api.petfinder.com/v2/animals?type=" +
            type +
            "&status=" +
            status +
            "&location=" +
            location,
          {
            headers: {
              Authorization: data.token_type + " " + data.access_token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
      })
      .then((resp) => {
        // Return the API response as JSON
        return resp.json();
      })
      .then((data) => {
        this.setState({ rescueCats: data.animals });
      })
      .catch((err) => {
        // Log any errors
        console.log("something went wrong", err);
      });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.giveData();
  };

  handleLocation = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  allAvailableRescueCats = () => {
    return this.state.rescueCats.map((eachRescueCat) => {
      return (
        <div key={eachRescueCat._id}>
          <div className="cat">
            {!eachRescueCat.primary_photo_cropped ? (
              <img
                src="../images/home-is-where-the-cat-is.jpg"
                alt="Home is where the cat is"
              />
            ) : (
              <img
                src={eachRescueCat.primary_photo_cropped?.small}
                alt=" unavailable"
                width="200vw"
              />
            )}
            <br />
            <a href={eachRescueCat.url} target="_blank" rel="noreferrer">
              {eachRescueCat.name}
            </a>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <h1>Adopt A Cat Today!</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="location"
            placeholder="Enter your zip code"
            onChange={this.handleLocation}
          />
          <button type="submit">Search</button>
        </form>
        <div className="cat-grid">{this.allAvailableRescueCats()}</div>
      </div>
    );
  }
}
