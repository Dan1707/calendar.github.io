<script lang="ts" setup>
import { buttonSection } from '@/components/ui/button-section'
import type { calendarEvent, navBtn, viewType } from '@/types/calendar.type'
import { computed, onMounted, ref } from 'vue'
import '@kodeglot/vue-calendar/dist/style.css'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction'
import { eventCreatePopup } from '@/components/event-popup'
import type { EventClickArg } from '@fullcalendar/core/index.js'

const selectedDate = ref<Date | null>()
const selectedEvent = ref()
const showPopup = ref(false)
const popupType = ref<'create' | 'edit'>()

const calendarRef = ref<InstanceType<typeof FullCalendar>>()
const currentViewTitle = ref('')
const viewType = ref<viewType>('month')

const x = ref(0)
const y = ref(0)

const POPUP_WIDTH = 201
const POPUP_HEIGHT = 399.85
const OFFSET = 10

const calculatePopupPosition = (clientX: number, clientY: number) => {
	let left = clientX + OFFSET
	let top = clientY + OFFSET

	const viewportWidth = window.innerWidth
	const viewportHeight = window.innerHeight

	if (left + POPUP_WIDTH > viewportWidth) {
		left = clientX - POPUP_WIDTH - OFFSET
	}

	if (left < OFFSET) {
		left = OFFSET
	}

	if (top + POPUP_HEIGHT > viewportHeight) {
		top = clientY - POPUP_HEIGHT - OFFSET
	}

	if (top < OFFSET) {
		top = OFFSET
	}

	if (POPUP_HEIGHT > viewportHeight - 2 * OFFSET) {
		top = OFFSET
	}

	return { left, top }
}
const calendarOptions = {
	plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
	initialView: 'dayGridMonth',
	headerToolbar: false,

	slotMinTime: '00:00:00',
	slotMaxTime: '24:00:00',
	slotDuration: '01:00:00',
	slotLabelInterval: '01:00:00',
	slotLabelFormat: {
		hour: '2-digit' as const,
		minute: '2-digit' as const,
		hour12: true,
		meridiem: 'short' as const,
	},

	slotEventOverlap: true,
	allDaySlot: true,
	fixedWeekCount: false,
	editable: true,
	nowIndicator: true,

	views: {
		dayGridMonth: {
			eventDisplay: 'block',
		},
	},

	height: 720,

	dateClick: (info: DateClickArg) => {
		selectedDate.value = info.date
		selectedEvent.value = null
		showPopup.value = true
		popupType.value = 'create'

		const position = calculatePopupPosition(
			info.jsEvent.clientX,
			info.jsEvent.clientY
		)
		x.value = position.left
		y.value = position.top
	},
	eventClick: (info: EventClickArg) => {
		selectedEvent.value = info.event
		selectedDate.value = info.event.start
		showPopup.value = true
		popupType.value = 'edit'

		const rect = info.el.getBoundingClientRect()
		const position = calculatePopupPosition(rect.left, rect.bottom)
		x.value = position.left
		y.value = position.top
	},
} as any

const saveNewEvent = (event: calendarEvent) => {
	const calendarApi = calendarRef.value?.getApi()

	calendarApi?.addEvent({
		title: event.title,
		date: event.date,
		start: event.date,
		end: event.date,
		allDay: false,
		color: event.color,
		backgroundColor: event.color,
		borderColor: event.color,
		extendedProps: {
			notes: event.extendedProps.notes,
		},
	})

	closePopup()
}

const editEvent = (event: calendarEvent) => {
	if (!selectedEvent.value) return

	selectedEvent.value.setProp('title', event.title)
	selectedEvent.value.setAllDay(false)
	selectedEvent.value.setStart(event.date)

	const startDate = new Date(event.date)
	const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // +1 година
	selectedEvent.value.setEnd(endDate.toISOString())

	selectedEvent.value.setProp('backgroundColor', event.color)
	selectedEvent.value.setProp('borderColor', event.color)
	selectedEvent.value.setExtendedProp('notes', event.extendedProps.notes)

	closePopup()
}

const deleteEvent = () => {
	if (!selectedEvent.value) return

	selectedEvent.value.remove()
	closePopup()
}

const closePopup = () => {
	showPopup.value = false
	selectedEvent.value = null
	selectedDate.value = null
}

const handleViewTitle = () => {
	const calendarApi = calendarRef.value?.getApi()
	currentViewTitle.value = calendarApi?.getCurrentData().viewTitle as string
}

onMounted(() => {
	handleViewTitle()
})

const changeViewType = (activeType: viewType) => {
	viewType.value = activeType
	const calendarApi = calendarRef.value?.getApi()

	let viewName = ''
	if (activeType === 'month') {
		viewName = 'dayGridMonth'
	} else if (activeType === 'week') {
		viewName = 'timeGridWeek'
	} else if (activeType === 'day') {
		viewName = 'timeGridDay'
	}

	calendarApi?.changeView(viewName)
	handleViewTitle()
}

const handleNavBtns = (move: navBtn) => {
	const calendarApi = calendarRef.value?.getApi()

	if (move === 'today') {
		calendarApi?.today()
	}
	if (move === 'back') {
		calendarApi?.prev()
	}
	if (move === 'next') {
		calendarApi?.next()
	}

	handleViewTitle()
}
</script>

<template>
	<div class="max-w-292.5 w-full m-auto">
		<h1 class="heading-large mt-8">Calendar</h1>
		<div class="bg-white p-5 mt-8">
			<div class="flex items-center justify-between">
				<p class="heading-medium text-text-dark">Calendar View</p>
				<buttonSection
					:btnArr="['Month', 'Week', 'Day']"
					@currentBtn="changeViewType"
				/>
			</div>
			<div class="mt-3.75 flex relative items-center h-8">
				<buttonSection
					:btnArr="['Today', 'Back', 'Next']"
					@currentBtn="handleNavBtns"
					class="mr-auto absolute"
				/>
				<p class="heading-medium text-center w-full">{{ currentViewTitle }}</p>
			</div>

			<FullCalendar class="mt-5" ref="calendarRef" :options="calendarOptions" />
			<eventCreatePopup
				v-if="showPopup"
				:selectedDate="selectedDate as Date"
				:selectedEvent="selectedEvent"
				:type="popupType as 'create' | 'edit'"
				@sendNewEvent="saveNewEvent"
				@editEvent="editEvent"
				@deleteEvent="deleteEvent"
				@close="closePopup"
				:style="`position: fixed; left: ${x}px; top: ${y}px; z-index: 50;`"
			/>
		</div>
	</div>
</template>
