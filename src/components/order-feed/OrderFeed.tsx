import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import { IFetchOrderItem, IFetchOrdersData } from "../../utils/types";
import style from "./order-feed.module.scss";
import OrderFeedComponent from "./OrderFeedComponent";

const OrderFeed: FC<{ orderFeedData: IFetchOrdersData }> = ({ orderFeedData }) => {
  // const { orderFeedData } = useAppSelector((state) => state.feed);
  const location = useLocation();

  return (
    <ul className={`${style.orders} custom-scroll`}>
      {orderFeedData.orders.map((order: IFetchOrderItem) => (
        <Link
          key={order._id}
          to={`/feed/${order._id}`}
          className={`${style.link}`}
          state={{ backgroundLocation: location }}
        >
          <OrderFeedComponent order={order} />
        </Link>
      ))}
    </ul>
  );
};

export default OrderFeed;
