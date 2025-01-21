// @ts-ignore
import React from "react";
import "../../index.css";

const Header = () => {
  return (
    <header className="main-header">
      <div className="main-header__left">
        <h1 className="main-header__left-logo">MentorX</h1>
        <button className="button">🔍</button>
      </div>
      <div className="main-header__right">
        <button className="profile-button">Profil</button>
      </div>
    </header>
  );
};

export default Header;
