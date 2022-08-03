import { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { onLogout } from './../../services/actions/user';
import { useAppDispatch } from './../../services/store';
import { onActiveLink } from './../../utils/onActiveLink';
import style from './profile.module.css';

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const handleClickLogout = () => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (refreshToken) dispatch(onLogout(refreshToken));
  };

  const styleLink = 'text text_type_main-medium';

  return (
    <div className={style.profile}>
      <div className={`${style.navigation} pt-20`}>
        <nav>
          <ul className={`${style.list}`}>
            <li className={style.item}>
              <NavLink to='' className={`${style.link} ${styleLink}`} style={onActiveLink} end>
                Профиль
              </NavLink>
            </li>
            <li className={style.item}>
              <NavLink to='orders' className={`${style.link} ${styleLink}`} style={onActiveLink}>
                История заказов
              </NavLink>
            </li>
            <li className={style.item}>
              <NavLink
                to='/login'
                className={`${style.link} ${styleLink}`}
                onClick={handleClickLogout}
                style={onActiveLink}
              >
                Выход
              </NavLink>
            </li>
          </ul>
        </nav>
        <p className={`${style.info} text text_type_main-default`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
