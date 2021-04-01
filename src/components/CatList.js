import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Cat extends Component {
  state = {
    cats: [],
    filteredCats: [],
    image: "",
  };

  componentDidMount() {
    axios
      .get(`https://api.thecatapi.com/v1/breeds?key=${process.env.xapikey}`)
      .then((response) => {
        this.setState({
          cats: response.data,
          filteredCats: response.data,
        });
        axios
          .get(
            `https://api.thecatapi.com/v1/images/search?breed_id=${this.props.match.params.id}`
          )
          .then((response) => {
            console.log({ response });
            this.setState({
              image: response.data[0].url,
            });
          })
          .catch((error) => console.log(error));
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  search = (e) => {
    let searchCats = this.state.cats.filter((elem) => {
      if (
        elem.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        elem.description.toLowerCase().includes(e.target.value.toLowerCase()) ||
        elem.temperament.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        return elem;
      }
    });
    this.setState({ filteredCats: searchCats });
  };

  allCats = () => {
    return this.state.filteredCats.map((eachCat) => {
      return (
        <div>
          <div key={eachCat._id}>
            <div className="cat">
              {!eachCat.image?.url ? (
                <img
                  src="../images/home-is-where-the-cat-is.jpg"
                  alt="Home is where the cat is"
                />
              ) : (
                <img
                  src={eachCat.image?.url}
                  alt=" unavailable"
                  width="200vw"
                />
              )}
              <br />
              <Link to={`/cat-detail/${eachCat.id}`}>
                <h3>{eachCat.name}</h3>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <>
        <h1>Cat Breeds</h1>

        <label className="notes">
          Search the different cat breeds by name or keyword.
          <br />
          <br />
          <input
            onChange={this.search}
            name="search"
            placeholder="🔎"
            type="text"
          />
        </label>

        <p className="cat-grid">{this.allCats()}</p>
      </>
    );
  }
}

export default Cat;
