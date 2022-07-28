import { useAppSelector } from "../../services/store";
import style from "./feed.module.scss";
import OrderFeed from "../../components/order-feed/OrderFeed";
import StatusFeed from "../../components/status-feed/StatusFeed";
import { FC } from "react";
import { Outlet, Params, useParams } from "react-router-dom";

const Feed: FC = () => {
  const params = useParams<Params>();

  const { allOrderFeedData } = useAppSelector((state) => state.feed);

  return params.id ? (
    <Outlet />
  ) : (
    <section className={`${style.feed} pt-10`}>
      <h2 className={`${style.feedOrdersTitle} text text_type_main-large`}>Лента заказов</h2>
      {allOrderFeedData.success && (
        <div className={style.feedOrders}>
          <OrderFeed orderFeedData={allOrderFeedData} />
          <StatusFeed />
        </div>
      )}
    </section>
  );
};

export default Feed;
