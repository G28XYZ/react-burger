import { IAction, IState } from "../../utils/types";
import { CONSTRUCTOR_CLICK } from "../actions/constructor";

function constructorReducer(state: IState, action: IAction) {
  switch (action.type) {
    case CONSTRUCTOR_CLICK:
      console.log(action);
      return state;
    default:
      return state;
  }
}

export default constructorReducer;
