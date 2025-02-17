import { ITaskDrop } from '@/interface/Components/Tasks/Task';
import { DragOverlay, useDraggable } from '@dnd-kit/core';
import { TaskActions } from '@/components/TaskActions/TaskActions';
import { CSS } from '@dnd-kit/utilities';
import { createPortal } from 'react-dom';
import { formatDate } from '@/configs/helper';

const Task = ({ task }: ITaskDrop) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform)
  } : undefined;
  
  if (isDragging) {
    return createPortal(
      <DragOverlay>
        <div
          ref={setNodeRef}
          className={`p-4 shadow-lg border-2 border-primary-light-500 rounded-xl bg-accent-light-400 dark:bg-accent-dark-500 `}
        >
          <div className="flex flex-col justify-between items-start gap-4 w-full aspect-auto">
            <div>
              <div className="flex space-x-2">
                <h3 className="text-subheading3 font-bold max-w-[7.6rem] truncate">{task.title}</h3>
              </div>
              <div className="flex space-x-2">
                {task.content && <p className="max-w-[7.6rem] truncate text-text-light-500 
                dark:text-text-dark-500 text-base text-body5">{task.content}
                </p>}
              </div>
              
            </div>
            <div className="flex justify-between w-full items-center gap-4 ">
              <span className="text-gray-700 text-xs">{formatDate(task.date)}</span>
            </div>
          </div>
        </div>
      </DragOverlay>,
      document.body
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      touch-action="none"
      style={style}
      className={`z-10 p-4 shadow-lg dark:shadow-slate-800 rounded-lg bg-accent-light-400 dark:bg-accent-dark-500`}
    >
      <div className="flex flex-col justify-between items-start gap-4 w-full aspect-auto">
        <div>
          <div className="flex space-x-2">
            <h3 className="text-subheading2 font-bold max-w-[7.6rem] truncate">{task.title}</h3>
          </div>
          <div className="flex space-x-2">
            {task.content && <p className="max-w-[7.6rem] truncate text-text-light-400 
            dark:text-text-dark-500 text-base text-body4">{task.content}
            </p>}
          </div>
          
        </div>
        <div className="flex justify-between w-full items-center gap-4 ">
          <span className="text-text-light-500 
            dark:text-text-dark-400 text-body5">{formatDate(task.date)}</span>
          <div className="flex gap-2 items-center"> 
            <TaskActions task={task} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
