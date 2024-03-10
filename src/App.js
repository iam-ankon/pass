import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { numbers, symbols, uppercases, lowercases } from "./data";
import Model from "./Model";

const App = () => {
  const [password, setPassword] = useState("");
  const [counter, setCounter] = useState(6);
  const [isuppercase, setuppercase] = useState(false);
  const [islowercase, setlowercase] = useState(false);
  const [isnumber, setnumber] = useState(false);
  const [issymbol, setsymbol] = useState(false);
  const [model, setmodel] = useState([
    {
      title: "",
      show: false,
      massage: "",
    },
  ]);
  const increasecounter = (e) => {
    e.preventDefault();
    if (counter < 20) {
      setCounter((prevCounter) => prevCounter + 1);
    }
  };
  const decreasecounter = (e) => {
    e.preventDefault();
    if (counter > 6) {
      setCounter((prevCounter) => prevCounter - 1);
    }
  };
  const generatePassword = (e) => {
    e.preventDefault();
    let _password = "";
    for (let i = 0; i < counter; i++) {
      _password += getrandom();
    }
    setPassword(_password);
  };
  const getrandom = () => {
    const chars = [];
    if (isuppercase) {
      chars.push(uppercases[Math.floor(Math.random() * uppercases.length)]);
    }
    if (islowercase) {
      chars.push(lowercases[Math.floor(Math.random() * lowercases.length)]);
    }
    if (isnumber) {
      chars.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    if (issymbol) {
      chars.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }
    return chars.length === 0
      ? ""
      : chars[Math.floor(Math.random() * chars.length)];
  };

  const createCopy = () => {
    const textarea = document.createElement("textarea");
    textarea.innerText = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  };

  const handlecopy = (e) => {
    e.preventDefault();
    if (password.trim().length === 0) {
      setmodel({
        title: "Error",
        massage: "No password created",
        show: true,
      });
    } else {
      setmodel({
        title: "succes",
        massage: "password is copied",
        show: true,
      });
    }
    createCopy();
  };

  return (
    <div className="App">
      {model.show && <Model title={model.title} massage={model.massage} />}
      <div className="generator">
        <h2 className="generator__title">password generater</h2>
        <h4 className="password">{password}</h4>
        <form className="generator__form">
          <div className="generator__form-controls">
            <div className="generator__form-control">
              <label htmlFor="uppercase">Uppercase</label>
              <input
                value={isuppercase}
                onChange={(event) => setuppercase(event.target.value)}
                type="checkbox"
                id="uppercase"
                name="uppercase"
              />
            </div>

            <div className="generator__form-control">
              <label htmlFor="lowercase">Lowercase</label>
              <input
                checked={islowercase}
                onChange={(event) => setlowercase(event.target.checked)}
                type="checkbox"
                id="lowercase"
                name="lowercase"
              />
            </div>

            <div className="generator__form-control">
              <label htmlFor="number">Number</label>
              <input
                checked={isnumber}
                onChange={(event) => setnumber(event.target.checked)}
                type="checkbox"
                id="number"
                name="number"
              />
            </div>

            <div className="generator__form-control">
              <label htmlFor="symbol">Symbol</label>
              <input
                checked={issymbol}
                onChange={(event) => setsymbol(event.target.checked)}
                type="checkbox"
                id="symbol"
                name="symbol"
              />
            </div>

            <div className="generator__length">
              <h4 className="generator__length-title">password Length</h4>
              <div className="generator__length-counter">
                <button onClick={decreasecounter}>-</button>
                <span>{counter}</span>
                <button onClick={increasecounter}>+</button>
              </div>
            </div>

            <div className="generator__form-actions">
              <button onClick={generatePassword} className="btn generator-btn">
                generater password
              </button>
              <button onClick={handlecopy} className="btn copy-btn">
                copy password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
