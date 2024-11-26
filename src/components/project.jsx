import { useContext } from "react";
import { MainContext } from "../state/MainProvider";

const Project = () => {
  const { steps } = useContext(MainContext);

  return (
    <div
      tabIndex={0}
      className="collapse z-10 flex items-center justify-center overflow-visible"
    >
      {steps[steps.length - 1]}
    </div>
  );
};

export default Project;
