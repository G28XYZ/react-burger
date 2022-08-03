import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './not-found.module.css';

const NotFound: FC<{ code?: number | string; message?: string }> = ({
  code = 404,
  message = 'Страница не найдена',
}) => {
  const navigate = useNavigate();

  function handleClickMain() {
    navigate('/');
  }

  return (
    <section className={style.error + ' text text_type_main-default'}>
      <h1 className={style.title}>{code}</h1>
      <p className={style.message}>{message}</p>
      <button className={style.button + ' text_type_main-medium'} onClick={handleClickMain}>
        На главную
      </button>
    </section>
  );
};

export default NotFound;
