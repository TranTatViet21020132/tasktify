import FormField from '@/components/FormField/FormField';
import useTaskModalHook from './TaskModalHook';
import useModal from '@/hooks/useModal';
import TextEditor from '@/components/TextEditor/TextEditor';
import ReactQuill from 'react-quill-new';
import { useRef } from 'react';
import ModalDatePicker from './ModalDatePicker/ModalDatePicker';
import { X } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useTranslation } from 'react-i18next';

const TaskModal = () => {
  const {
    handleFormSubmit,
    handleCancel,
    loading,
    register,
    errors,
    isCompleted,
    setIsCompleted,
    handleSubmit,
    task,
    watch,
    setValue,
    date,
    setDate,
    hasTasksOnDate
  } = useTaskModalHook();

  const { isTaskModalOpen } = useModal();
  const content = watch('content');
  const quillRef = useRef<ReactQuill>(null);

  const formRef = useRef<HTMLFormElement>(null);
  useClickOutside(formRef, handleCancel, isTaskModalOpen);
  const { t } = useTranslation();

  console.log(task);

  return (
    <div className={`fixed w-full left-0 inset-0 z-50 ${isTaskModalOpen ? 'flex' : 'hidden'} justify-center items-center bg-black/40`}>
      <form
        ref={formRef}
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
        className="flex flex-col bg-accent-light-600 dark:bg-accent-dark-600 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-3/4 lg:w-2/4 justify-self-center"
      >

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-text-light-600 dark:text-text-dark-600">
            {task ? t("modal.editTask.title") : t("modal.addTask.title")}
          </h3>
          <div
            onClick={handleCancel}
            className={`flex justify-center items-center cursor-pointer aspect-square rounded-full hover:backdrop-brightness-90 dark:hover:bg-accent-dark-500`}
          >
            <X className="w-full h-full p-1 aspect-square text-text-light-400 dark:text-text-dark-600" />
          </div>
        </div>

        <FormField
          type="text"
          placeholder=""
          label={t("modal.label.title")}
          name="title"
          register={register}
          error={errors.title}
        />
        <div className='my-4'>
          <label
            htmlFor="content"
            className="text-text-light-600 dark:text-text-dark-600 font-archivo text-subheading3 font-semibold"
          >
            {t("modal.label.content")}
          </label>
          <TextEditor
            ref={quillRef}
            value={content || task?.content || ''}
            onChange={(value) => setValue('content', value)}
          />
          {errors.content && (
            <p className="text-red-500 text-xs italic">{errors.content.message}</p>
          )}
        </div>

        <div className="flex w-full items-center justify-between mb-8 mt-2">
          {task && (
            <div className="flex items-center gap-2">
              <label
                htmlFor="completed"
                className="text-text-light-600 dark:text-text-dark-600 font-archivo text-subheading3 font-semibold"
              >
                {t("modal.label.completed")}
              </label>
              <input 
                id="completed" 
                type="checkbox" 
                defaultChecked={task?.completed} 
                {...register('completed')} 
                onChange={() => setIsCompleted(!isCompleted)}
              />
            </div>
          )}

          <ModalDatePicker 
            className="w-full h-full col-span-3 shadow-md dark:shadow-slate-800 flex items-center justify-between" 
            date={date}
            setDate={setDate}
            hasTasksOnDate={hasTasksOnDate}
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
            onClick={handleCancel}
          >
            {t("modal.action.cancel")}
          </button>
          <button
            disabled={loading}
            type="submit"
            className="cursor-pointer bg-primary-light-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            {loading ? t("modal.action.saving") : t("modal.action.save")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskModal;