<script lang="ts" setup></script>

<template>
	<header class="bg-white h-17.5 flex items-center">
		<div class="container px-5 flex items-center justify-between">
			<button class="body-regular text-text-dark flex items-center gap-2.5">
				<img src="/src/assets/img/search.svg" alt="search" />
				Search transactions, invoices or help
			</button>
			<div class="max-w-69.25 w-full flex items-center gap-5">
				<div class="max-w-27 w-full">
					<div class="flex items-center justify-between w-full gap-2.5">
						<a href="#">
							<img src="/src/assets/img/help-center.svg" alt="help-center" />
						</a>
						<a href="#">
							<img src="/src/assets/img/help-center.svg" alt="help-center" />
						</a>
						<a href="#">
							<img src="/src/assets/img/help-center.svg" alt="help-center" />
						</a>
					</div>
				</div>
				<div class="w-[1px] h-7 bg-[#EBEBF2]"></div>
				<div
					class="max-w-31.75 w-full flex items-center justify-between gap-2.5"
				>
					<button
						class="body-regular gap-3.75 flex items-center justify-between"
					>
						John Doe
						<img src="/src/assets/img/arrow.svg" alt="arrow" />
					</button>
					<div class="w-9.5 h-9.5 overflow-hidden rounded-full">
						<img src="/src/assets/img/Avatar.png" alt="Avatar" class="w-full" />
					</div>
				</div>
			</div>
		</div>
	</header>
</template>
