import useModal from "@/hooks/useModal";
import useWarningModalHook from "./WarningModalHook";
import { TriangleAlert } from "lucide-react";
import { useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useTranslation } from "react-i18next";

export function WarningModal() {
  const { loading, handleDeleteTask, handleCancel } = useWarningModalHook();
  const { isWarningModalOpen } = useModal();

  const formRef = useRef<HTMLFormElement>(null);
  useClickOutside(formRef, handleCancel, isWarningModalOpen);
  const { t } = useTranslation();

  return (
    <div
      className={`fixed w-full h-full left-0 top-0 z-50 ${
        isWarningModalOpen ? 'flex' : 'hidden'
      } justify-center items-center bg-black/40`}
    >
      <form
        ref={formRef}
        onSubmit={handleDeleteTask}
        className="flex gap-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-11/12 md:w-1/3"
      >
        <TriangleAlert className="w-12 h-12 text-red-500"/>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {t("modal.warning.title")}
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-8">
            {t("modal.warning.description")}
          </p>
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
              className={`py-2 px-4 rounded-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-red-400 ${
                loading
                  ? 'bg-red-300 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {loading ? t("modal.action.deleting") : t("modal.action.delete")}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
