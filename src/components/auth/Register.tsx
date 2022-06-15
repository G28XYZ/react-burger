import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import style from "./auth.module.css";

function Register() {
  const state = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (state.loggedIn) navigate("/");
  }, [state.loggedIn, navigate]);

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
          <Link to="/sign-up" className={style.link}>
            {" "}
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
