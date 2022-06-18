import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { onRegister } from "../../services/actions/user";
import { useAppDispatch } from "../../services/store";
import style from "./auth.module.css";

function Register() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(onRegister(form));
  };

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
        <PasswordInput onChange={handleChangeForm} value={form.password} name={"password"} />
        <Button type="primary" size="large">
          Зарегистрироваться
        </Button>
      </form>
      <nav>
        <ul className={style.list}>
          <li className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
            <Link to="/login" className={style.link + " pl-3"}>
              Войти
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Register;
