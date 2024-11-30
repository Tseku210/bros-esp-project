import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../state/MainProvider";
import { calculateMissionParameters } from "../../lib/mission";
import { cn } from "../../lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MissionResult = () => {
  const {
    selectedPlanet,
    addToRanking,
    ranking,
    selectedShip,
    selectedThruster,
    goBack,
    reset,
  } = useContext(MainContext);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const res = calculateMissionParameters(
      selectedShip,
      selectedPlanet,
      selectedThruster,
    );
    setResult(res);
    addToRanking({
      name: selectedThruster.name,
      days: res.totalTravelTimeDays,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!selectedPlanet || !selectedShip || !selectedThruster) {
    return (
      <div>
        Please select a ship, a planet, and a thruster to calculate the mission.
      </div>
    );
  }

  if (result === null) {
    return <div>calculating...</div>;
  }

  if (result && result.error) {
    return (
      <div>
        something went wrong. Refresh the page.
        {result.error}
        <button onClick={goBack}>go back</button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center align-center gap-3">
      <div className={cn("w-full flex flex-col gap-4 text-xl")}>
        <h2 className="text-xl md:text-3xl font-bold">Mission Summary</h2>
        <div className="flex flex-col gap-2 text-base ">
          <div>
            <span className="text-base font-semibold">Delta-V:</span>{" "}
            <span className="text-base text-orange-300">
              {result.deltaV.toFixed(2)} m/s
            </span>
          </div>
          <div>
            <span className="font-semibold">Propellant Consumed:</span>{" "}
            <span className="text-orange-300">
              {result.propellantConsumed.toFixed(2)} kg
            </span>
          </div>
          <div>
            <span className="font-semibold">Thrust Duration (Burn Time):</span>{" "}
            <span className="text-orange-300">
              {result.thrustDurationDays.toFixed(2)} days
            </span>
          </div>
          <div>
            <span className="font-semibold">Coasting Time:</span>{" "}
            <span className="text-orange-300">
              {result.coastingTimeDays.toFixed(2)} days
            </span>
          </div>
          <div>
            <span className="font-semibold">Total Travel Time:</span>{" "}
            <span className="text-orange-300">
              {result.totalTravelTimeDays.toFixed(2)} days
            </span>
          </div>
        </div>
      </div>
      <div className="mt-10 md:mt-28">
        <h2 className="text-center text-3xl mb-10">Ranking</h2>
        {ranking.map((item, index) => (
          <div
            className="text-xl"
            key={`${item.name}-${index}`}
          >{`${index + 1}. ${item.name} - ${item.days.toFixed(2)} days`}</div>
        ))}
      </div>
      {/* Bar Chart */}
      <div className="mt-10 w-full">
        <h2 className="text-center text-3xl mb-6">Ranking by Travel Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={ranking}>
            <XAxis
              dataKey="name"
              label={{
                value: "Propulsion System",
                position: "insideBottom",
              }}
            />
            <YAxis
              label={{
                value: "Travel Time (days)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              formatter={(value) => `${value.toFixed(2)} days`}
            />
            <Bar dataKey="days" fill="#ffa500" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Navigation Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={goBack}
          className="btn btn-outline md:fixed left-10 top-2/4"
        >
          Go back
        </button>
        <button
          onClick={reset}
          className="btn btn-outline md:fixed right-10 top-2/4"
        >
          Run another calculation
        </button>
      </div>
    </div>
  );
};

export default MissionResult;
