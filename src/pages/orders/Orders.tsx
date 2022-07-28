import { FC, useEffect } from "react";
import OrderFeed from "../../components/order-feed/OrderFeed";

const Orders: FC = () => {
  useEffect(() => {}, []);

  return (
    <section>
      {/* <h2 className={`${style.feedOrdersTitle} text text_type_main-large`}>Лента заказов</h2>
      {orderFeedData.success && (
        <div className={style.feedOrders}>
          <OrderFeed orderFeedData={orderFeedData} />
        </div>
      )} */}
    </section>
  );
};

export default Orders;
