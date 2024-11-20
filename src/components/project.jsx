import { useContext, useState } from "react";
import { MainContext } from "../state/MainProvider";
import Comparison from "./comparison";
import Details from "./details";
import Options from "./options";
import OptionsToCompare from "./options-to-compare";

const Project = () => {
  const [step, setStep] = useState(0);
  const { reset } = useContext(MainContext);

  const goNext = () => {
    setStep((prev) => prev + 1);
  };

  const goBack = () => {
    if (step === 0) return;
    setStep((prev) => prev - 1);
  };

  const resetAll = () => {
    setStep(0);
    reset();
  };

  return (
    <div
      tabIndex={0}
      className="collapse z-10 flex items-center justify-center overflow-visible"
    >
      {step === 0 && <Options next={goNext} />}
      {step === 1 && <Details next={goNext} back={goBack} />}
      {step === 2 && <OptionsToCompare next={goNext} back={goBack} />}
      {step === 3 && <Comparison next={resetAll} back={goBack} />}
    </div>
  );
};

export default Project;
