import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IFetchOrderItem, IFetchOrdersData } from './../../utils/types';
import style from './order-feed.module.scss';
import OrderFeedComponent from './OrderFeedComponent';

const OrderFeed: FC<{ orderFeedData: IFetchOrdersData; route: string }> = ({ orderFeedData, route }) => {
  const location = useLocation();

  return (
    <ul className={`${style.orders} custom-scroll`}>
      {orderFeedData.orders.map((order: IFetchOrderItem) => (
        <Link
          key={order._id}
          to={`${route}/${order._id}`}
          className={`${style.link}`}
          state={{ backgroundLocation: location }}
        >
          <OrderFeedComponent order={order} route={route} />
        </Link>
      ))}
    </ul>
  );
};

export default OrderFeed;
