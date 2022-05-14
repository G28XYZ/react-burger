import doneImage from "../../images/done.png";
import style from "./order-details.module.css";

function OrderDetails() {
  return (
    <div className={style.modal}>
      <h2 className={style.title + " text text_type_digits-large"}>034536</h2>
      <p className="text text_type_main-default">идентификатор заказа</p>
      <img src={doneImage} alt="Символ галочки" />
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
