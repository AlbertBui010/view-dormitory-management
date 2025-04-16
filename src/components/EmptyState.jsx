import React from "react";

const EmptyState = ({ icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-4 text-gray-400">{icon}</div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
      {description && <p className="text-gray-500 mb-6">{description}</p>}
      {action && action}
    </div>
  );
};

export default EmptyState;
