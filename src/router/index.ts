import DefaultLayout from '@/layouts/defaultLayout.vue'
import HomeView from '@/views/homeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: 'public',
			path: '/',
			component: DefaultLayout,
			children: [
				{
					name: 'home',
					path: '/',
					component: HomeView,
				},
			],
		},
	],
})

export default router
