// client/src/components/StatsChart.jsx

function StatsChart({ employees, tasks }) {
  // 1. Calculate tasks per employee
  const data = employees.map(emp => {
    const taskCount = tasks.filter(t => t.assignedTo == emp.id).length;
    return { 
      name: emp.name, 
      count: taskCount,
      role: emp.role
    };
  });

  // 2. Find the highest task count to scale the bars correctly
  // (If max is 0, use 1 to avoid division by zero errors)
  const maxTasks = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
      <h3 className="text-xs font-bold text-gray-400 uppercase mb-6 tracking-wider">
        Workload Distribution 
      </h3>
      
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-4">
            
            {/* Label: Name & Role */}
            <div className="w-32">
              <div className="font-bold text-gray-700 truncate text-sm">{item.name}</div>
              <div className="text-xs text-gray-400 truncate">{item.role}</div>
            </div>

            {/* The Bar (Pure CSS) */}
            <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(item.count / maxTasks) * 100}%` }}
              ></div>
            </div>

            {/* Count Number */}
            <div className="w-8 text-right text-sm font-bold text-gray-600">
              {item.count}
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <p className="text-sm text-gray-400 italic text-center">Add employees to see stats.</p>
        )}
      </div>
    </div>
  );
}

export default StatsChart;