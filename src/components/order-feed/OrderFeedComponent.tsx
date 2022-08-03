import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CSSProperties, FC, useState } from 'react';
import { useAppSelector } from './../../services/store';
import { statusList } from './../../utils/constants';
import { formatDateOrder } from './../../utils/formatDateOrder';
import { getIngredientByParameter } from './../../utils/getIngredientByParameter';
import { IFetchOrderItem, Ingredient } from './../../utils/types';
import style from './order-feed.module.scss';

const OrderFeedComponent: FC<{ order: IFetchOrderItem; route: string }> = ({ order, route }) => {
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const [totalCount] = useState<number>(6);
  const countIngredientsInOrder = order.ingredients.length;

  const getPrice = (ingredientId: string): number => {
    return getIngredientByParameter('_id', ingredientId, ingredients as Ingredient[])?.price || 0;
  };

  const getImage = (ingredientId: string): string => {
    return getIngredientByParameter('_id', ingredientId, ingredients as Ingredient[])?.image_mobile || '';
  };

  const MoreOverlayElement = () => {
    return (
      <span className={`${style.hiddenCount} text text_type_digits-default`}>
        +{order.ingredients.length > totalCount ? order.ingredients.length - totalCount : totalCount}
      </span>
    );
  };

  return (
    <li
      key={order._id}
      className={`${style.orderItem}`}
      style={{ '--ingredientCount': order.ingredients.length } as CSSProperties}
    >
      <div className={`${style.orderHeader}`}>
        <p className='text text_type_digits-default'>#{order.number}</p>
        <p className='text text_type_main-default text_color_inactive'>{formatDateOrder(order.updatedAt)}</p>
      </div>
      <h3 className='text text_type_main-medium'>{order.name}</h3>
      {route === '/profile/orders' && <p className={`${''} text text_type_main-default`}>{statusList[order.status]}</p>}
      <div className={`${style.orderInfo}`}>
        <div className={style.orderImages}>
          {order.ingredients.slice(0, totalCount).map((ingredientId: string, i: number) => (
            <div key={ingredientId + i} className={`${style.orderImageContainer}`}>
              <img className={style.orderImage} src={getImage(ingredientId)} alt={ingredientId} />
              {countIngredientsInOrder > totalCount && totalCount === i + 1 && <MoreOverlayElement />}
            </div>
          ))}
        </div>
        <p className={`${style.price} text text_type_digits-default`}>
          {order.ingredients.reduce((price: number, id: string) => price + getPrice(id), 0)}
          <CurrencyIcon type='primary' />
        </p>
      </div>
    </li>
  );
};

export default OrderFeedComponent;
