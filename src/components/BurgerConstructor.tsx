import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={""}
      />
    </div>
  );
}

export default BurgerConstructor;
