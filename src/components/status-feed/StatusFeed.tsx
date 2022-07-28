import { FC, useMemo } from "react";
import { IFetchOrderItem, IFetchOrdersData } from "../../utils/types";
import style from "./status-feed.module.scss";

const StatusFeed: FC<{
  ordersData: IFetchOrdersData;
  getIngredientByParameter: Function;
}> = ({ ordersData, getIngredientByParameter }) => {
  const inProcessOrder = useMemo(
    () => ordersData.orders.filter((order: IFetchOrderItem) => order.status !== "done"),
    [ordersData.orders]
  );

  const completedOrder = useMemo(
    () => ordersData.orders.filter(() => ordersData.orders.filter((order: IFetchOrderItem) => order.status === "done")),
    [ordersData.orders]
  );

  return (
    <div className={`${style.status}`}>
      <div className={`${style.statusProgress}`}>
        <div className={`${style.completed}`}>
          <p className={`text text_type_main-medium pb-4`}>Готовы:</p>
          <ul className={`${style.completedList} text text_type_digits-default custom-scroll`}>
            {completedOrder.map((order: IFetchOrderItem) => (
              <li>{order.number}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text text_type_main-medium pb-4">В работе:</p>
          <ul className={`${style.statusListInProcess} custom-scroll`}>
            {inProcessOrder.map((order: IFetchOrderItem) => (
              <li className={`${style.statusProcess} text text_type_digits-default`}>{order.status}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`${style.total} text text_type_digits-large`}>{ordersData.total}</p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`${style.totalToday} text text_type_digits-large`}>{ordersData.totalToday}</p>
      </div>
    </div>
  );
};

export default StatusFeed;
