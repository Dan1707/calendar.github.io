<script lang="ts" setup>
import type { viewType } from '@/types/calendar.type'
import { ref } from 'vue'

const props = defineProps<{
	btnArr: string[]
}>()

const emits = defineEmits(['currentBtn'])

const activeBtn = ref('')

activeBtn.value = props.btnArr[0] as string
</script>

<template>
	<div
		class="border overflow-hidden h-8 rounded w-fit bg-border gap-[1px] flex items-center shadow-[0px_2px_3px_#0000000D;]"
		style="box-shadow: 0px 2px 3px #0000000d"
	>
		<button
			v-for="btn in btnArr"
			:key="btn"
			class="body-regular text-text-dark px-4 py-2 active bg-white cursor-pointer duration-300"
			:class="{ 'text-primary!': btn === activeBtn }"
			@click="
				 () => {
    activeBtn = btn
    const viewValue = btn.toLowerCase() as viewType
    $emit('currentBtn', viewValue)
  }
			"
		>
			{{ btn }}
		</button>
	</div>
</template>
