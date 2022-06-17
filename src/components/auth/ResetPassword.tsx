import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onResetPassword } from "../../services/actions/user";
import { useAppDispatch } from "../../services/store";
import style from "./auth.module.css";

function ResetPassword() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ token: "", password: "" });
  const navigate = useNavigate();

  const handleChangeForm = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(onResetPassword(form)).then(({ payload }) => {
      if (payload) navigate("/login");
    });
  };

  return (
    <div className={style.auth}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <Input
          type={"password"}
          placeholder={"Введите новый пароль"}
          onChange={handleChangeForm}
          value={form.password}
          name={"password"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleChangeForm}
          value={form.token}
          name={"token"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button type="primary" size="large">
          Сохранить
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

export default ResetPassword;
