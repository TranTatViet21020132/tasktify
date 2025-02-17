import { useContext } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { ThemeContext } from '@/hooks/useDarkMode';
import { IColumnProps } from '@/interface/Components/Column/Column';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Task from '@/components/Task/Task';
import NoDataPlaceholder from '@/components/NoData/NoDataPlaceHolder';

export function Column({ column, tasks }: IColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeSwitcher must be used within a ThemeProvider');
  }

  const { theme } = themeContext;

  const statusColors: Record<string, string> = {
    'true': `${theme === 'light' ? 'bg-green-600' : 'bg-green-500'}`,
    'false': `${theme === 'light' ? 'bg-violet-600' : 'bg-violet-500'}`,
  };

  const bgColor = statusColors[column.id] || 'bg-gray-100';

  return (
    <div 
      ref={setNodeRef} 
      className="h-full flex w-full flex-col rounded-xl shadow-lg lg:h-full"
    >
      <h4 
        className={`p-4 rounded-t-xl text-xl font-semibold text-white ${bgColor} shadow-xl drop-shadow-lg brightness-90`}
      >
        {column.title}
      </h4>
      <ScrollArea type="hover" className="p-2 opacity-80 shadow-inner flex-grow whitespace-nowrap rounded-md border-2 border-primary-light-500 h-fit md:h-[calc(100vh-11rem)] flex flex-col">
        {tasks && tasks.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <NoDataPlaceholder />
          </div>
        )}
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}

export default Column;