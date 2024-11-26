import { useContext } from "react";
import { MainContext } from "../../state/MainProvider";
import { spaceships } from "../../data/spaceships";
import PlanetsOptions from "./planets-options";

const SpacecraftOptions = () => {
  const { addStep, goBack, setSelectedShip } = useContext(MainContext);

  const handleOptionClick = (ship) => {
    setSelectedShip(ship);
    addStep(<PlanetsOptions />);
  };

  return (
    <div className="grid grid-cols-1 place-items-center w-full h-screen">
      <h2 className="text-center flex items-center absolute top-32 justify-center gap-3 text-xl text-white/50 font-thin">
        <img src="dawn-spaceship.png" alt="spaceship dawn" className="w-14" />
        Select Your Spaceship
      </h2>
      <div className="text-white max-w-2xl w-full flex flex-col gap-2">
        {spaceships.map((ship) => (
          <button
            onClick={() => handleOptionClick(ship)}
            key={ship.name}
            className="btn btn-outline btn-lg"
          >
            {ship.name}
          </button>
        ))}
        <button className="btn btn-outline btn-lg">coming soon</button>
        <button className="btn btn-outline btn-lg">coming soon</button>
      </div>

      <button
        onClick={goBack}
        className="btn btn-outline fixed left-10 top-2/4"
      >
        Go back
      </button>
    </div>
  );
};

export default SpacecraftOptions;
