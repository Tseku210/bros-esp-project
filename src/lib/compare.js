// Parse a single value with units (e.g., "17 W/mN" -> 17)
export const parseValue = (value) => {
  if (typeof value === "string") {
    const numeric = value.match(/[\d.]+/g); // Extract numeric parts
    return numeric ? parseFloat(numeric[0]) : null; // Convert to float
  }
  return value; // Already a number
};

// Parse ranges (e.g., "50-200 mN" -> average: (50 + 200) / 2)
export const parseRange = (value) => {
  if (typeof value === "string" && value.includes("-")) {
    const numeric = value.match(/[\d.]+/g); // Extract all numeric parts
    if (numeric) {
      const range = numeric.map(parseFloat);
      return (range[0] + range[1]) / 2; // Return the average of the range
    }
  }
  return parseValue(value); // If not a range, parse as single value
};

// Handle arrays of values (e.g., ["50-200 mN", "TBD"])
export const parseArray = (array) => {
  if (!Array.isArray(array)) return parseRange(array); // Handle non-array values
  const numericValues = array.map(parseRange).filter((val) => val != null); // Parse and filter non-numeric
  return numericValues.length ? average(numericValues) : null; // Calculate average if values exist
};

// Average helper for numerical arrays
export const average = (array) =>
  array.reduce((a, b) => a + b, 0) / array.length;

export const compareSystems = (system1, system2) => {
  if (!system1 || !system2) {
    return null;
  }

  const params = [
    { key: "powerToThrust", label: "Power-To-Thrust Ratio (W/mN)" },
    { key: "thrust", label: "Thrust (mN)" },
    { key: "isp", label: "Specific Impulse (ISP) (s)" },
    { key: "totalImpulse", label: "Total Impulse (MNs)" },
  ];

  const comparisonResults = params.map((param) => {
    // Parse values for both systems
    const value1 = parseArray(system1[param.key]);
    const value2 = parseArray(system2[param.key]);

    if (value1 == null || value2 == null) {
      return {
        metric: param.label,
        result: "Not available for comparison",
      };
    }

    // Calculate percentage difference
    const percentageDifference = ((value1 - value2) / value2) * 100;

    return {
      metric: param.label,
      system1Value: value1,
      system2Value: value2,
      difference: percentageDifference,
      betterSystem: percentageDifference > 0 ? system1.name : system2.name,
    };
  });

  return comparisonResults;
};
