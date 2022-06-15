import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./profile.module.css";

function Profile() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleChangeForm = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onIconClick = (e: any) => {};

  return (
    <div className={style.profile}>
      <div className={style.navigation}>
        <nav>
          <ul className={style.list}>
            <li className={style.item}>
              <Link
                to="/profile"
                className={`${style.link} text text_type_main-medium text_color_inactive`}
              >
                Профиль
              </Link>
            </li>
            <li className={style.item}>
              <Link
                to="/"
                className={`${style.link} text text_type_main-medium text_color_inactive`}
              >
                История заказов
              </Link>
            </li>
            <li className={style.item}>
              <Link
                to="/"
                className={`${style.link} text text_type_main-medium text_color_inactive`}
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
          onIconClick={onIconClick}
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
          onIconClick={onIconClick}
        />
        <Input
          type={"password"}
          placeholder={"Парль"}
          onChange={handleChangeForm}
          icon={"EditIcon"}
          value={form.password}
          name={"password"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          onIconClick={onIconClick}
        />
      </form>
    </div>
  );
}

export default Profile;
