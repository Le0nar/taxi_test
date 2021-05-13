import {
    CHANGE_SELECTED_CREW_TO_EMPTY,
    CHANGE_SELECTED_CREW_TO_VALUE,
  } from "./selectedCrewTypes";
  
  // Action Creators
  
  export const changeSelectedCrewToEmpty = () => ({
    type: CHANGE_SELECTED_CREW_TO_EMPTY,
  });
  
  export const changeSelectedCrewToValue = (value: any) => ({
    type: CHANGE_SELECTED_CREW_TO_VALUE,
    payload: value
  });