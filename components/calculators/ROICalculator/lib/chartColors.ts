/**
 * Chart colors from Brandbook 2025
 * Used for Recharts visualization in EvolutionChart
 */
export const CHART_COLORS = {
  // Main line colors
  current: '#ff7809', // accent-orange - Current situation line
  orbitvu: '#4c5578', // secondary-orbitvu (Future Dusk) - Orbitvu solution line
  breakEven: '#27eb9f', // accent-green - Break-even marker

  // Grid and axis colors
  grid: '#E0E0E0', // Light gray for grid lines
  axis: '#757575', // Medium gray for axis text
} as const;

/**
 * Helper function to convert hex color to RGB object
 * Used for jsPDF which requires RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * PDF colors with RGB values
 * Pre-computed RGB values for jsPDF usage
 */
export const PDF_COLORS = {
  header: hexToRgb('#4c5578'), // secondary-orbitvu
  text: hexToRgb('#546E7A'), // neutral-medium
  white: { r: 255, g: 255, b: 255 },
} as const;
