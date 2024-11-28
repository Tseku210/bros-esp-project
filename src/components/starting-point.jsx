import { useContext } from "react";
import { MainContext } from "../state/MainProvider";
import Options from "./comparison/options";
import SpacecraftOptions from "./journey/spacecraft-options";

const StartingPoint = ({ goToComparison, goToDeepSpaceMission }) => {
  const { addStep } = useContext(MainContext);
  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full">
      <h1 className="font-bold text-2xl md:text-3xl lg:text-5xl">
        PNU Space Library
      </h1>
      <div className="w-full flex flex-col gap-5 justify-around">
        <button
          className="btn btn-outline md:btn-lg"
          onClick={() => addStep(<Options />)}
        >
          Comparison
        </button>
        <button
          className="btn btn-outline md:btn-lg"
          onClick={() => addStep(<SpacecraftOptions />)}
        >
          Deep Space Mission
        </button>
      </div>
    </div>
  );
};

export default StartingPoint;
