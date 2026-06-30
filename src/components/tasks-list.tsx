import { TaskCard } from './task-card'

const tasks = [
  {
    name: 'Design review',
    description: 'Prepare the final review notes for the new dashboard UI.',
    status: "Completed",
    dueDate: 'Today',
  },
  {
    name: 'API integration',
    description: 'Connect the task modal with the backend payload.',
    status: 'Pending',
    dueDate: 'Tomorrow',
  },
  {
    name: 'User testing',
    description: 'Collect feedback from the pilot group and document issues.',
    status: "On Review",
    dueDate: 'Friday',
  },
]

export const TasksList = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <span className="text-sm text-slate-500">3 items</span>
      </div>


      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.name}
            name={task.name}
            description={task.description}
            status={task.status}
            dueDate={task.dueDate}
          />
        ))}
      </div>

      <div>


        
      </div>
    </section>
  )
}
