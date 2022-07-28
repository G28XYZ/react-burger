import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo } from "react";
import { Params, useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import { formatDateOrder } from "../../utils/formatDateOrder";
import { getIngredientByParameter } from "../../utils/getIngredientByParameter";
import { IFetchOrderItem, Ingredient, IStateFeed } from "../../utils/types";
import style from "./feed-details.module.scss";

const FeedDetails: FC<{ orderFeedDataName: string }> = ({ orderFeedDataName }) => {
  const state = useAppSelector((state) => state.feed);
  const orderFeedData = state[orderFeedDataName as keyof IStateFeed];
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const params = useParams<Params>();
  const location = useLocation() as { state: { backgroundLocation: Location } };
  const background = location.state?.backgroundLocation;

  const statusList: { [key: string]: string } = {
    done: "Выполнен",
    inProcess: "Готовится",
    cancel: "Готовится",
  };

  const order = useMemo(
    () => orderFeedData.orders.find((order: IFetchOrderItem) => order._id === params.id),
    [params.id, orderFeedData]
  ) as IFetchOrderItem | undefined;

  const bun = useMemo(
    () =>
      ingredients.find(
        (ingredient: Ingredient) => ingredient.type === "bun" && order?.ingredients.includes(ingredient._id)
      ),
    [params.id, orderFeedData]
  ) as Ingredient | undefined;

  const ingredientList = useMemo(() => {
    const orderIngredients = order?.ingredients.map((id: string) =>
      getIngredientByParameter("_id", id, ingredients as Ingredient[])
    ) as Ingredient[];
    return orderIngredients.filter(
      (ingredient: Ingredient) => ingredient.type !== "bun" && order?.ingredients.includes(ingredient._id)
    );
  }, [params.id, orderFeedData]);

  return (
    <>
      {order && (
        <div className={`${style.modal} ${!background && "pt-30"}`}>
          <p className={`text text_type_digits-default`}>#{order.number}</p>
          <h2 className={`${style.title} text text_type_main-medium pt-10`}>{order.name}</h2>
          <p className={`${style.status} text text_type_main-default pt-3`}>
            {statusList[order.status || "inProcess"]}
          </p>
          <p className={`${style.structureTitle} text text_type_main-medium pt-20 pb-8`}>Состав:</p>
          <ul className={`${style.orderList} custom-scroll`}>
            <li className={`${style.orderItem} pr-2`}>
              <div className={`${style.orderImageContainer}`}>
                <img className={style.orderImage} src={bun?.image_mobile} alt={bun?.name} />
              </div>
              <p className={`${style.ingredientName} text text_type_main-default`}>{bun?.name}</p>
              <p className={`${style.price} text text_type_digits-default`}>
                2 x {bun?.price} <CurrencyIcon type="primary" />
              </p>
            </li>
            {ingredientList.map((ingredient: Ingredient) => (
              <li className={`${style.orderItem} pr-2`} key={ingredient._id}>
                <div className={`${style.orderImageContainer}`}>
                  <img className={style.orderImage} src={ingredient.image_mobile} alt={ingredient.name} />
                </div>
                <p className={`${style.ingredientName} text text_type_main-default`}>{ingredient.name}</p>
                <p className={`${style.price} text text_type_digits-default`}>
                  1 x {ingredient?.price} <CurrencyIcon type="primary" />
                </p>
              </li>
            ))}
          </ul>
          <div className={`${style.orderInfo} pt-8`}>
            <p className={`text text_type_main-default text_color_inactive`}>{formatDateOrder(order.updatedAt)}</p>
            <p className={`${style.price} text text_type_digits-default`}>
              {ingredientList.reduce(
                (totalPrice: number, ingredient: Ingredient) => totalPrice + ingredient.price,
                (bun?.price || 0) * 2
              )}{" "}
              <CurrencyIcon type="primary" />
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedDetails;
