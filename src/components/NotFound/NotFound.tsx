import { useNavigate } from "react-router-dom";
import style from "./not-found.module.css";

function NotFound() {
  const navigate = useNavigate();

  function handleClickMain() {
    navigate("/");
  }

  return (
    <section className={style.error + " text text_type_main-default"}>
      <h1 className={style.title}>404</h1>
      <p className={style.message}>Страница не найдена</p>
      <button className={style.button + " text_type_main-medium"} onClick={handleClickMain}>
        На главную
      </button>
    </section>
  );
}

export default NotFound;
