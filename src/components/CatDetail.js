import React, { Component } from "react";
import axios from "axios";

class CatDetail extends Component {
  state = {
    catDetails: {},
    image: "",
  };

  componentDidMount() {
    axios
      .get(
        `https://api.thecatapi.com/v1/breeds/${this.props.match.params.id}?key=${process.env.xapikey}`
      )
      .then((response) => {
        this.setState({
          catDetails: response.data,
        });
      });
    axios
      .get(
        `https://api.thecatapi.com/v1/images/search?breed_id=${this.props.match.params.id}`
      )
      .then((response) => {
        this.setState({
          image: response.data[0].url,
        });
      })
      .catch((error) => console.log(error));
  }

  colorRatings(num) {
    const ratingsArr = [];
    for (let i = 0; i < 5; i++) {
      if (num > 0) {
        ratingsArr.push(<div className="brown-bg" key={i} />);
      } else {
        ratingsArr.push(<div className="no-bg" key={i} />);
      }
      --num;
    }
    return ratingsArr;
  }

  render() {
    const hypoallergenic = this.state.hypoallergenic;
    return (
      <div className="content">
        <h1>About {this.state.catDetails.name} Cats</h1>
        <img className="cat-img" src={this.state.image} alt="unavailable" />
        <div className="content-text">
          <p>{this.state.catDetails.description}</p>
          <p>
            <span className="attributes">Temperament:</span>{" "}
            {this.state.catDetails.temperament}
          </p>
          <p>
            <span className="attributes">Hypoallergenic:</span>{" "}
            {hypoallergenic ? "Yes" : "No"}
          </p>
          <p>
            <span className="attributes">Affection Level:</span>{" "}
            {this.colorRatings(this.state.catDetails.affection_level).map(
              (x, index) => x
            )}
          </p>
          <p>
            <span className="attributes">Energy Level:</span>
            {this.colorRatings(this.state.catDetails.energy_level).map(
              (x, index) => x
            )}
          </p>
          <p>
            <span className="attributes">Child Friendly:</span>{" "}
            {this.colorRatings(this.state.catDetails.child_friendly).map(
              (x, index) => x
            )}
          </p>
          <p>
            <span className="attributes">Dog Friendly:</span>{" "}
            {this.colorRatings(this.state.catDetails.dog_friendly).map(
              (x, index) => x
            )}
          </p>
          <p>
            <span className="attributes">Stranger Friendly:</span>{" "}
            {this.colorRatings(this.state.catDetails.stranger_friendly).map(
              (x, index) => x
            )}
          </p>
          <p>
            You can find additional information on {this.state.catDetails.name}{" "}
            cats{" "}
            <a
              href={this.state.catDetails.wikipedia_url}
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
            .
          </p>
        </div>
      </div>
    );
  }
}

export default CatDetail;
