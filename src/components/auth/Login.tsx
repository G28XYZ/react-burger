import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import style from "./auth.module.css";

function Login() {
  const state = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (state.loggedIn) navigate("/");
  }, [state.loggedIn, navigate]);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChangeForm = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={style.auth}>
      <form className={style.form}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <EmailInput
          onChange={handleChangeForm}
          value={form.email}
          name={"email"}
        />
        <PasswordInput
          onChange={handleChangeForm}
          value={form.password}
          name={"password"}
        />
        <Button type="primary" size="large">
          Войти
        </Button>
      </form>
      <nav>
        <ul className={style.list}>
          <li className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
            <Link to="/sign-up" className={style.link}>
              Зарегистрироваться
            </Link>
          </li>
          <li className="text text_type_main-default text_color_inactive">
            Забыли пароль?
            <Link to="/fogot-password" className={style.link}>
              Восстановить пароль
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Login;
