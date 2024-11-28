import { useContext, useState } from "react";
import { EPSystems } from "../../data/engines";
import { MainContext } from "../../state/MainProvider";
import Comparison from "./comparison";

const OptionsToCompare = () => {
  const { addStep, goBack, setSelectedOptionToCompare } =
    useContext(MainContext);
  const [types] = useState(() => new Set(EPSystems.map((el) => el.type)));

  const handleOptionClick = (type) => {
    setSelectedOptionToCompare(type);
    addStep(<Comparison />);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-center text-xl text-white/20 font-thin">
        Select EPS to compare
      </h2>
      <div className="grid grid-cols-1 place-items-center w-fit">
        {Array.from(types).map((type) => (
          <div key={type} tabIndex={0} className="collapse">
            <input type="checkbox" />
            <div className="collapse-title font-bold pe-0 flex justify-center text-md md:text-3xl xl:text-5xl">
              <span className="text-center">{type}</span>
            </div>
            <div className="collapse-content text-white flex flex-col gap-2">
              {EPSystems.filter((el) => el.type === type).map((item) => (
                <button
                  onClick={() => handleOptionClick(item.name)}
                  key={item.name}
                  className="btn btn-outline btn-sm md:btn-md"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={goBack}
        className="btn btn-outline md:fixed left-10 top-2/4"
      >
        Go back
      </button>
    </div>
  );
};

export default OptionsToCompare;
