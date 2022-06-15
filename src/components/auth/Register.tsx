import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./auth.module.css";

function Register() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleChangeForm = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={style.auth}>
      <form className={style.form}>
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
