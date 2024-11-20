import { useContext, useState } from "react";
import { EPSystems } from "../data/engines";
import { MainContext } from "../state/MainProvider";

const Details = ({ next, back }) => {
  const { selectedOption } = useContext(MainContext);
  const [itemDetail, setItemDetail] = useState(() =>
    EPSystems.find((item) => item.name === selectedOption),
  );

  return (
    <div className="relative h-screen w-full flex flex-col gap-20 items-center justify-center">
      {itemDetail ? (
        <div className="w-fit flex gap-5 text-3xl">
          <div className="flex flex-col gap-2 items-end">
            {Object.keys(itemDetail).map((key) => (
              <span key={key} className="capitalize font-light text-white/30">
                {key + ": "}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2 font-medium">
            <span className="text-orange-300">{itemDetail.name}</span>
            <span className="text-orange-300">{itemDetail.type}</span>
            <span className="text-orange-300">{itemDetail.powerToThrust}</span>
            <span className="text-orange-300">{itemDetail.thrust}</span>
            <span className="text-orange-300">{itemDetail.isp}</span>
            <span className="text-orange-300">{itemDetail.totalImpulse}</span>
          </div>
        </div>
      ) : (
        <div>Not found</div>
      )}
      {itemDetail && (
        <button className="btn btn-link text-xl text-neutral-content">
          see more
        </button>
      )}
      <button
        onClick={back}
        className="btn btn-outline absolute left-10 top-2/4"
      >
        Go back
      </button>
      <button
        onClick={next}
        className="btn btn-outline btn-warning absolute right-10 top-2/4"
      >
        Compare
      </button>
    </div>
  );
};

export default Details;
