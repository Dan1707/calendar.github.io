<script lang="ts" setup>
import DefaultHeader from '@/components/layout/defaultHeader.vue'
import DefaultSidebar from '@/components/layout/defaultSidebar.vue'
</script>

<template>
	<DefaultSidebar />
	<div style="max-width: calc(100% - 260px); margin-left: auto">
		<DefaultHeader />
		<main>
			<RouterView></RouterView>
		</main>
	</div>
</template>
