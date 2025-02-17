import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { PaginationState } from '@tanstack/react-table'
import useTaskFilterStore from '@/zustand/params/Tasks/useTaskParamsStore'
import { ITaskFilter } from '@/interface/Components/Tasks/TaskFilter'

interface UsePaginationMapping {
  pagination: PaginationState
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  filter: ITaskFilter
}

export const usePaginationMapping = (
  initialPageIndex: number = 0,
  initialPageSize: number = 10
): UsePaginationMapping => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialPageIndex,
    pageSize: initialPageSize,
  })

  const { filter, setFilter } = useTaskFilterStore();

  useEffect(() => {
    setFilter({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    })
  }, [pagination.pageIndex, pagination.pageSize, setFilter])

  return {
    pagination,
    setPagination,
    filter,
  }
}
