import { useContext } from "react";
import { EPSystems } from "../../data/engines";
import { MainContext } from "../../state/MainProvider";
import Details from "./details";

const Options = () => {
  const { addStep, goBack, setSelectedOption } = useContext(MainContext);
  const types = new Set(EPSystems.map((el) => el.type));

  const handleOptionClick = (type) => {
    setSelectedOption(type);
    addStep(<Details />);
  };

  return (
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
      <button
        onClick={goBack}
        className="btn btn-outline w-full md:w-fit md:fixed left-10 top-2/4"
      >
        Go back
      </button>
    </div>
  );
};

export default Options;
