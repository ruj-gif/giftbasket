import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2 } from 'lucide-react';

export default function DataTable({ columns, data, actions, emptyMessage = 'No data available' }) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Mobile: card layout */}
      <div className="md:hidden divide-y divide-gray-200">
        {data.map((row, idx) => (
          <div key={idx} className="p-4 hover:bg-gray-50">
            <div className="space-y-2">
              {columns.map((col, colIdx) => (
                <div key={colIdx} className="flex flex-wrap items-start gap-2">
                  <span className="text-xs font-medium text-gray-500 uppercase shrink-0">{col.label}:</span>
                  <span className="text-sm text-gray-900 break-words">
                    {col.render ? col.render(row) : row[col.key]}
                  </span>
                </div>
              ))}
            </div>
            {actions && (
              <div className="flex items-center justify-end gap-3 mt-3 pt-3 border-t border-gray-100">
                {actions.view && (
                  <Link to={actions.view(row)} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
                    <Eye className="w-4 h-4" /> View
                  </Link>
                )}
                {actions.edit && (
                  <Link to={actions.edit(row)} className="flex items-center gap-1 text-primary hover:text-primary-dark text-sm font-medium">
                    <Edit className="w-4 h-4" /> Edit
                  </Link>
                )}
                {actions.delete && (
                  <button onClick={() => actions.delete(row)} className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop: table layout */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="px-4 lg:px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-xs truncate">
                      {col.render ? col.render(row) : row[col.key]}
                    </div>
                  </td>
                ))}
                {actions && (
                  <td className="px-4 lg:px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      {actions.view && (
                        <Link to={actions.view(row)} className="text-blue-600 hover:text-blue-900 p-1">
                          <Eye className="w-5 h-5" />
                        </Link>
                      )}
                      {actions.edit && (
                        <Link to={actions.edit(row)} className="text-primary hover:text-primary-dark p-1">
                          <Edit className="w-5 h-5" />
                        </Link>
                      )}
                      {actions.delete && (
                        <button onClick={() => actions.delete(row)} className="text-red-600 hover:text-red-900 p-1">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}