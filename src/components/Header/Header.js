import React, { useState } from "react";
import { Link } from "react-router-dom";
import user from "../../images/user.png";
import "../Header/Header.css";
import { useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";

const Header = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (term === "") return alert("please enter movie or show ");
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    setTerm("");
  };
  return (
    <div className="header">
      <div className="logo">
        <Link to="/"> Movie App </Link>
      </div>
      <div className="search-bar">
        <form onSubmit={submitHandler} className="form1">
          <input
            type="text"
            value={term}
            placeholder="search Movies or shows"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit" className="btn">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div className="user-image">
        <img src={user} alt=""></img>
      </div>
    </div>
  );
};

export default Header;
