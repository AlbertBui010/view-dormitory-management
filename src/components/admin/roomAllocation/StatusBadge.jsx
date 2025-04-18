import React from "react";
import { getStatusText, getStatusClass } from "../../../constant/constants";

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs ${getStatusClass(status)}`}
    >
      {getStatusText(status)}
    </span>
  );
};

export default StatusBadge;
