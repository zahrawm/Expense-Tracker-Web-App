import React from 'react';

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  color?: string;
  value?: string | number;
  description?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ 
  icon, 
  label, 
  color = "bg-blue-500",
  value,
  description
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center space-x-3">
        <div className={`${color} p-3 rounded-full text-white flex items-center justify-center`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
          {value && (
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          )}
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};