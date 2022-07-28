import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CSSProperties, FC, useState } from "react";
import { IFetchOrdersData } from "../../utils/types";
import style from "./order-feed.module.scss";

const OrderFeed: FC<{
  ordersData: IFetchOrdersData;
  getIngredientByParameter: Function;
}> = ({ ordersData, getIngredientByParameter }) => {
  const [totalCount] = useState<number>(6);

  const formatDateOrder = (updatedAt: string) => {
    const formatTime = (time: number) => (time < 10 ? `0${time}` : time);
    const updatedDate = new Date(updatedAt);
    const nowDate = new Date();
    let day: number | string = nowDate.getDay() - updatedDate.getDay();
    day = day ? (day > 1 ? `${day} назад` : "Вчера") : "Сегодня";
    return `${day}, ${formatTime(updatedDate.getHours())}:${formatTime(
      updatedDate.getMinutes()
    )} i-GMT+${updatedDate.getUTCHours()}`;
  };

  return (
    <ul className={`${style.orders} custom-scroll`}>
      {ordersData.orders.map((order: any) => (
        <li
          key={order._id}
          className={`${style.orderItem}`}
          style={{ "--ingredientCount": order.ingredients.length } as CSSProperties}
        >
          <div className={`${style.orderHeader}`}>
            <p className="text text_type_digits-default">#{order.number}</p>
            <p className="text text_type_main-default text_color_inactive">{formatDateOrder(order.updatedAt)}</p>
          </div>
          <h3 className="text text_type_main-medium">{order.name}</h3>
          <div className={`${style.orderInfo}`}>
            <div className={style.orderImages}>
              {order.ingredients.slice(0, totalCount).map((ingredientId: string, i: number) => (
                <div key={ingredientId + i} className={`${style.orderImageContainer}`}>
                  <img
                    className={style.orderImage}
                    src={getIngredientByParameter("_id", ingredientId)?.image_mobile}
                    alt={ingredientId}
                  />
                  {order.ingredients.length > totalCount && totalCount === i + 1 && (
                    <span className={`${style.hiddenCount} text text_type_digits-default`}>
                      +{order.ingredients.length > totalCount ? order.ingredients.length - totalCount : totalCount}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className={`${style.price} text text_type_digits-default`}>
              {order.ingredients.reduce(
                (price: number, id: string) => price + (getIngredientByParameter("_id", id)?.price as number),
                0
              )}
              <CurrencyIcon type="primary" />
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OrderFeed;
