import { useState, useEffect } from 'react';
import EmployeeCard from './components/EmployeeCard';
import TaskCard from './components/TaskCard';
import StatsChart from './components/StatsChart'; // Import the new chart

function App() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  
  // Enhanced Form State
  const [empForm, setEmpForm] = useState({ name: '', role: '' });
  const [taskForm, setTaskForm] = useState({ title: '', description: '', assignedTo: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      // Fetch both employees and tasks in parallel
      const [empRes, taskRes] = await Promise.all([
        fetch('http://localhost:5000/api/employees'),
        fetch('http://localhost:5000/api/tasks')
      ]);
      setEmployees(await empRes.json());
      setTasks(await taskRes.json());
    } catch (err) { console.error("Error loading data:", err); }
  };

  // --- Actions ---
  const handleAddEmployee = async () => {
    if (!empForm.name || !empForm.role) return alert("Please fill in all fields");
    setIsLoading(true);
    await fetch('http://localhost:5000/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...empForm, email: 'test@example.com' }),
    });
    setEmpForm({ name: '', role: '' });
    fetchData(); // Refresh data
    setIsLoading(false);
  };

  const handleAddTask = async () => {
    if (!taskForm.title) return alert("Task title is required");
    if (!taskForm.assignedTo) return alert("Please assign this task to an employee");

    setIsLoading(true);
    await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: taskForm.title, 
        description: taskForm.description || "No description provided", 
        assignedTo: taskForm.assignedTo 
      }),
    });
    
    // Reset form
    setTaskForm({ title: '', description: '', assignedTo: '' }); 
    fetchData(); // Refresh data
    setIsLoading(false);
  };

  const handleDelete = async (type, id) => {
    if(!window.confirm("Are you sure you want to delete this?")) return;
    const url = `http://localhost:5000/api/${type}s/${id}`; // employees or tasks
    await fetch(url, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-gray-800">ProU <span className="text-blue-600">Internship</span></h1>
          <p className="text-gray-500">Track 3 Dashboard</p>
        </header>

        {/* === BONUS: DATA VISUALIZATION CHART === */}
        {/* Only show chart if we have employees */}
        {employees.length > 0 && (
          <StatsChart employees={employees} tasks={tasks} />
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* === LEFT COLUMN: TEAM MEMBERS === */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-700">Team Members <span className="text-gray-400 text-sm ml-2">({employees.length})</span></h2>
            </div>

            {/* Employee Form */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Add New Member</h3>
              <div className="grid grid-cols-[1fr_1fr_auto] gap-3">
                <input 
                  className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                  placeholder="Name" 
                  value={empForm.name}
                  onChange={e => setEmpForm({...empForm, name: e.target.value})}
                />
                <input 
                  className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                  placeholder="Role" 
                  value={empForm.role}
                  onChange={e => setEmpForm({...empForm, role: e.target.value})}
                />
                <button 
                  onClick={handleAddEmployee} 
                  disabled={isLoading}
                  className="bg-blue-600 text-white w-10 h-10 rounded flex items-center justify-center hover:bg-blue-700 transition"
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
              <h2 className="text-xl font-bold text-gray-700">Active Tasks <span className="text-gray-400 text-sm ml-2">({tasks.length})</span></h2>
            </div>

            {/* Task Form */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Create New Task</h3>
              <div className="flex flex-col gap-3">
                
                {/* Employee Dropdown Selector */}
                <select 
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 text-sm"
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
                    className="flex-1 p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 font-medium"
                    placeholder="Task Title" 
                    value={taskForm.title}
                    onChange={e => setTaskForm({...taskForm, title: e.target.value})}
                  />
                  <button 
                    onClick={handleAddTask} 
                    disabled={isLoading}
                    className="bg-green-600 text-white w-10 h-10 rounded flex items-center justify-center hover:bg-green-700 transition"
                  >
                    +
                  </button>
                </div>
                <input 
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 text-sm"
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