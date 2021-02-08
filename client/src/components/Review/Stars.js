//REVIEW ANDANDO
import React from "react";
import emptyRatingLogo from "../common/emptyRating.png";
import fullRatingLogo from "../common/fullRating.png";
// import Review from "./Review";
import "./Stars.css";

let array = [1, 2, 3, 4, 5];

class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stars: [null], vacias: [null] };
    this.handleStars = this.handleStars.bind(this);
  }

  componentDidMount() {
    if (this.props.disabledClick && this.props.stars) {
      const llenas = [];
      const vaciasArr = [];
      const vacio = 5 - this.props.stars;
      for (let index = 0; index < this.props.stars; index++) {
        llenas.push(index);
      }
      for (let index = 0; index < vacio; index++) {
        vaciasArr.push(index);
      }
      this.setState({ stars: llenas, vacias: vaciasArr });
    }
  }

  handleStars = (e) => {
    if (!this.props.disabledClick) {
      let seleccion = e.currentTarget.getAttribute("name");
      seleccion = parseInt(seleccion)
      let arrayLlenas = []
      let arrayVacias = []
      for (let index = 1; index < seleccion + 1; index++) {
        arrayLlenas.push(index)
       
      }
      for (let index = arrayLlenas[arrayLlenas.length -1] + 1; index < 6; index++) {
        arrayVacias.push(index)
      }
      this.setState({ stars: arrayLlenas });
      this.setState({ vacias: arrayVacias });

      this.props.setReview(seleccion);
    }
  };

  render() {
    if (this.state.stars[0] === null) {
      return (
        <div className="bottom ">
          <div>
            {array.map((star) => (
              <img
                className="stars"
                onClick={this.handleStars}
                name={star}
                key={star}
                src={emptyRatingLogo}
                alt="starv"
              />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="bottom ">
          {/*!this.props.disabledClick && <p></p>*/}
          <div>
            {this.state.stars.map((star) => (
              <img
                className="stars"
                onClick={this.handleStars}
                name={star}
                src={fullRatingLogo}
                key={star}
                alt="starl"
              />
            ))}
            {this.state.vacias.map((star) => (
              <img
                className="stars"
                onClick={this.handleStars}
                name={star}
                src={emptyRatingLogo}
                alt="starv"
                key={star}
              />
            ))}
          </div>
        </div>
      );
    }
  }
}

export default Stars;
