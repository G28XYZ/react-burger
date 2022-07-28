import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { useAppSelector } from "../../services/store";
import { wssAddress } from "../../utils/constants";
import { IFetchOrdersData, Ingredient } from "../../utils/types";
import style from "./feed.module.scss";
import OrderFeed from "../../components/order-feed/OrderFeed";
import StatusFeed from "../../components/status-feed/StatusFeed";

function Feed() {
  const user = useAppSelector((state) => state);
  const ingredientState = useAppSelector((state) => state.ingredients);
  const [ordersData, setOrdersData] = useState<IFetchOrdersData>({
    orders: [],
    success: false,
    total: 0,
    totalToday: 0,
  });

  const processEvent = useCallback(
    (event: MessageEvent) => {
      const normalizeData = JSON.parse(event.data);
      if (normalizeData.success === true) {
        console.log(normalizeData);
        setOrdersData({ ...ordersData, ...normalizeData });
      }
    },
    [ordersData]
  );

  const { connect } = useSocket(wssAddress, {
    onMessage: processEvent,
  });

  const getIngredientByParameter = (parameterName: string, value: string): Ingredient | undefined => {
    const findIngredient = ingredientState.ingredients.find(
      (ingredient: Ingredient): boolean => ingredient[parameterName as keyof Ingredient] === value
    );
    return findIngredient;
  };

  useEffect(() => {
    connect("");
  }, []);

  useEffect(() => {}, [ordersData.total]);

  return (
    <section className={`${style.feed} pt-10`}>
      <h2 className={`${style.feedOrdersTitle} text text_type_main-large`}>Лента заказов</h2>
      <div className={style.feedOrders}>
        <OrderFeed ordersData={ordersData} getIngredientByParameter={getIngredientByParameter} />
        <StatusFeed ordersData={ordersData} getIngredientByParameter={getIngredientByParameter} />
      </div>
    </section>
  );
}

export default Feed;
