<script lang="ts" setup>
import { buttonSection } from '@/components/ui/button-section'
import type { viewType } from '@/types/calendar.type'
import { CalendarView } from '@kodeglot/vue-calendar'
import { computed, ref } from 'vue'
import '@kodeglot/vue-calendar/dist/style.css'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const viewType = ref<viewType>('month')

const changeViewType = (activeType: viewType) => (viewType.value = activeType)

const calendarOptions = {
	plugins: [dayGridPlugin, interactionPlugin],
	initialView: 'dayGridMonth',
}
</script>

<template>
	<div class="max-w-292.5 w-full m-auto">
		<!-- MAIN HEADING -->
		<h1 class="heading-large mt-8">Calendar</h1>
		<!-- CALENDAR -->
		<div class="bg-white p-5 mt-8">
			<!-- VIEW -->
			<div class="flex items-center justify-between">
				<p class="heading-medium text-text-dark">Calendar View</p>
				<buttonSection
					:btnArr="['Month', 'Week', 'Day']"
					@currentViewType="changeViewType"
				/>
			</div>
			<!-- CALENDAR TOP HEADING -->
			<div class="mt-3.75 flex relative items-center h-8">
				<buttonSection
					:btnArr="['Today', 'Back', 'Next']"
					class="mr-auto absolute"
				/>
				<p class="heading-medium text-center w-full">December 2025</p>
			</div>
			<!-- CALENDAR MAIN CONTENT -->
			<FullCalendar :options="calendarOptions" />
		</div>
	</div>
</template>
