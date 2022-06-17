import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onRegister } from "../../services/actions/user";
import { useAppDispatch, useAppSelector } from "../../services/store";
import style from "./auth.module.css";

function Register() {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.user);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const navigate = useNavigate();

  const handleChangeForm = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(onRegister(form));
  };

  useEffect(() => {
    if (loggedIn) navigate("/");
  }, [loggedIn]);

  return (
    <div className={style.auth}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChangeForm}
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
          value={form.email}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <PasswordInput
          onChange={handleChangeForm}
          value={form.password}
          name={"password"}
        />
        <Button type="primary" size="large">
          Зарегистрироваться
        </Button>
      </form>
      <div>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
        </p>
        <Link to="/sign-in" className={style.link}>
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
