import { useState, useContext } from "react";
import {
  HiOutlinePlus,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineTrash,
  HiOutlineXMark,
} from "react-icons/hi2";
import { toast } from "react-toastify";
import { StoreContext } from "../../Context/StoreContext";
import Button from "../../components/Button/Button";

export default function Tasks() {
  const { tasks, addTask, updateTaskStatus, deleteTask } = useContext(StoreContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    category: "Inventory",
    priority: "High",
    dueDate: "2026-08-01",
    assignee: "Self",
  });

  const columns = [
    { id: "todo", title: "To Do" },
    { id: "in_progress", title: "In Progress" },
    { id: "review", title: "Review" },
    { id: "completed", title: "Completed" },
  ];

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newTask.title) {
      toast.error("Please enter a task title.");
      return;
    }
    addTask(newTask);
    toast.success("New operational task added to Kanban board!");
    setNewTask({ title: "", category: "Inventory", priority: "High", dueDate: "2026-08-01", assignee: "Self" });
    setModalOpen(false);
  };

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Operational Task Kanban
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track inventory reorders, invoice follow-ups, GST filing, and daily store operations.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={HiOutlinePlus}
          onClick={() => setModalOpen(true)}
        >
          Add Task
        </Button>
      </div>

      {/* Overview Progress Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4 transition-colors">
        <div className="flex-1">
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            <span>Overall Sprint Completion</span>
            <span>{completedCount} of {tasks.length} tasks finished ({progressPercent}%)</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {columns.map((col) => {
          const columnTasks = tasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              className="bg-slate-100/70 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between min-h-[500px] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{col.title}</h3>
                    <span className="px-2 py-0.5 text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-700 shadow-2xs">
                      {columnTasks.length}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {columnTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all space-y-3 group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                          {task.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              task.priority === "High"
                                ? "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-100 dark:border-red-800"
                                : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-800"
                            }`}
                          >
                            {task.priority}
                          </span>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-slate-300 hover:text-red-600 p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <HiOutlineTrash className="text-xs" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                        {task.title}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span className="flex items-center gap-1">
                          <HiOutlineClock className="text-xs" /> {task.dueDate}
                        </span>
                        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium">
                          <HiOutlineUser className="text-xs" /> {task.assignee}
                        </span>
                      </div>

                      <div className="pt-2">
                        <select
                          value={task.status}
                          onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                          className="w-full py-1 px-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[11px] font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
                        >
                          <option value="todo">Status: To Do</option>
                          <option value="in_progress">Status: In Progress</option>
                          <option value="review">Status: Review</option>
                          <option value="completed">Status: Completed</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="mt-4 w-full py-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <HiOutlinePlus /> Add Card
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 animate-fade-in border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold">Create Operational Task</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <HiOutlineXMark className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Audit coffee bag inventory"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600"
                  >
                    <option>Inventory</option>
                    <option>Billing</option>
                    <option>Marketing</option>
                    <option>Legal</option>
                    <option>Staff</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="pt-4 flex gap-2">
                <Button variant="outline" size="md" className="flex-1 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit" className="flex-1">
                  Add Task
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
