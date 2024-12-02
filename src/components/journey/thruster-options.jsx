import { useContext, useState } from "react";
import { EPSystems } from "../../data/engines";
import { MainContext } from "../../state/MainProvider";
import MissionResult from "./mission-result";

const ThrusterOptions = () => {
  const { addStep, goBack, setSelectedThruster, ranking } =
    useContext(MainContext);
  const [types] = useState(() => new Set(EPSystems.map((el) => el.type)));
  const usedThrusters = new Set(ranking.map((item) => item.name));

  const handleOptionClick = (thruster) => {
    setSelectedThruster(thruster);
    addStep(<MissionResult />);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-center text-xl text-white/20 font-thin">
        Select Your Thruster For The Spacecraft
      </h2>
      <div className="grid grid-cols-1 place-items-center">
        {Array.from(types).map((type) => (
          <div key={type} tabIndex={0} className="collapse">
            <input type="checkbox" />
            <div className="collapse-title font-bold pe-0 flex justify-center text-md md:text-3xl xl:text-5xl">
              <span className="text-center">{type}</span>
            </div>
            <div className="collapse-content text-white flex flex-col gap-2">
              {EPSystems.filter(
                (el) => el.type === type && !usedThrusters.has(el.name),
              ).map((item) => (
                <button
                  onClick={() => handleOptionClick(item)}
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

export default ThrusterOptions;
