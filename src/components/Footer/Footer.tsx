import React from "react";
import css from "./index.module.css";

const buttons = ["Log In", "About Us", "Publishers", "Sitemap"];

const Footer = () => (
  <div className={css.container}>
    <div className={css.pagesBtnsContainer}>
      {buttons.map((item, index) => (
        <button key={`${item}-${index}`} className={css.pageBtn}>
          {item}
        </button>
      ))}
    </div>
    <div className={css.sponsorContainer}>
      <span>Powered by</span>
      <img className={css.img} src="/sponsorIcon.png" alt="" />
    </div>
    <span>© 2023 Besider. Inspired by Insider</span>
  </div>
);

export default Footer;
