import { combineReducers } from "redux";
import selectedCrewReducer from "./selectedCrew/selectedCrewReducer";

const rootReducer = combineReducers({
  selectedCrew: selectedCrewReducer,
});

export default rootReducer;
