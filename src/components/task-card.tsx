

interface TaskCardProps {
  name: string;
  description?: string;
  status?: string;
  dueDate?: string;
}

export function TaskCard({
  name,
  description,
  status,
  dueDate,
}: TaskCardProps) {
  return (
    <div
      role="button"
      className='border-border/60 from-primary/[0.07] via-card to-card relative overflow-hidden rounded-2xl border bg-linear-to-br p-5 shadow-sm cursor-pointer'
  
    >
      <div className="from-primary/50 to-primary absolute inset-x-0 top-0 h-1.5 bg-linear-to-r" />

      <div className="space-y-3">
        <div className="flex justify-between">
          <h3 className="text-base font-semibold">{name}</h3>

          <div className="flex flex-wrap gap-2">
          <span>{status}</span>
            <span>{dueDate}</span>
          </div>
        </div>

        {description && (
          <p className="text-muted-foreground mt-1 text-sm">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
