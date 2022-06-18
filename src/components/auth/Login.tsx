import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { onLogin } from "../../services/actions/user";
import { useAppDispatch } from "../../services/store";
import style from "./auth.module.css";

function Login() {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(onLogin(form));
  };

  return (
    <div className={style.auth}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <EmailInput onChange={handleChangeForm} value={form.email} name={"email"} />
        <PasswordInput onChange={handleChangeForm} value={form.password} name={"password"} />
        <Button type="primary" size="large">
          Войти
        </Button>
      </form>
      <nav>
        <ul className={style.list}>
          <li className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
            <Link to="/register" className={style.link + " pl-3"}>
              Зарегистрироваться
            </Link>
          </li>
          <li className="text text_type_main-default text_color_inactive">
            Забыли пароль?
            <Link to="/forgot-password" className={style.link + " pl-3"}>
              Восстановить пароль
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Login;
