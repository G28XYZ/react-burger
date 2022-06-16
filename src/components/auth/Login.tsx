import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onLogin } from "../../services/actions/user";
import { useAppDispatch, useAppSelector } from "../../services/store";
import style from "./auth.module.css";

function Login() {
  const { loggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) navigate("/");
  }, [loggedIn, navigate]);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChangeForm = (e: any) => {
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
