import React, { createContext, useContext, useReducer } from "react";

//Prepares the data Layer
export const StateContext = createContext();

// Wrap our app and provide the Data Layer
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//sxPull the information from Data Layer
export const useStateValue = () => useContext(StateContext);