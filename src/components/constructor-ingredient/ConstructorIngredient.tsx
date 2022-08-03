import { CollectedProps, DragObject, DropResult, Ingredient } from './../../utils/types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './../burger-constructor/burger-constructor.module.css';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { FC, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './../../services/store';
import orderSlice from './../../services/reducers/order';

const ConstructorIngredient: FC<{ item: Ingredient }> = ({ item }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { isDrag } = state.ingredients;
  const orderList = state.order.list;
  const { setDragged, moveIngredient, deleteInOrder } = orderSlice.actions;
  const ref = useRef<HTMLDivElement>(null);

  const [{ opacity }, drag] = useDrag<DragObject, DropResult, CollectedProps>({
    type: 'constructor_ingredient',
    item: item as Ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
    end(item) {
      return item;
    },
  });

  const [, dropTarget] = useDrop<CollectedProps>({
    accept: ['constructor_ingredient', 'ingredient'],
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      handlerId: monitor.getHandlerId(),
    }),
    hover(ingredient, monitor) {
      const dragItem = ingredient as Ingredient;
      const itemType = monitor.getItemType();
      if (itemType === 'ingredient') {
        dispatch(setDragged({ ingredient: null }));
      }
      if (itemType === 'constructor_ingredient') {
        const hoverIndex = orderList.findIndex((element: Ingredient) => element.shortId === item.shortId);
        const dragIndex = orderList.findIndex((element: Ingredient) => element.shortId === dragItem.shortId);
        if (dragIndex === hoverIndex) {
          return;
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect() as DOMRect;
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        dispatch(moveIngredient({ from: dragItem, to: item }));
      }
    },
  });

  function handleDeleteIngredient() {
    dispatch(deleteInOrder({ deletedItem: item }));
  }

  const [, dropDragIcon] = useDrop<CollectedProps>({
    accept: 'ingredient',
    hover: (ingredient) => {
      const dragItem = ingredient as Ingredient;
      if (dragItem.type !== 'bun') {
        dispatch(setDragged({ ingredient: item }));
      }
    },
  });

  drag(dropTarget(ref));

  return item.type !== 'bun' ? (
    <div className={style.element_container} ref={ref} style={{ opacity }}>
      <div ref={dropDragIcon} className={style.dragIcon}>
        {isDrag ? <div className={style.replaceIcon}>↻</div> : <DragIcon type='primary' />}
      </div>
      <div className={style.element}>
        <ConstructorElement
          isLocked={false}
          text={item.name}
          price={item.price}
          thumbnail={item.image_mobile}
          handleClose={handleDeleteIngredient}
        />
      </div>
    </div>
  ) : null;
};

export default ConstructorIngredient;
