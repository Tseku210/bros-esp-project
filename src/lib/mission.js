import { parseArray } from "./compare";

const g0 = 9.80665; // Gravitational acceleration (m/s^2)

export const calculateMissionParameters = (ship, planet, thruster) => {
  const propellantMass = ship.launchMass - ship.dryMass;

  console.log(thruster.isp);
  const isp = parseArray(thruster.isp); // Average or single value from ISP array
  const thrust = parseArray(thruster.thrust); // Average or single value from thrust array

  if (!isp || isNaN(isp)) {
    return { error: `${thruster.name}: Invalid ISP value.` };
  }
  if (!thrust || isNaN(thrust)) {
    return { error: `${thruster.name}: Invalid thrust value.` };
  }

  if (!isp || !thrust) {
    return {
      error: `${thruster.name}: Missing or invalid parameters for calculation.`,
    };
  }

  // Convert thrust from mN to N
  const thrustInNewtons = thrust / 1000;

  // Calculate mission parameters
  const exhaustVelocity = isp * g0; // Exhaust velocity (m/s)
  const deltaV = exhaustVelocity * Math.log(ship.launchMass / ship.dryMass); // Tsiolkovsky equation
  const thrustDuration = propellantMass / (thrustInNewtons / exhaustVelocity); // Burn time (s)
  const thrustDurationDays = thrustDuration / (24 * 3600); // Convert to days
  const coastingTime = planet.distance / deltaV; // Coasting time (s)
  const coastingTimeDays = coastingTime / (24 * 3600); // Convert to days
  const totalTravelTimeDays = thrustDurationDays + coastingTimeDays; // Total mission time (days)

  return {
    deltaV, // Change in velocity (m/s)
    propellantConsumed: propellantMass, // Propellant mass consumed (kg)
    thrustDurationDays, // Thrust burn duration (days)
    coastingTimeDays, // Coasting time (days)
    totalTravelTimeDays, // Total travel time (days)
  };
};
