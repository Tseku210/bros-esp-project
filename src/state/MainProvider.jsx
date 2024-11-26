import React, { createContext, useState } from "react";
import StartingPoint from "../components/starting-point";

export const MainContext = createContext(null);

const MainProvider = ({ children }) => {
  const [ranking, setRanking] = useState([]);
  const [steps, setSteps] = useState(() => [<StartingPoint />]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionToCompare, setSelectedOptionToCompare] = useState(null);
  const [selectedShip, setSelectedShip] = useState(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [selectedThruster, setSelectedThruster] = useState(null);
  const reset = () => {
    setSelectedOption(null);
    setSelectedOptionToCompare(null);
    setSelectedShip(null);
    setSelectedPlanet(null);
    setSelectedThruster(null);
    setSteps([<StartingPoint />]);
  };
  const addStep = (comp) => {
    setSteps((prev) => [...prev, comp]);
  };
  const goBack = () => {
    if (steps.length === 1) return;
    setSteps((prev) => prev.slice(0, -1));
  };

  const addToRanking = (item) => {
    const orderedRanking = [...ranking, item].sort((a, b) => a.days - b.days);
    setRanking(orderedRanking);
  };

  const value = {
    ranking,
    setRanking,
    addToRanking,
    steps,
    addStep,
    goBack,
    selectedOption,
    setSelectedOption,
    selectedShip,
    setSelectedShip,
    selectedPlanet,
    setSelectedPlanet,
    selectedThruster,
    setSelectedThruster,
    selectedOptionToCompare,
    setSelectedOptionToCompare,
    reset,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainProvider;
