import React from "react";
import { Section } from "@/app/lib/types";

interface PMFLeadershipTableSection extends Section {
  content: {
    rows: Array<{
      position: string;
      name: string;
      designation: string;
      notes: string;
      additionalDetails: string;
    }>;
  };
}

interface PMFLeadershipTableProps {
  section: PMFLeadershipTableSection;
}

const PMFLeadershipTable: React.FC<PMFLeadershipTableProps> = ({ section }) => {
  const { rows } = section.content || {};

  return (
    <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 overflow-x-auto" id={section.id}>
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-slate-300 border border-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-900 sm:px-6">
                Position
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-900 sm:px-6">
                Name
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-900 sm:px-6">
                Designation/US Status
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-900 sm:px-6">
                Notes
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-900 sm:px-6">
                Additional Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {rows?.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-4 py-3 text-xs sm:text-sm font-medium text-slate-900 sm:px-6">
                  {row.position}
                </td>
                <td className="px-4 py-3 text-xs sm:text-sm text-slate-800 sm:px-6">
                  <div dangerouslySetInnerHTML={{ __html: row.name }} />
                </td>
                <td className="px-4 py-3 text-xs sm:text-sm text-slate-800 sm:px-6">
                  {row.designation === "____" ? <span className="text-slate-400">—</span> : row.designation}
                </td>
                <td className="px-4 py-3 text-xs sm:text-sm text-slate-800 sm:px-6">
                  <div dangerouslySetInnerHTML={{ __html: row.notes }} />
                </td>
                <td className="px-4 py-3 text-xs sm:text-sm text-slate-800 sm:px-6">
                  <div dangerouslySetInnerHTML={{ __html: row.additionalDetails }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PMFLeadershipTable;

