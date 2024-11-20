import { useContext, useState } from "react";
import { ESPDetails } from "../data/engine-detail";
import { EPSystems } from "../data/engines";
import { cn } from "../lib/utils";
import { MainContext } from "../state/MainProvider";

const Details = ({ next, back }) => {
  const { selectedOption } = useContext(MainContext);
  const [itemDetail] = useState(() =>
    EPSystems.find((item) => item.name === selectedOption),
  );
  const [moreDetail, setMoreDetail] = useState(null);

  const seeMore = () => {
    if (!itemDetail) return;
    if (moreDetail) {
      setMoreDetail(null);
      return;
    }
    const detail = ESPDetails[itemDetail.name];
    if (detail) {
      setMoreDetail(detail);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col gap-20 items-center justify-center">
      {/* Basic Details */}
      {itemDetail ? (
        <div className={cn("w-fit flex gap-5 text-3xl", moreDetail && "mt-32")}>
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
        <button
          className="btn btn-link text-xl text-neutral-content"
          onClick={seeMore}
        >
          See more
        </button>
      )}

      {moreDetail && (
        <div className="w-3/4 p-6 mb-32 rounded-lg shadow-lg text-white">
          <h2 className="text-2xl font-bold mb-4">{itemDetail.name}</h2>
          <img
            src={moreDetail.image}
            alt="zurag"
            className="w-full max-h-64 object-contain mb-4"
          />
          <p className="mb-4 text-lg font-thin text-white/50">
            {moreDetail.background}
          </p>
          <h3 className="text-xl font-semibold">References:</h3>
          <ul className="list-disc pl-5">
            {moreDetail.references.map((ref, index) => (
              <li key={index}>
                <a
                  href={ref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 underline"
                >
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation Buttons */}
      <button onClick={back} className="btn btn-outline fixed left-10 top-2/4">
        Go back
      </button>
      <button
        onClick={next}
        className="btn btn-outline btn-warning fixed right-10 top-2/4"
      >
        Compare
      </button>
    </div>
  );
};

export default Details;
