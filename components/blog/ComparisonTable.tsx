import { ReactNode } from 'react';

interface ComparisonTableProps {
  headers: string[];
  rows: {
    label: string;
    values: (string | ReactNode)[];
  }[];
  className?: string;
}

export function ComparisonTable({ headers, rows, className = '' }: ComparisonTableProps) {
  return (
    <div className={`overflow-x-auto my-8 ${className}`}>
      <table className="min-w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-primary-turquoise text-white">
            <th className="px-6 py-4 text-left font-heading font-bold text-sm uppercase tracking-wide">
              {/* Première colonne vide pour les labels */}
            </th>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-4 text-center font-heading font-bold text-sm uppercase tracking-wide"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b border-neutral-light ${
                rowIndex % 2 === 0 ? 'bg-neutral-lighter' : 'bg-white'
              } hover:bg-blue-50 transition-colors`}
            >
              <td className="px-6 py-4 font-medium text-neutral-dark text-sm">
                {row.label}
              </td>
              {row.values.map((value, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 text-center text-sm text-neutral-medium"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
