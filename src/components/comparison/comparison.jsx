import { useContext } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { EPSystems } from "../../data/engines";
import { compareSystems } from "../../lib/compare";
import { MainContext } from "../../state/MainProvider";

const Comparison = () => {
  const { reset, goBack, selectedOption, selectedOptionToCompare } =
    useContext(MainContext);

  const system1 = EPSystems.find((item) => item.name === selectedOption);
  const system2 = EPSystems.find(
    (item) => item.name === selectedOptionToCompare,
  );

  if (!system1 || !system2) {
    return (
      <div>
        You didn't select two EPS to compare.{" "}
        <button className="btn btn-link" onClick={goBack}>
          go back
        </button>
      </div>
    );
  }

  const result = compareSystems(system1, system2);

  // Determine the overall winner
  const winnerCount = { [system1.name]: 0, [system2.name]: 0 };

  result.forEach((res) => {
    if (res.difference > 0) {
      winnerCount[system1.name]++;
    } else if (res.difference < 0) {
      winnerCount[system2.name]++;
    }
  });

  let overallWinner = null;
  if (winnerCount[system1.name] > winnerCount[system2.name]) {
    overallWinner = system1;
  } else if (winnerCount[system1.name] < winnerCount[system2.name]) {
    overallWinner = system2;
  }

  return (
    <div>
      {/* System Details */}
      <div className="flex items-center justify-center mt-96">
        {system1 ? (
          <div className="w-fit flex gap-5 text-3xl relative">
            <img
              src="ship-orange.svg"
              alt="ship orange"
              className="size-16 absolute -top-20 right-2/4"
            />
            <div className="flex flex-col gap-2 items-end">
              {Object.keys(system1).map((key) => (
                <span key={key} className="capitalize font-light text-white/30">
                  {key + ": "}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2 font-medium">
              <span className="text-orange-300">{system1.name}</span>
              <span className="text-orange-300">{system1.type}</span>
              <span className="text-orange-300">{system1.powerToThrust}</span>
              <span className="text-orange-300">{system1.thrust}</span>
              <span className="text-orange-300">{system1.isp}</span>
              <span className="text-orange-300">{system1.totalImpulse}</span>
            </div>
          </div>
        ) : (
          <div>Not found</div>
        )}
        {system2 ? (
          <div className="w-fit flex gap-5 text-3xl relative">
            <img
              src="ship-red.svg"
              alt="ship red"
              className="size-16 absolute -top-20 right-2/4"
            />
            <div className="flex flex-col gap-2 items-end">
              {Object.keys(system2).map((key) => (
                <span key={key} className="capitalize font-light text-white/30">
                  {key + ": "}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2 font-medium">
              <span className="text-red-300">{system2.name}</span>
              <span className="text-red-300">{system2.type}</span>
              <span className="text-red-300">{system2.powerToThrust}</span>
              <span className="text-red-300">{system2.thrust}</span>
              <span className="text-red-300">{system2.isp}</span>
              <span className="text-red-300">{system2.totalImpulse}</span>
            </div>
          </div>
        ) : (
          <div>Not found</div>
        )}
      </div>

      {/* Comparison Results */}
      <h3 className="text-center text-white/20 mt-32 mb-5 text-xl underline">
        Result
      </h3>
      <div className="mx-auto w-fit grid grid-cols-2 gap-3 text-xl">
        {result.map((res, index) => (
          <div key={index}>
            <span className="capitalize font-light text-white/30">
              {res.metric}:
            </span>
            <br />
            <span className="text-orange-300">
              {system1.name}: {res.system1Value}
            </span>
            <br />
            <span className="text-red-300">
              {system2.name}: {res.system2Value}
            </span>
            <br />
            {res.difference
              ? `${Math.abs(res.difference.toFixed(2))}% ${
                  res.difference > 0 ? "better" : "worse"
                } for ${res.betterSystem}`
              : res.result}
          </div>
        ))}
      </div>

      {/* Comparison Graphs */}
      <div className="mt-10 max-w-5xl mx-auto">
        <h2 className="text-center text-2xl mb-6">Comparison Graphs</h2>
        {result.map((res, index) => (
          <div key={index} className="mb-10">
            <h3 className="text-center text-xl mb-4">{res.metric}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  {
                    metric: res.metric,
                    [system1.name]: res.system1Value || 0,
                    [system2.name]: res.system2Value || 0,
                  },
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Legend />
                <Bar dataKey={system1.name} fill="#FFA500" />
                <Bar dataKey={system2.name} fill="#FF4500" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      {/* Overall Winner */}
      <div className="my-20 text-center">
        {overallWinner ? (
          <>
            <h2 className="text-3xl text-green-300">Overall Winner</h2>
            <p className="text-2xl mt-4 text-white">
              {overallWinner.name} ({overallWinner.type})
            </p>
            <p className="text-lg mt-2 text-gray-400">
              {winnerCount[overallWinner.name]} out of {result.length} metrics
              won.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl text-yellow-300">It's a Tie!</h2>
            <p className="text-2xl mt-4 text-white">
              Both {system1.name} and {system2.name} performed equally well.
            </p>
            <p className="text-lg mt-2 text-gray-400">
              Consider other metrics or mission-specific requirements to make a
              final decision.
            </p>
          </>
        )}
      </div>
      {/* Navigation Buttons */}
      <button
        onClick={goBack}
        className="btn btn-outline fixed left-10 top-2/4"
      >
        Go back
      </button>
      <button
        onClick={reset}
        className="btn btn-outline fixed right-10 top-2/4"
      >
        Start new?
      </button>
    </div>
  );
};

export default Comparison;
