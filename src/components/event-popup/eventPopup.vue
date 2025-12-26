<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import Input from '../ui/input/Input.vue'
import type { calendarEvent } from '@/types/calendar.type'

const props = defineProps<{
	selectedDate: Date | null
	selectedEvent?: any
	type: 'create' | 'edit'
}>()

const emits = defineEmits(['sendNewEvent', 'close', 'editEvent', 'deleteEvent'])

const colors = ref([
	'var(--color-primary)',
	'red',
	'yellow',
	'green',
	'pink',
	'violet',
])

const currentSelectedColor = ref(colors.value[0])

const formatDate = (date: Date | null): string => {
	if (!date) return ''
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}

const formatTime = (date: Date | null): string => {
	if (!date) return ''
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	return `${hours}:${minutes}`
}

const dateInput = ref('')
const time = ref('')

const event = ref<calendarEvent>({
	title: '',
	date: '',
	color: currentSelectedColor.value as string,
	extendedProps: {
		notes: '',
	},
})

onMounted(() => {
	if (props.type === 'edit' && props.selectedEvent) {
		event.value.title = props.selectedEvent.title || ''
		event.value.extendedProps.notes =
			props.selectedEvent.extendedProps?.notes || ''

		const eventStart = props.selectedEvent.start
		if (eventStart) {
			dateInput.value = formatDate(eventStart)
			time.value = formatTime(eventStart)
		}

		const eventColor =
			props.selectedEvent.backgroundColor || props.selectedEvent.borderColor
		if (eventColor && colors.value.includes(eventColor)) {
			currentSelectedColor.value = eventColor
		}
	} else {
		// Створення нової події
		dateInput.value = formatDate(props.selectedDate)
		time.value = ''
	}

	event.value.color = currentSelectedColor.value as string
})

const submitEvent = () => {
	if (dateInput.value && time.value) {
		const localDateTime = `${dateInput.value}T${time.value}`
		event.value.date = localDateTime
	} else if (dateInput.value) {
		event.value.date = dateInput.value
	}

	event.value.color = currentSelectedColor.value as string

	if (props.type === 'create') {
		emits('sendNewEvent', event.value)
	} else {
		emits('editEvent', event.value)
	}
}

const handleDelete = () => {
	emits('deleteEvent')
}

const handleCancel = () => {
	emits('close')
}

watch(currentSelectedColor, newColor => {
	event.value.color = newColor as string
})
</script>

<template>
	<form
		@submit.prevent="submitEvent"
		class="bg-white fixed pt-5.5 z-[200]! pb-6.25 px-5.25 max-w-50.25 w-full rounded-[10px] border-text-dark border"
	>
		<button
			type="button"
			@click="handleCancel"
			class="cursor-pointer absolute top-1.5 right-1.5 hover:opacity-70 transition-opacity"
		>
			<svg
				class="w-5 h-5"
				viewBox="0 0 16 16"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				fill="#000000"
			>
				<path
					fill="#d6d6d6"
					d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z"
				/>
				<path
					fill="#d6d6d6"
					d="M12.2 10.8l-2.8-2.8 2.8-2.8-1.4-1.4-2.8 2.8-2.8-2.8-1.4 1.4 2.8 2.8-2.8 2.8 1.4 1.4 2.8-2.8 2.8 2.8z"
				/>
			</svg>
		</button>

		<div class="flex flex-col gap-5.25">
			<Input
				type="text"
				placeholder="event name"
				v-model="event.title"
				required
			/>
			<Input
				type="date"
				placeholder="event date"
				v-model="dateInput"
				required
			/>
			<Input type="time" placeholder="event date" v-model="time" />
			<Input
				type="text"
				class="italic"
				placeholder="event date"
				v-model="event.extendedProps.notes"
			/>
			<div>
				<label class="text-input text-left block mb-2">Pick a color</label>
				<div class="mt-[17.25px] flex gap-2 flex-wrap">
					<div
						class="w-6 h-6 rounded-full border-2 cursor-pointer hover:scale-110 transition-transform"
						v-for="color in colors"
						:key="color"
						:style="{ backgroundColor: color }"
						:class="{
							'border-black': currentSelectedColor === color,
							'border-gray-300': currentSelectedColor !== color,
						}"
						@click="currentSelectedColor = color"
					></div>
				</div>
			</div>
		</div>

		<div class="mt-9 flex items-center justify-between gap-2.5">
			<div class="flex gap-2.5">
				<button
					@click="
						() => {
							props.type === 'create' ? handleCancel() : handleDelete()
						}
					"
					class="body-regular text-red hover:text-gray-700 cursor-pointer transition-colors"
				>
					{{ props.type === 'create' ? 'Cancel' : 'Discard' }}
				</button>
			</div>
			<input
				type="submit"
				class="body-regular text-btn cursor-pointer rounded transition-colors"
				:value="type === 'create' ? 'Save' : 'Edit'"
			/>
		</div>
	</form>
</template>
