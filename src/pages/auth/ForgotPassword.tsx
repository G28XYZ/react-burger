import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onForgotPassword } from './../../services/actions/user';
import { useAppDispatch } from './../../services/store';
import style from './auth.module.css';

const ForgotPassword: FC = () => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<{ email: string }>({ email: '' });
  const navigate = useNavigate();

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ email: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(onForgotPassword(form.email)).then(({ payload }) => {
      if (payload) navigate('/reset-password');
    });
  };

  return (
    <div className={`${style.auth} pt-30`}>
      <Logo />
      <form className={style.form} onSubmit={handleSubmit}>
        <h2 className='text text_type_main-medium pt-20'>Восстановление пароля</h2>
        <Input
          type={'text'}
          placeholder={'Укажите e-mail'}
          onChange={handleChangeForm}
          value={form.email}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button type='primary' size='medium'>
          Восстановить
        </Button>
      </form>
      <div>
        <p className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль?
          <Link to='/login' className={style.link + ' pl-3'}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
