const DashboardCard = ({ title, value, icon, color }) => {
  // Default background and text colors if not provided
  const bgColorClass = color?.bg || "bg-blue-50";
  const textColorClass = color?.text || "text-blue-600";
  const iconBgColorClass = color?.iconBg || "bg-blue-100";

  return (
    <div className={`rounded-lg shadow p-4 ${bgColorClass}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className={`text-2xl font-bold mt-1 ${textColorClass}`}>
            {value}
          </div>
        </div>
        <div className={`rounded-full p-3 ${iconBgColorClass}`}>{icon}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
