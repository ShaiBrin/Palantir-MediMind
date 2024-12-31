"use client";

// Logic to map frequency to multiplier
export const dosageMapping = (frequency: string): number => {
  const lowerCaseFrequency = frequency.toLowerCase();

  if (
    lowerCaseFrequency.includes("once a day") ||
    lowerCaseFrequency.includes("once daily") ||
    lowerCaseFrequency.includes("daily") ||
    lowerCaseFrequency.includes("as needed") ||
    lowerCaseFrequency.includes("day 1")
  ) {
    return 1;
  } else if (lowerCaseFrequency.includes("twice daily")) {
    return 2;
  } else if (
    lowerCaseFrequency.includes("three times a day") ||
    lowerCaseFrequency.includes("every 8 hours") ||
    lowerCaseFrequency.includes("before meals")
  ) {
    return 3;
  } else if (
    lowerCaseFrequency.includes("four times daily") ||
    lowerCaseFrequency.includes("every 6 hours")
  ) {
    return 4;
  } else {
    return 1;
  }
};
