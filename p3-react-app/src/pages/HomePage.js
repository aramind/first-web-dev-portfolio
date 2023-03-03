import "./HomePage.css";
import React, { useEffect, useState } from "react";
import clockImage from "./icons8-clock-549.png";
import quotesData from "../data/quotes.json";

const HomePage = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const randomQuote =
      quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
    setQuote(randomQuote.quote);
    setAuthor(randomQuote.author);
  }, []);

  return (
    <div className="page page--home">
      <div className="page--home__text">
        <p className="page--home__greet">Hi User! 👋</p>
        <p className="page--home__msg">Hope you're having a good day so far!</p>
        <p className="page--home__msg">
          Take a moment to reflect on your goals and priorities each day.
        </p>
        <p className="page--home__msg">
          Remember, small steps can lead to big achievements!
        </p>
        <p className="page--home__msg">
          Here's a quote to inspire you for the day:
        </p>
        <div className="qoute">
          <p className="qoute__text">{quote}</p>
          <p className="qoute__auth">-- {author}</p>
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
