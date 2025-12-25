export type viewType = 'month' | 'week' | 'day'
export type navBtn = 'today' | 'back' | 'next'
export interface calendarEvent {
	title: string
	date: string
	color: string
	extendedProps: {
		notes: string
	}
}
