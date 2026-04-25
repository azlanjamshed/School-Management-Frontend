const StatCard = ({ title, value, badge, icon, color }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold mt-1">{value}</h2>
      </div>

      <div className="text-right">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
        {badge && (
          <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full mt-2 inline-block">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
