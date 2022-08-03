import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { onActiveLink } from './../../utils/onActiveLink';
import appHeaderStyle from './app-header.module.css';

const AppHeader: FC = () => {
  return (
    <header className={appHeaderStyle.header + ' p-10'}>
      <nav className={appHeaderStyle.menu}>
        <ul className={appHeaderStyle.interface}>
          <li className={appHeaderStyle.interface__item}>
            <NavLink to='/' className={appHeaderStyle.link + ' text_color_inactive'} style={onActiveLink}>
              {({ isActive }) => (
                <>
                  <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                  <p className='pl-3 text text_type_main-default'>Конструктор</p>
                </>
              )}
            </NavLink>
          </li>
          <li className={appHeaderStyle.interface__item}>
            <NavLink to='/feed' className={appHeaderStyle.link} style={onActiveLink}>
              {({ isActive }) => (
                <>
                  <ListIcon type={isActive ? 'primary' : 'secondary'} />
                  <p className='pl-3 text text_type_main-default'>Лента заказов</p>
                </>
              )}
            </NavLink>
          </li>
          <li className={appHeaderStyle.interface__item}>
            <Link to='/' className={appHeaderStyle.link}>
              <Logo />
            </Link>
          </li>
          <li className={appHeaderStyle.interface__item}>
            <NavLink to='/profile' className={appHeaderStyle.link} style={onActiveLink}>
              {({ isActive }) => (
                <>
                  <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                  <p className='pl-3 text text_type_main-default'>Личный кабинет</p>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
