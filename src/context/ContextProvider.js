import React, {createContext, useContext, useState} from "react";

const StateContext = createContext();

export const ContextProvider = ({children}) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);
    const [check, setCheck] = useState(false)

    const handleCheck = () => {
        setCheck(!check)
    }

    return (
        <StateContext.Provider
        value={{
            activeMenu, setActiveMenu,
            screenSize, setScreenSize,
            check, setCheck, handleCheck
        }}
        >
        {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
