import React, { Component } from "react";
import axios from "axios";
import CarouselComponent from "./CarouselComponent";
import { Link } from "react-router-dom";

class Home extends Component {
  async componentDidMount() {
    await axios.get(
      `https://api.thecatapi.com/v1/breeds?key=${process.env.xapikey}`
    );
  }

  render() {
    return (
      <div className="content">
        <h1>
          Every Day is
          <br />
          Caturday
        </h1>
        <div className="content">
          <CarouselComponent />
        </div>
        <p className="content-text">
          Studies have shown that cats have a calming effect on their owners,
          from the soothing action of petting to purring being an aid in falling
          asleep. Cat owners can reduce tensions by just stroking their furry
          friend’s head. Petting a cat releases endorphins into the brain, which
          makes you happier. Also, cats have the softest fur! Cats can even play
          a part in lowering your blood pressure and risk of a heart attack. One
          10-year study has even shown that cat owners were 30% less likely to
          die of a heart attack or stroke than non-cat owners.
        </p>
        <h2>
          <Link to="/petFinderSearch">Adopt a Cat Today!</Link>
        </h2>
      </div>
    );
  }
}

export default Home;
