<script lang="ts" setup>
import { ref, watch } from 'vue'
import Input from '../ui/input/Input.vue'
import type { calendarEvent } from '@/types/calendar.type'

const props = defineProps<{
	selectedDate: Date | null
	type: 'create' | 'edit'
}>()

const emits = defineEmits(['sendNewEvent', 'close', 'editEvent'])

const colors = ref([
	'var(--color-primary)',
	'red',
	'yellow',
	'blue',
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

const dateInput = ref(formatDate(props.selectedDate))
const time = ref('')

const event = ref<calendarEvent>({
	title: '',
	date: formatDate(props.selectedDate),
	color: currentSelectedColor.value as string,
	extendedProps: {
		notes: '',
	},
})

const submitEvent = () => {
	if (dateInput.value && time.value) {
		const localDateTime = `${dateInput.value}T${time.value}`
		event.value.date = localDateTime
	}

	event.value.color = currentSelectedColor.value as string

	props.type === 'create'
		? emits('sendNewEvent', event.value)
		: emits('editEvent')
}

watch(currentSelectedColor, newColor => {
	event.value.color = newColor as string
})

watch(dateInput, newDate => {
	console.log('dateInput changed:', newDate)
	event.value.date = newDate
})
</script>

<template>
	<form
		@submit.prevent="submitEvent"
		class="bg-white absolute top-25.5 pt-5.5 pb-6.25 z-100 px-5.25 max-w-50.25 w-full rounded-[10px] border-text-dark border before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:-top-3 before:border-l-[12px] before:border-l-transparent before:border-r-[12px] before:border-r-transparent before:border-b-[12px] before:border-b-[#3d4258]"
	>
		<button @click="$emit('close')" class="cursor-pointer">
			<svg
				class="w-5 h-5 absolute top-1.5 right-1.5"
				viewBox="0 0 16 16"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				fill="#000000"
			>
				<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
				<g
					id="SVGRepo_tracerCarrier"
					stroke-linecap="round"
					stroke-linejoin="round"
				></g>
				<g id="SVGRepo_iconCarrier">
					<path
						fill="#d6d6d6"
						d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z"
					></path>
					<path
						fill="#d6d6d6"
						d="M12.2 10.8l-2.8-2.8 2.8-2.8-1.4-1.4-2.8 2.8-2.8-2.8-1.4 1.4 2.8 2.8-2.8 2.8 1.4 1.4 2.8-2.8 2.8 2.8z"
					></path>
				</g>
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
			<Input type="time" placeholder="event time" v-model="time" required />
			<Input
				type="text"
				placeholder="notes"
				v-model="event.extendedProps.notes"
				required
			/>
			<div>
				<label class="text-input text-left">pick a color</label>
				<div class="mt-[17.25px] flex gap-2 flex-wrap">
					<div
						class="w-6 h-6 rounded-full border-2"
						v-for="color in colors"
						:key="color"
						:style="{ backgroundColor: `${color}` }"
						:class="{
							'border-2 border-black': currentSelectedColor === color,
						}"
						@click="currentSelectedColor = color"
					></div>
				</div>
			</div>
		</div>
		<div class="mt-9 cursor-pointer flex items-center justify-between gap-2.5">
			<button class="body-regular text-red cursor-pointer">
				{{ props.type === 'create' ? 'Cencel' : 'Discard' }}
			</button>
			<input
				type="submit"
				class="body-regular text-btn cursor-pointer"
				:value="props.type === 'create' ? 'Save' : 'Edit'"
			/>
		</div>
	</form>
</template>
