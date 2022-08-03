import { FC } from 'react';
import doneImage from './../../images/done.png';
import style from './order-info.module.css';

const OrderInfo: FC<{ orderId: string }> = ({ orderId }) => {
  return (
    <div className={style.modal}>
      <h2 className={style.title + ' text text_type_digits-large'}>{orderId}</h2>
      <p className='text text_type_main-medium pt-5'>идентификатор заказа</p>
      <img src={doneImage} alt='Символ галочки' className='pt-10 pb-10' />
      <p className='text text_type_main-small'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-small text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderInfo;
