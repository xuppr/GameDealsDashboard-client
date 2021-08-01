import { useEffect, useState } from "react";
import "./UserInfo.css";

export default function UserInfo({ username, setUsername }) {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const closeMenu = (e) => {
    e.preventDefault();
    document.removeEventListener("click", closeMenu);
    setMenuVisible(false);
  };

  useEffect(() => {
    if (isMenuVisible) {
      document.addEventListener("click", closeMenu);
    }
  }, [isMenuVisible]);

  const showMenu = (e) => {
    e.stopPropagation(); // decidere se chiudere il menu cliccando nuovamente sull'icona dello user
    e.preventDefault();

    if (isMenuVisible) {
      return;
    }

    setMenuVisible(true);
  };

  const logout = (e) => {
    e.preventDefault();
    e.stopPropagation();

    localStorage.removeItem("token");

    closeMenu(e);
    setUsername("");
  };

  const Menu = () => (
    <div className="userinfo-menu" onClick={showMenu}>
      <p className="userinfo-name">{username ? username : "guest"}</p>
      {username ? (
        <div className="userinfo-logout-container">
          <i
            className="ri-logout-box-r-line userinfo-logout-btn"
            onClick={logout}
          ></i>
        </div>
      ) : null}
    </div>
  );

  return (
    <div>
      <button className="userinfo-btn" onClick={showMenu}>
        <i className="ri-account-circle-line"></i>
      </button>

      {isMenuVisible ? <Menu /> : null}
    </div>
  );
}
