import { useNavigate } from "react-router-dom";
import "./Header.css";

type HeaderProps = {
  title: string;
  showBack?: boolean;
};

const Header = ({ title, showBack = false }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-left">
        {showBack && (
          <button className="back-button" onClick={() => navigate(-1)}>
            ←
          </button>
        )}
      </div>

      <h1 className="header-title">{title}</h1>

      <div className="header-right">
        <button className="menu-button">≡</button>
      </div>
    </header>
  );
};

export default Header;