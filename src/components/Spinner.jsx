import React from "react";

const Spinner = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClass} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600`}
      ></div>
      <span className="sr-only">Đang tải...</span>
    </div>
  );
};

export default Spinner;
