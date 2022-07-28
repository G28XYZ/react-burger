import { FC, useEffect } from "react";
import OrderFeed from "../../components/order-feed/OrderFeed";
import { useAppSelector } from "../../services/store";
import style from "./profile-orders.module.css";

const Orders: FC = () => {
  const { ownerOrderFeedData } = useAppSelector((state) => state.feed);
  useEffect(() => {}, []);

  return (
    <section>
      {ownerOrderFeedData.success && (
        <div className={style.feedOrders}>
          <OrderFeed orderFeedData={ownerOrderFeedData} route={"/profile/orders"} />
        </div>
      )}
    </section>
  );
};

export default Orders;
