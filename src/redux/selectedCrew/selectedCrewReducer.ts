import {
    CHANGE_SELECTED_CREW_TO_EMPTY,
    CHANGE_SELECTED_CREW_TO_VALUE,
  } from "./selectedCrewTypes";
  
  // Initial State
  export const initialState = {
    selectedCrew: null,
  };
  
  // Reducer
  export const selectedCrewReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case CHANGE_SELECTED_CREW_TO_EMPTY:
        return {
          ...state,
          selectedCrew: null
        };
      case CHANGE_SELECTED_CREW_TO_VALUE:
      return {
        ...state,
        selectedCrew: action.payload
      };
      default:
        return state;
    };
  };
  
  export default selectedCrewReducer;