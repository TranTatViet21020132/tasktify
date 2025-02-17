import { DateRange } from "react-day-picker"

export interface IRangeDatePicker {
  className?: string
  dateRange: DateRange | undefined
  setDateRange: (range: DateRange | undefined) => void
}
