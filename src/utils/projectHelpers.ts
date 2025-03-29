
import { ProjectData } from "@/hooks/useProjectData";

/**
 * Helper function to convert comma-separated tags string to array
 */
export const tagsStringToArray = (tagsString: string): string[] => {
  return tagsString.split(",")
    .map(tag => tag.trim())
    .filter(Boolean);
};

/**
 * Helper function to format a date for display
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Helper function to update a specific item in an array
 */
export const updateArrayItem = <T>(array: T[], index: number, newValue: T): T[] => {
  return array.map((item, i) => i === index ? newValue : item);
};

/**
 * Helper function to remove an item from an array
 */
export const removeArrayItem = <T>(array: T[], index: number): T[] => {
  return array.filter((_, i) => i !== index);
};

/**
 * Helper function to add an item to an array
 */
export const addArrayItem = <T>(array: T[], item: T): T[] => {
  return [...array, item];
};

/**
 * Helper function to convert dependencies array to string and back
 */
export const dependenciesToString = (dependencies: string[]): string => {
  return dependencies.join(", ");
};

export const stringToDependencies = (dependenciesString: string): string[] => {
  return dependenciesString.split(",")
    .map(dep => dep.trim())
    .filter(Boolean);
};
