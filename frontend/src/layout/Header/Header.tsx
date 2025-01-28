import "../../index.css";
import { MENTButton } from "@/components/button/MENT-button.tsx";

const Header = () => {
  return (
    <header className="main-header">
      <div className="main-header__left">
        <h1 className="main-header__left-logo">
            <text className="main-header__left-text">Mentor<span className="main-header__left-text-space">X</span></text>
        </h1>
      </div>
      <div className="main-header__mid">
          <MENTButton className="main-header__mid-button">
              <span className="main-header__mid-button-text">Suche deinen Mentor   🔍</span>
          </MENTButton>
      </div>
      <div className="main-header__right">
        <MENTButton className="main-header__right-profile-button" href="" target="_blank" variant="special" theme="light">Profil</MENTButton>
      </div>
    </header>
  );
};


export default Header;
