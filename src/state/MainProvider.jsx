import React, { createContext, useState } from "react";

export const MainContext = createContext(null);

const MainProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionToCompare, setSelectedOptionToCompare] = useState(null);
  const reset = () => {
    setSelectedOption(null);
    setSelectedOptionToCompare(null);
  };

  const value = {
    selectedOption,
    setSelectedOption,
    selectedOptionToCompare,
    setSelectedOptionToCompare,
    reset,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainProvider;
