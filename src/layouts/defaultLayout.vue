<script lang="ts" setup></script>

<template>
	<aside class="w-65 min-h-screen bg-sidebar fixed left-0 top-0">
		<div class="p-6 bg-siderbar-dark">
			<h3 class="text-bold-large text-white">IMPEKABLE</h3>
		</div>
		<ul>
			<li class="p-5 heading-small text-white cursor-pointer">
				<a href="#" class="flex items-center gap-2.75">
					<img src="/src/assets/img/home.svg" alt="home" />
					Home
				</a>
			</li>
			<li class="p-5 heading-small text-white cursor-pointer">
				<a href="#" class="flex items-center gap-2.75">
					<img src="/src/assets/img/home.svg" alt="" />
					Dashboard
				</a>
			</li>
			<li class="p-5 heading-small text-white cursor-pointer">
				<a href="#" class="flex items-center gap-2.75">
					<img src="/src/assets/img/inbox.svg" alt="" />
					Inbox
				</a>
			</li>
			<li class="p-5 heading-small text-white cursor-pointer">
				<a href="#" class="flex items-center gap-2.75">
					<img src="/src/assets/img/home.svg" alt="" />
					Products
				</a>
			</li>
			<li class="p-5 heading-small text-white cursor-pointer">
				<a href="#" class="flex items-center gap-2.75">
					<img src="/src/assets/img/invoices.svg" alt="" />
					Invoices
				</a>
			</li>
			<li class="p-5 heading-small text-white cursor-pointer">
				<a href="#" class="flex items-center gap-2.75">
					<img src="/src/assets/img/home.svg" alt="" />
					Customers
				</a>
			</li>
			<li class="p-5 heading-small text-white cursor-pointer">
				<a href="#" class="flex items-center gap-2.75">
					<img src="/src/assets/img/home.svg" alt="" />
					Chat Room
				</a>
			</li>
			<li class="p-5 heading-small text-white cursor-pointer">
				<a href="#" class="flex items-center gap-2.75">
					<img src="/src/assets/img/home.svg" alt="" />
					Calendar
				</a>
			</li>
			<li class="p-5 heading-small text-white cursor-pointer">
				<a href="#" class="flex items-center gap-2.75">
					<img src="/src/assets/img/help-center.svg" alt="" />
					Help Center
				</a>
			</li>
			<li class="p-5 heading-small text-white cursor-pointer">
				<a href="#" class="flex items-center gap-2.75">
					<img src="/src/assets/img/settings.svg" alt="" />
					Settings
				</a>
			</li>
		</ul>
	</aside>
	<div class="wrapper" style="max-width: calc(100% - 260px); margin-left: auto">
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
							<img
								src="/src/assets/img/Avatar.png"
								alt="Avatar"
								class="w-full"
							/>
						</div>
					</div>
				</div>
			</div>
		</header>
		<main>
			<RouterView></RouterView>
		</main>
	</div>
</template>
