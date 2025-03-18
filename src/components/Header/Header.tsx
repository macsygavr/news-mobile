import React, { useState } from "react";
import css from "./index.module.css";
import MenuIcon from "../../assets/MenuIcon";
import Menu from "./components/Menu/Menu";

const Header = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const handleOpenMenu = () => setIsMenuOpened(true);
  const handleCloseMenu = () => setIsMenuOpened(false);

  return (
    <>
      <Menu isOpened={isMenuOpened} onClose={handleCloseMenu} />
      <div className={css.container}>
        <button className={css.menuBtn} onClick={handleOpenMenu}>
          <MenuIcon />
        </button>
        <span className={css.title}>BESIDER</span>
      </div>
    </>
  );
};

export default Header;
