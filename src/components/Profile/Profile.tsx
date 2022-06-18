import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { onLogout } from "../../services/actions/user";
import { useAppDispatch, useAppSelector } from "../../services/store";
import style from "./profile.module.css";

function Profile() {
  const dispatch = useAppDispatch();
  const { name, email } = useAppSelector((state) => state.user);
  const [form, setForm] = useState({ email, password: "", name });
  const location = useLocation();

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClickLogout = () => {
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (refreshToken) dispatch(onLogout(refreshToken));
  };

  const styleLink = "text text_type_main-medium text_color_inactive";

  return (
    <div className={style.profile}>
      <div className={style.navigation}>
        <nav>
          <ul className={style.list}>
            <li className={style.item}>
              <Link
                to="/profile"
                className={`${style.link} ${styleLink} ${
                  location.pathname === "/profile" && style.active
                }`}
              >
                Профиль
              </Link>
            </li>
            <li className={style.item}>
              <Link to="/" className={`${style.link} ${styleLink}`}>
                История заказов
              </Link>
            </li>
            <li className={style.item}>
              <Link
                to="/profile"
                className={`${style.link} ${styleLink}`}
                onClick={handleClickLogout}
              >
                Выход
              </Link>
            </li>
          </ul>
        </nav>
        <p className={`${style.info} text text_type_main-default`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={style.form}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChangeForm}
          icon={"EditIcon"}
          value={form.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={handleChangeForm}
          icon={"EditIcon"}
          value={form.email}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={handleChangeForm}
          icon={"EditIcon"}
          value={form.password}
          name={"password"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
      </form>
    </div>
  );
}

export default Profile;
