import { 
  DndContext, 
  PointerSensor, 
  TouchSensor,
  useSensor, 
  useSensors 
 } from '@dnd-kit/core';
 import useTasksListHook from './ListPageHook';
 import { Column } from '@/components/Column/Column';
 import SingleDatePicker from '@/components/SingleDatePicker/SingleDatePicker';
 import TaskModal from '@/components/ModalDialog/TaskModal/TaskModal';
 import { WarningModal } from '@/components/ModalDialog/WarningModal/WarningModal';
import { Helmet } from 'react-helmet-async';
 
 const TaskListPage = () => {
  const {
    COLUMNS,
    handleDragEnd,
    tasksForSelectedDate,
    date, 
    setDate,
    hasTasksOnDate
  } = useTasksListHook();
 
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
 
  const touchSensor = useSensor(TouchSensor);
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 }
  });
 
  const sensors = useSensors(isTouchDevice ? touchSensor : pointerSensor);
 
  return (
    <section className="px-2 pb-2 w-full flex flex-col lg:flex-row gap-4 rounded-2xl lg:h-[calc(100vh-4rem)] lg:group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[calc(100vh-3rem)]">
      <Helmet>
        <title>Task List</title>
        <meta name="description" content="Welcome to the List Page" />
      </Helmet>
      <aside className="w-full lg:w-fit h-fit lg:flex lg:flex-col grid grid-cols-2 gap-4">
        <SingleDatePicker
          className="w-full h-full col-span-1 shadow-md dark:shadow-slate-800 self-start"
          date={date}
          setDate={setDate}
          hasTasksOnDate={hasTasksOnDate}
        />
      </aside>
 
      <main className="grid grid-cols-2 gap-2 h-full w-full">
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasksForSelectedDate?.filter((task) => 
                task.completed.toString() === column.id
              )}
            />
          ))}
        </DndContext>
      </main>
 
      <TaskModal />
      <WarningModal />
    </section>
  );
 };
 
 export default TaskListPage;