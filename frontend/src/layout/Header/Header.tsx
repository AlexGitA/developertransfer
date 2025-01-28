import "../../index.css";
import {MENT_BUTTON_VARIANT, MENTButton} from "@/components/button/MENT-button.tsx";

const Header = () => {
  return (
    <header className="main-header">
      <div className="main-header__left">
        <h1 className="main-header__left-logo">
            <text className="main-header__left-text">Mentor<span className="main-header__left-text-space">X</span></text>
        </h1>
      </div>
      <div className="main-header__mid">
          <MENTButton className="main-header__mid-button" variant={MENT_BUTTON_VARIANT.TERTIARY}>
              <span className="main-header__mid-button-text">Suche deinen Mentor</span>
              <span className="main-header__mid-button-icon">🔍</span>
          </MENTButton>
      </div>
      <div className="main-header__right">
        <MENTButton className="profile-button" href="" target="_blank" variant="special" theme="light">Profil</MENTButton>
      </div>
    </header>
  );
};


export default Header;
