import { Ingredient } from "../../utils/types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "../burger-constructor/burger-constructor.module.css";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

function ConstructorIngredient({ item }: { item: Ingredient }) {
  const ref = useRef(null);

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
      const item = ingredient as Ingredient;
      const itemType = monitor.getItemType();
      const draggedIndex = Object.assign(monitor).targetId;
      console.log(draggedIndex);
      //если на элемент конструктора наведен добавляемый ингредиент
      console.log(itemType);
      if (itemType === "ingredient" && item.type !== "bun") {
        //то записываем отдельное поле стора, индекс куда и что перетаскиваем
        //  dispatch({
        //          type: ConstructorActionTypes.SET_DRAGGED,
        //          payload: {
        //            index: draggedIndex,
        //            data: item
        //          }
        //      })
      }

      if (itemType === "constructor_ingredient") {
        //  dispatch({
        //      type: ConstructorActionTypes.MOVE,
        //      payload: {
        //        from: item.ingredient.constructorId,
        //        to: ingredient.constructorId
        //      }
        //    })
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
