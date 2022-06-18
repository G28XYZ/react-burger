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
      <nav className={appHeaderStyle.menu}>
        <ul className={appHeaderStyle.interface}>
          <li className={appHeaderStyle.interface__item}>
            <Link to="/" className={appHeaderStyle.link}>
              <BurgerIcon type="primary" />
              <p className="pl-3 text text_type_main-default">Конструктор</p>
            </Link>
          </li>
          <li className={appHeaderStyle.interface__item}>
            <Link to="/" className={appHeaderStyle.link}>
              <ListIcon type="secondary" />
              <p className="pl-3 text text_type_main-default text_color_inactive">Лента заказов</p>
            </Link>
          </li>
          <li className={appHeaderStyle.interface__item}>
            <Link to="/" className={appHeaderStyle.link}>
              <Logo />
            </Link>
          </li>
          <li className={appHeaderStyle.interface__item}>
            <Link to="/profile" className={appHeaderStyle.link}>
              <ProfileIcon type="secondary" />
              <p className="pl-3 text text_type_main-default text_color_inactive">Личный кабинет</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
