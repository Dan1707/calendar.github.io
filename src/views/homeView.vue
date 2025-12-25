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

const calendarOptions = ref({
	plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
	initialView: 'dayGridMonth',
	headerToolbar: false,

	slotMinTime: '00:00:00',
	slotMaxTime: '24:00:00',
	slotDuration: '01:00:00',
	slotLabelInterval: '01:00:00',
	slotLabelFormat: {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
		meridiem: 'short',
	},

	slotEventOverlap: true,
	allDaySlot: true,
	fixedWeekCount: false,
	editable: true,
	nowIndicator: true,

	height: 720,

	dateClick: (info: DateClickArg) => {
		selectedDate.value = info.date
		showPopup.value = true
		popupType.value = 'create'
	},
	eventClick: (info: EventClickArg) => {
		showPopup.value = true
		selectedEvent.value = info.event
		popupType.value = 'edit'
	},
	eventDragStop: (info: DateClickArg) => {
		console.log(info)
	},
})

const saveNewEvent = (event: calendarEvent) => {
	const calendarApi = calendarRef.value?.getApi()

	calendarApi?.addEvent({
		title: event.title,
		date: event.date,
		color: event.color,
		backgroundColor: event.color,
		allDay: true,
		borderColor: event.color,
		extendedProps: {
			notes: event.extendedProps.notes,
		},
	})

	showPopup.value = false
}

const editEvent = (event: calendarEvent) => {
	selectedEvent.value.setProp('title', event.title)
	selectedEvent.value.setProp('date', event.date)
	selectedEvent.value.setProp('color', event.color)
	selectedEvent.value.setProp('backgroundColor', event.color)
	selectedEvent.value.setProp('borderColor', event.color)
	selectedEvent.value.setExtendedProp('notes', event.extendedProps.notes)

	showPopup.value = false
	selectedEvent.value = null
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

	// Змінено логіку для правильного перемикання view
	let viewName = ''
	if (activeType === 'month') {
		viewName = 'dayGridMonth'
	} else if (activeType === 'week') {
		viewName = 'timeGridWeek' // timeGrid для Week з сіткою годин
	} else if (activeType === 'day') {
		viewName = 'timeGridDay' // timeGrid для Day з сіткою годин
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
				:selectedDate="selectedDate as Date"
				:type="popupType as 'create' | 'edit'"
				v-if="showPopup"
				@sendNewEvent="saveNewEvent"
				@editEvent="editEvent"
				@close="showPopup = false"
			/>
		</div>
	</div>
</template>
<style>
.fc-toolbar {
	display: none !important;
}

[role='columnheader'] {
	background-color: var(--color-gray-bg) !important;
	border: none !important;
	padding: 1rem 0 !important;
	font-weight: 700;
	font-size: 0.6875rem !important;
	line-height: 0.875rem !important;
	letter-spacing: 0 !important;
	text-transform: uppercase;
	color: var(--color-text-gray) !important;
}

.fc .fc-daygrid-day {
	border-color: #eaf0f4;
	color: var(--color-sidebar) !important;
}

.fc-daygrid-day-number {
	margin-top: 1.0625rem !important;
	margin-right: 0.9163rem !important;
}

.fc .fc-daygrid-day.fc-day-today {
	background-color: var(--color-gray-bg) !important;
	border-bottom: 1px var(--color-border) solid !important;
}

.fc-col-header-cell.fc-day-today {
	border-bottom: 1px var(--color-border) solid !important;
}

.fc-daygrid-day-top {
	height: 2.25rem !important;
}

.fc .fc-event {
	padding: 0.375rem 0.875rem;
	border-radius: 0.25rem !important;
}

.fc-daygrid-day-frame .fc-scrollgrid-sync-inner {
	min-height: 135px !important;
}

.fc-event-title {
	font-family: 'Source Sans Pro' !important;
	font-weight: 400 !important;
	font-size: 0.8125rem !important; /* 13px */
	line-height: 1.25rem !important; /* 20px */
	letter-spacing: 0 !important;
	color: white !important;
}

.fc-daygrid-event-dot {
	display: none !important;
}

.fc-event-time {
	display: none !important;
}

.fc-daygrid-day-events {
	margin-top: 10px !important;
}

.fc-timegrid-slot-label-cushion,
.fc-timegrid-slot {
	height: 3.0625rem !important;
}

.fc-timegrid-slot-label-cushion {
	display: flex !important;
	align-items: center !important;
	justify-content: center !important;
	font-weight: 400 !important;
	font-size: 0.8125rem !important; /* 13px */
	line-height: 1.25rem !important; /* 20px */
	letter-spacing: 0 !important;
	text-transform: uppercase;
}

col {
	width: 5rem !important;
}

.fc .fc-timegrid-axis-frame {
	justify-content: center;
}

.fc-timegrid-slot.fc-timegrid-slot-lane {
	background-color: var(--color-gray-bg) !important;
}

.fc-timegrid-divider.fc-cell-shaded {
	display: none !important;
}

.fc-timegrid-event-harness.fc-timegrid-event-harness-inset {
	flex-direction: column !important;
}

.fc-day-past.fc-timegrid-col,
.fc-day-future.fc-timegrid-col {
	background-color: white !important;
}

.fc-timegrid-now-indicator-line {
	border-color: var(--color-primary) !important; /* Синій колір */
	border-width: 2px !important; /* Товщина лінії */
	border-style: solid !important; /* Суцільна лінія */
	/* або для пунктирної: */
	/* border-style: dashed !important; */
}

/* Іконка/стрілка зліва */
.fc-timegrid-now-indicator-arrow {
	border-color: var(--color-primary) !important; /* Колір стрілки */
	border-width: 5px !important;
	border-radius: 50%; /* Розмір стрілки */
	left: 0 !important;
}
</style>
