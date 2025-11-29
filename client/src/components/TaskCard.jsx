function TaskCard({ task, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500 flex justify-between items-start group hover:shadow-md transition">
      <div>
        <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-800">{task.title}</h3>
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
        </div>
        <p className="text-gray-500 text-sm mt-1">{task.description}</p>
      </div>

      <button 
        onClick={() => onDelete(task.id)}
        className="text-gray-300 hover:text-red-500 transition p-1"
        title="Delete Task"
      >
        ✕
      </button>
    </div>
  );
}

export default TaskCard;