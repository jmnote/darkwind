<script setup>
import Example from './Example.vue'
</script>
<template>
  <div class="min-h-screen bg-gray-500 text-x-slate-900">
    <div class="p-6 mx-auto grid max-w-7xl gap-6 grid-cols-2">
      <section>
        <div class="p-6 rounded-md border-x-slate-500 bg-x-white text-x-black">
          <h2 class="text-3xl">Light mode</h2>
          <Example />
        </div>
      </section>
      <section class="dark">
        <div class="p-6 rounded-md border-x-slate-500 bg-x-white text-x-black">
          <h2 class="text-3xl">Dark mode</h2>
          <Example />
        </div>
      </section>
    </div>
  </div>
</template>