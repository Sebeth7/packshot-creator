/**
 * Chart colors from Brandbook 2025
 * Used for Recharts visualization in EvolutionChart
 */
export const CHART_COLORS = {
  // Main line colors
  current: '#ff7809', // accent-orange - Current situation line
  orbitvu: '#6667AB', // very-peri-500 - Orbitvu solution line
  breakEven: '#10b981', // emerald-500 - Break-even marker

  // Grid and axis colors
  grid: '#E5E7EB', // neutral-200
  axis: '#6E7592', // future-dusk-400
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
  header: hexToRgb('#6667AB'), // very-peri-500
  text: hexToRgb('#4c5578'), // future-dusk-500
  white: { r: 255, g: 255, b: 255 },
} as const;
