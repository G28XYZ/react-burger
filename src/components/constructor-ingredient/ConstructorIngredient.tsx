import { Ingredient } from "../../utils/types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "../burger-constructor/burger-constructor.module.css";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../services/store";
import orderSlice from "../../services/reducers/order";

function ConstructorIngredient({ item }: { item: Ingredient }) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state);
  const orderList = state.order.list;
  const { setDragged, moveIngredient } = orderSlice.actions;
  const ref = useRef<HTMLDivElement>(null);

  const [{ opacity }, drag] = useDrag({
    type: "constructor_ingredient",
    item: item as Ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
    end(item, monitor) {
      const dropResult = monitor.getDropResult();
      console.log(dropResult);
      return item;
    },
  });

  const [{ isHover, handlerId }, dropTarget] = useDrop({
    accept: ["constructor_ingredient", "ingredient"],
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      handlerId: monitor.getHandlerId(),
    }),
    hover(ingredient, monitor) {
      const dragItem = ingredient as Ingredient;
      const itemType = monitor.getItemType();
      //если на элемент конструктора наведен добавляемый ингредиент
      console.log(state.order.draggedIngredient);
      if (itemType === "ingredient" && dragItem.type !== "bun") {
        //то записываем отдельное поле стора, индекс куда и что перетаскиваем

        dispatch(setDragged({ ingredient }));
      }
      if (itemType === "constructor_ingredient") {
        // if ((dragItem.constructorId as number) - 1 === (item.constructorId as number) - 1) return;

        const hoverIndex = orderList.findIndex(
          (element: Ingredient) => element.shortId === item.shortId
        );
        const dragIndex = orderList.findIndex(
          (element: Ingredient) => element.shortId === dragItem.shortId
        );
        if (dragIndex === hoverIndex) {
          return;
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect() as any;
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;

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

  drag(dropTarget(ref));

  return item.type !== "bun" ? (
    <div className={style.element_container} ref={ref}>
      <DragIcon type="primary" />
      <div className={style.element}>
        <ConstructorElement
          isLocked={false}
          text={item.name}
          price={item.price}
          thumbnail={item.image_mobile}
        />
      </div>
    </div>
  ) : null;
}

export default ConstructorIngredient;
