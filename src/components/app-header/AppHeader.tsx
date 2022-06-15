import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import appHeaderStyle from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={appHeaderStyle.header + " p-10"}>
      <Link to="/" className={appHeaderStyle.logo}>
        <Logo />
      </Link>
      <nav className={appHeaderStyle.menu}>
        <ul className={appHeaderStyle.interface}>
          <li className={appHeaderStyle.interface__item}>
            <BurgerIcon type="primary" />
            <Link to="/" className="pl-3 text text_type_main-default">
              Конструктор
            </Link>
          </li>
          <li className={appHeaderStyle.interface__item}>
            <ListIcon type="secondary" />
            <Link
              to="/"
              className="pl-3 text text_type_main-default text_color_inactive"
            >
              Лента заказов
            </Link>
          </li>
        </ul>
        <Link to="/profile" className={appHeaderStyle.profile}>
          <ProfileIcon type="secondary" />
          <p className="pl-3 text text_type_main-default text_color_inactive">
            Личный кабинет
          </p>
        </Link>
      </nav>
    </header>
  );
}

export default AppHeader;
