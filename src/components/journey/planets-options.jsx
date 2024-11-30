import { useContext } from "react";
import { planets } from "../../data/planets";
import { MainContext } from "../../state/MainProvider";
import ThrusterOptions from "./thruster-options";

const PlanetsOptions = () => {
  const { addStep, goBack, setSelectedPlanet } = useContext(MainContext);

  const handlePlanetSelect = (planet) => {
    setSelectedPlanet(planet);
    addStep(<ThrusterOptions />);
  };

  return (
    <div className="flex items-center justify-center flex-col gap-3 w-full">
      <h2 className="text-center flex items-center justify-center gap-3 text-xl text-white/50 font-thin">
        Select Your Planet
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-20 max-w-2xl">
        {planets.map((planet) => {
          if (planet.name === "Mars") {
            return (
              <button
                className="transition-transform hover:scale-105 rounded-full"
                key={planet.name}
                onClick={() => handlePlanetSelect(planet)}
              >
                <img src={planet.icon} alt={planet.name} className="size-32" />
                <span>{planet.name}</span>
              </button>
            );
          }

          return (
            <button
              key={planet.name}
              className="transition-transform text-center hover:scale-105 rounded-full opacity-20"
            >
              <img src={planet.icon} alt={planet.name} className="size-32" />
              {/* <span>{planet.name}</span> */}
              coming soon
            </button>
          );
        })}
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

export default PlanetsOptions;
