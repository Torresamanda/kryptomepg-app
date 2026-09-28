export interface DailyRecordCount {
  count: number
  date: string
}

export interface MonthlyActivitySummary {
  activeDays: number
  longestStreak: number
  totalRecords: number
}

export interface MonthlyActivity {
  dailyRecords: DailyRecordCount[]
  month: string
  summary: MonthlyActivitySummary
  timeZone: string
}
