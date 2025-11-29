import { useState, useEffect } from 'react';
import EmployeeCard from './components/EmployeeCard';
import TaskCard from './components/TaskCard';
import StatsChart from './components/StatsChart';

// ⚠️ IMPORTANT: REPLACE THIS URL WITH YOUR RENDER BACKEND URL
// Example: const API_BASE = 'https://prou-backend-aman.onrender.com';
const API_BASE = 'https://prou-backend-aman.onrender.com'; 

function App() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [empForm, setEmpForm] = useState({ name: '', role: '' });
  const [taskForm, setTaskForm] = useState({ title: '', description: '', assignedTo: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [empRes, taskRes] = await Promise.all([
        fetch(`${API_BASE}/api/employees`),
        fetch(`${API_BASE}/api/tasks`)
      ]);
      setEmployees(await empRes.json());
      setTasks(await taskRes.json());
    } catch (err) { console.error("Error loading data:", err); }
  };

  const handleAddEmployee = async () => {
    if (!empForm.name || !empForm.role) return alert("Please fill in Name and Role");
    setIsLoading(true);
    await fetch(`${API_BASE}/api/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...empForm, email: 'test@example.com' }),
    });
    setEmpForm({ name: '', role: '' });
    fetchData();
    setIsLoading(false);
  };

  const handleAddTask = async () => {
    if (!taskForm.title) return alert("Task title is required");
    if (!taskForm.assignedTo) return alert("Please assign this task to an employee");

    setIsLoading(true);
    await fetch(`${API_BASE}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: taskForm.title, 
        description: taskForm.description || "No description provided", 
        assignedTo: taskForm.assignedTo 
      }),
    });
    setTaskForm({ title: '', description: '', assignedTo: '' }); 
    fetchData();
    setIsLoading(false);
  };

  const handleDelete = async (type, id) => {
    if(!window.confirm("Are you sure you want to delete this?")) return;
    const url = `${API_BASE}/api/${type}s/${id}`; 
    await fetch(url, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* === PROFESSIONAL NAVBAR === */}
      <nav className="bg-slate-900 text-white shadow-lg mb-8">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg">P</div>
            <span className="font-bold text-xl tracking-tight">ProU Dashboard</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
            <span className="hover:text-white cursor-pointer transition hidden sm:block">Overview</span>
            <span className="hover:text-white cursor-pointer transition hidden sm:block">Team</span>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">Track 3 Intern</span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pb-12">
        
        {/* Bonus Chart */}
        {employees.length > 0 && (
          <StatsChart employees={employees} tasks={tasks} />
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* === LEFT COLUMN: TEAM MEMBERS === */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Team Members <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full ml-2">{employees.length}</span></h2>
            </div>

            {/* Employee Form */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Add New Member</h3>
              <div className="grid grid-cols-[1fr_1fr_auto] gap-3">
                <input 
                  className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="Name" 
                  value={empForm.name}
                  onChange={e => setEmpForm({...empForm, name: e.target.value})}
                />
                <input 
                  className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="Role" 
                  value={empForm.role}
                  onChange={e => setEmpForm({...empForm, role: e.target.value})}
                />
                <button 
                  onClick={handleAddEmployee} 
                  disabled={isLoading}
                  className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-blue-700 transition shadow-md"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {employees.length === 0 ? <p className="text-gray-400 italic text-sm text-center py-4">No team members yet.</p> : null}
              {employees.map(emp => (
                <EmployeeCard key={emp.id} employee={emp} onDelete={(id) => handleDelete('employee', id)} />
              ))}
            </div>
          </section>

          {/* === RIGHT COLUMN: TASKS === */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Active Tasks <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full ml-2">{tasks.length}</span></h2>
            </div>

            {/* Task Form */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Create New Task</h3>
              <div className="flex flex-col gap-3">
                
                <select 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white text-sm transition"
                  value={taskForm.assignedTo}
                  onChange={e => setTaskForm({...taskForm, assignedTo: e.target.value})}
                >
                  <option value="" disabled>Assign to Team Member...</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>
                  ))}
                </select>

                <div className="flex gap-3">
                  <input 
                    className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none font-medium transition"
                    placeholder="Task Title" 
                    value={taskForm.title}
                    onChange={e => setTaskForm({...taskForm, title: e.target.value})}
                  />
                  <button 
                    onClick={handleAddTask} 
                    disabled={isLoading}
                    className="bg-green-600 text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-green-700 transition shadow-md"
                  >
                    +
                  </button>
                </div>
                <input 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm transition"
                  placeholder="Short description (optional)..." 
                  value={taskForm.description}
                  onChange={e => setTaskForm({...taskForm, description: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-3">
              {tasks.length === 0 ? <p className="text-gray-400 italic text-sm text-center py-4">No active tasks.</p> : null}
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} onDelete={(id) => handleDelete('task', id)} />
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export default App;