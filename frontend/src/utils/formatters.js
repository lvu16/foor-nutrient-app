// format nutrient value for displau
export const formatNutrient = (value, unit = 'g') => {
    if (value === null || value === undefined) {
        return 'N/A';
    }
    return `${value} ${unit}`;
};

// truncate long text 
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};