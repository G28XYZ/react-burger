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
      <ul className={appHeaderStyle.interface}>
        <li className={appHeaderStyle.interface__item}>
          <BurgerIcon type="primary" />
          <span className="pl-3">Конструктор</span>
        </li>
        <li className={appHeaderStyle.interface__item}>
          <ListIcon type="secondary" />
          <span className="pl-3">Лента заказов</span>
        </li>
      </ul>
      <a href="/#" className={appHeaderStyle.logo}>
        <Logo />
      </a>
      <a href="/#" className={appHeaderStyle.profile}>
        <ProfileIcon type="secondary" />
        <span className="pl-3">Личный кабинет</span>
      </a>
    </header>
  );
}

export default AppHeader;
