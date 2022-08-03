import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { useAppSelector } from './../../services/store';
import style from './profile.module.css';

const ProfileForm: FC = () => {
  const { name, email } = useAppSelector((state) => state.user);
  const [form, setForm] = useState<{ [key: string]: string }>({ email, password: '', name });

  const handleChangeForm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }, []);

  useEffect(() => {
    setForm({ ...form, name, email });
  }, [name, email]);

  return (
    <form className={`${style.form} pt-20`}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handleChangeForm}
        icon={'EditIcon'}
        value={form.name}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
      />
      <Input
        type={'text'}
        placeholder={'E-mail'}
        onChange={handleChangeForm}
        icon={'EditIcon'}
        value={form.email}
        name={'email'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
      />
      <Input
        type={'password'}
        placeholder={'Пароль'}
        onChange={handleChangeForm}
        icon={'EditIcon'}
        value={form.password}
        name={'password'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
      />
    </form>
  );
};

export default ProfileForm;
