function EmployeeCard({ employee, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center group hover:shadow-md transition">
      <div className="flex items-center gap-3">
        {/* Avatar Circle */}
        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
          {employee.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-bold text-gray-800">{employee.name}</h3>
          <p className="text-gray-500 text-xs uppercase tracking-wide">{employee.role}</p>
        </div>
      </div>
      
      {/* Delete Button (Visible on Hover) */}
      <button 
        onClick={() => onDelete(employee.id)}
        className="text-gray-300 hover:text-red-500 transition p-2"
        title="Remove Employee"
      >
        ✕
      </button>
    </div>
  );
}

export default EmployeeCard;