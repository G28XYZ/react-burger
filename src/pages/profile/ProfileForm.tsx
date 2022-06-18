import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, useState } from "react";
import { useAppSelector } from "../../services/store";
import style from "./profile.module.css";

function Form() {
  const { name, email } = useAppSelector((state) => state.user);
  const [form, setForm] = useState({ email, password: "", name });

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form className={style.form}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleChangeForm}
        icon={"EditIcon"}
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
        icon={"EditIcon"}
        value={form.email}
        name={"email"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />
      <Input
        type={"password"}
        placeholder={"Пароль"}
        onChange={handleChangeForm}
        icon={"EditIcon"}
        value={form.password}
        name={"password"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />
    </form>
  );
}

export default Form;
