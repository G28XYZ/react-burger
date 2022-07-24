import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { useAppSelector } from "../../services/store";
import { wssAddress } from "../../utils/constants";
import { Ingredient } from "../../utils/types";
import style from "./feed.module.css";

function Feed() {
  const user = useAppSelector((state) => state);
  const ingredientState = useAppSelector((state) => state.ingredients);
  const [data, setData] = useState<any>({ success: false, total: 0 });

  const processEvent = useCallback(
    (event: any) => {
      const normalizeData = JSON.parse(event.data);
      if (normalizeData.success === true) {
        console.log(normalizeData);
        setData({ ...data, ...normalizeData });
      }
    },
    [data]
  );

  const { sendData, connect } = useSocket(wssAddress, {
    onMessage: processEvent,
  });

  const getImageById = (ingredientId: string) => {
    const findIngredient = ingredientState.ingredients.find(
      (ingredient: Ingredient): boolean => ingredient._id === ingredientId
    );
    if (findIngredient) {
      return (findIngredient as Ingredient).image_mobile;
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      connect(token);
    }
  }, []);

  useEffect(() => {}, [data.total]);

  return (
    <section className={`${style.feed} pt-10`}>
      <div className={style.feedOrders}>
        <h2 className={style.feedOrdersTitle}>Лента заказов</h2>
        <ul className={style.orders}>
          {data.success &&
            data.orders.map((order: any) => (
              <li key={order._id} className={style.orderItem}>
                <div>
                  <p>#{order.number}</p>
                  <p>{order.createAt}</p>
                </div>
                <h3>{order.name}</h3>
                <div>
                  <div className={style.orderImages}>
                    {order.ingredients.map((ingredientId: string) => (
                      <div className={style.orderImageContainer}>
                        <img
                          className={style.orderImage}
                          src={getImageById(ingredientId)}
                          alt={ingredientId}
                        />
                      </div>
                    ))}
                  </div>
                  <p>Price</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div></div>
    </section>
  );
}

export default Feed;
