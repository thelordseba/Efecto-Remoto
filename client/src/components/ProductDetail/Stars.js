//REVIEW ANDANDO
import React from "react";
import './styles.css'

let array = [1, 2, 3, 4, 5];

class Stars extends React.Component {
  state = {
    stars: [null],
    vacias: [null]
  };

  componentDidMount() {
    if (this.props.disabledClick && this.props.stars) {
      const llenas = []
      const vaciasArr = []
      const vacio = 5 - this.props.stars
      for (let index = 0; index < this.props.stars; index++) {
        llenas.push(index)
      }
      for (let index = 0; index < vacio; index++) {
        vaciasArr.push(index)
      }
      this.setState({stars: llenas, vacias:vaciasArr})
    }
  }
  
  handleStars = e => {
    if (!this.props.disabledClick) {
      let seleccion = e.currentTarget.getAttribute("name");

      let arrayLlenas = array.filter(num => num <= seleccion);
  
      let arrayVacias = array.filter(num => num > seleccion);
  
      this.setState({ stars: arrayLlenas });
      this.setState({ vacias: arrayVacias });
    }
  };

  render() {
    if (this.state.stars[0] === null) {
      return (
        <div className="bottom ">
          <p>Review</p>

          <div>
            {array.map(star => (
              <img
                className="stars"
                onClick={this.handleStars}
                name={array.indexOf(star) + 1}
                src="https://image.flaticon.com/icons/svg/1828/1828970.svg"
                alt="starv"
              />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="bottom ">
          {!this.props.disabledClick && <p>Thank you for your review</p>}
          <div>
            {this.state.stars.map(star => (
              <img
                className="stars"
                onClick={this.handleStars}
                name={array.indexOf(star) +1}
                src="https://image.flaticon.com/icons/png/512/1828/1828961.png"
                alt="starl"
              />
            ))}
            {this.state.vacias.map(star => (
              <img
                className="stars"
                onClick={this.handleStars}
                name={array.indexOf(star) + 1}
                src="https://image.flaticon.com/icons/svg/1828/1828970.svg"
                alt="starv"
              />
            ))}
          </div>
        </div>
      );
    }
  }
}

export default Stars;
