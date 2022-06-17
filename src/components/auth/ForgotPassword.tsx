import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onForgotPassword } from "../../services/actions/user";
import { useAppDispatch } from "../../services/store";
import style from "./auth.module.css";

function ForgotPassword() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ email: "" });
  const navigate = useNavigate();

  const handleChangeForm = (e: any) => {
    setForm({ email: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(onForgotPassword(form.email)).then(({ payload }) => {
      if (payload) {
        navigate("/reset-password");
      }
    });
  };

  return (
    <div className={style.auth}>
      <form className={style.form} onSubmit={handleSubmit}>
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

export default ForgotPassword;
