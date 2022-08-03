import { FC } from 'react';
import OrderFeed from './../../components/order-feed/OrderFeed';
import { useAppSelector } from './../../services/store';
import style from './profile-orders.module.css';

const Orders: FC = () => {
  const { data } = useAppSelector((state) => state.feedWS);

  return (
    <section>
      {data.success && (
        <div className={style.feedOrders}>
          <OrderFeed orderFeedData={data} route={'/profile/orders'} />
        </div>
      )}
    </section>
  );
};

export default Orders;
