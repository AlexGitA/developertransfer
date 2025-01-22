import "../../index.css";
import {MENTButton} from "@/components/button/MENT-button.tsx";

const Header = () => {
  return (
    <header className="main-header">
      <div className="main-header__left">
        <h1 className="main-header__left-logo">MentorX</h1>
        <MENTButton className="button" href="" target="_blank" variant="special" theme="light">🔍</MENTButton>
      </div>
      <div className="main-header__right">
        <MENTButton className="profile-button" href="" target="_blank" variant="special" theme="light">Profil</MENTButton>
      </div>
    </header>
  );
};

export default Header;
