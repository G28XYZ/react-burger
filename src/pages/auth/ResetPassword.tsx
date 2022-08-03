import { Button, Input, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { TICons } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ChangeEvent, FC, FormEvent, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onResetPassword } from './../../services/actions/user';
import { useAppDispatch } from './../../services/store';
import style from './auth.module.css';

const ResetPassword: FC = () => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<{ [key: string]: string }>({ token: '', password: '' });
  const [icon, setIcon] = useState<string>('ShowIcon');
  const navigate = useNavigate();
  const refPassword = useRef<HTMLInputElement>(null);

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(onResetPassword(form)).then(({ payload }) => {
      if (payload) navigate('/login');
    });
  };

  const onIconClick = () => {
    const input = refPassword.current;
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
      setIcon(icon === 'ShowIcon' ? 'HideIcon' : 'ShowIcon');
    }
  };

  return (
    <div className={`${style.auth} pt-30`}>
      <Logo />
      <form className={style.form} onSubmit={handleSubmit}>
        <h2 className='text text_type_main-medium pt-20'>Восстановление пароля</h2>
        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
          onChange={handleChangeForm}
          value={form.password}
          name={'password'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          icon={icon as keyof TICons}
          onIconClick={onIconClick}
          ref={refPassword}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChangeForm}
          value={form.token}
          name={'token'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button type='primary' size='medium'>
          Сохранить
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

export default ResetPassword;
