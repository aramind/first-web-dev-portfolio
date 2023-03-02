import "./HomePage.css";
import React from "react";
import clockImage from "./icons8-clock-549.png";

const HomePage = () => {
  return (
    <div className="page page--home">
      <div className="page--home__text">
        <p className="page--home__greet">Hi User! 👋</p>
        <p className="page--home__msg">Hope you're having a good day so far!</p>
        <p className="page--home__msg">
          Take a moment to reflect on your goals and priorities everday
        </p>
        <p className="page--home__msg">
          Remember, small steps can lead to big achievements!
        </p>
        <div className="qoute">
          <p className="qoute__text">
            “The bad news is time flies. The good news is you’re the pilot”
          </p>
          <p className="qoute__auth">-- Michael Altshuler</p>
        </div>
        <p className="page--home__msg">
          Let's make the most of our time and stay productive! 🚀
        </p>
      </div>
      <div className="page--home__img">
        <img
          src={clockImage}
          alt="Clock"
        />
      </div>
    </div>
  );
};

export default HomePage;
