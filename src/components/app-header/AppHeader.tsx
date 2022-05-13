import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyle from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={appHeaderStyle.header + " p-10"}>
      <a href="/#" className={appHeaderStyle.logo}>
        <Logo />
      </a>
      <nav className={appHeaderStyle.menu}>
        <ul className={appHeaderStyle.interface}>
          <li className={appHeaderStyle.interface__item}>
            <BurgerIcon type="primary" />
            <p className="pl-3 text text_type_main-default">Конструктор</p>
          </li>
          <li className={appHeaderStyle.interface__item}>
            <ListIcon type="secondary" />
            <p className="pl-3 text text_type_main-default text_color_inactive">Лента заказов</p>
          </li>
        </ul>
        <a href="/#" className={appHeaderStyle.profile}>
          <ProfileIcon type="secondary" />
          <p className="pl-3 text text_type_main-default text_color_inactive">Личный кабинет</p>
        </a>
      </nav>
    </header>
  );
}

export default AppHeader;
