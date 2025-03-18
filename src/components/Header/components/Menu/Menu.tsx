import React, { FC } from "react";
import css from "./index.module.css";
import CloseIcon from "../../../../assets/CloseIcon";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { Category } from "../../../../redux/types";
import { changeCategory } from "../../../../redux/reducers/categoryReducer";

const menuItems = [
  Category.SCIENCE,
  Category.GENERAL,
  Category.ENTERTAINMENT,
  Category.TECHNOLOGY,
  Category.BUSINESS,
  Category.HEALTH,
  Category.SPORTS,
];

type Props = {
  isOpened: boolean;
  onClose: () => void;
};

const Menu: FC<Props> = ({ isOpened, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeCategory = (category: Category) =>
    dispatch(changeCategory(category));

  return (
    <div className={cn(css.container, isOpened && css.opened)}>
      <div className={css.headContainer}>
        <button className={css.closeBtn} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      {menuItems.map((item, index) => (
        <button
          key={`${item}-${index}`}
          className={css.menuItem}
          onClick={() => {
            handleChangeCategory(item);
            onClose();
          }}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default Menu;
