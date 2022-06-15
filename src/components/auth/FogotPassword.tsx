import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./auth.module.css";

function FogotPassword() {
  const [form, setForm] = useState({ email: "" });

  const handleChangeForm = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={style.auth}>
      <form className={style.form}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <Input
          type={"text"}
          placeholder={"Укажите e-mail"}
          onChange={handleChangeForm}
          value={form.email}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button type="primary" size="large">
          Восстановить
        </Button>
      </form>
      <div>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
          <Link to="/sign-in" className={style.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default FogotPassword;
