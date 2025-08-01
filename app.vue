<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <header class="border-b bg-white">
      <div class="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="font-bold text-xl">phuket-pogoda.ru</NuxtLink>
        <nav class="flex items-center gap-4">
          <NuxtLink to="/" class="hover:underline">Главная</NuxtLink>
          <NuxtLink to="/forecast" class="hover:underline">Прогноз</NuxtLink>
          <NuxtLink to="/articles/pogoda-na-phukete" class="hover:underline">Статьи</NuxtLink>
        </nav>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-4 py-6">
      <NuxtPage />
    </main>
    <footer class="border-t bg-white">
      <div class="max-w-4xl mx-auto px-4 py-6 text-sm text-gray-500">
        © {{ new Date().getFullYear() }} phuket-pogoda.ru
      </div>
    </footer>
  </div>
</template>
