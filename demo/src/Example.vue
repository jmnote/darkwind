<template>
  <section>
    <h3>Palette colors</h3>
    <p>Every color in the default palette, like Tailwind classes, includes 11 steps. In light mode, 50 is the
      lightest, and 950 is the darkest. In dark mode, 50 is the darkest, and 950 is the lightest:
    </p>
    <figure
      class="flex flex-col gap-1 rounded-xl bg-gray-950/5 p-1 inset-ring inset-ring-gray-950/5 dark:bg-white/10 dark:inset-ring-white/10">
      <div class="not-prose overflow-auto rounded-lg bg-white outline outline-white/5 dark:bg-gray-950/50 p-8 pb-4">
        <div
          class="mx-auto inline-grid max-w-lg grid-cols-1 justify-center gap-3 *:*:first:size-9 *:*:first:rounded-md *:*:first:inset-ring *:*:first:inset-ring-black/5 sm:grid-cols-11 sm:flex-row sm:*:*:first:aspect-square sm:*:*:first:w-full">
          <div class="flex items-center gap-1.5 sm:flex-col">
            <div class="bg-x-sky-50"></div>
            <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">50</p>
          </div>
          <div class="flex items-center gap-1.5 sm:flex-col">
            <div class="bg-x-sky-100"></div>
            <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">100</p>
          </div>
          <div class="flex items-center gap-1.5 sm:flex-col">
            <div class="bg-x-sky-200"></div>
            <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">200</p>
          </div>
          <div class="flex items-center gap-1.5 sm:flex-col">
            <div class="bg-x-sky-300"></div>
            <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">300</p>
          </div>
          <div class="flex items-center gap-1.5 sm:flex-col">
            <div class="bg-x-sky-400"></div>
            <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">400</p>
          </div>
          <div class="flex items-center gap-1.5 sm:flex-col">
            <div class="bg-x-sky-500"></div>
            <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">500</p>
          </div>
          <div class="flex items-center gap-1.5 sm:flex-col">
            <div class="bg-x-sky-600"></div>
            <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">600</p>
          </div>
          <div class="flex items-center gap-1.5 sm:flex-col">
            <div class="bg-x-sky-700"></div>
            <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">700</p>
          </div>
          <div class="flex items-center gap-1.5 sm:flex-col">
            <div class="bg-x-sky-800"></div>
            <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">800</p>
          </div>
          <div class="flex items-center gap-1.5 sm:flex-col">
            <div class="bg-x-sky-900"></div>
            <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">900</p>
          </div>
          <div class="flex items-center gap-1.5 sm:flex-col">
            <div class="bg-x-sky-950"></div>
            <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">950</p>
          </div>
        </div>
      </div>
    </figure>
  </section>

  <section>
    <h3>Adjusting opacity</h3>
    <p>You can adjust the opacity of a color using syntax like <code>bg-x-black/75</code>, where <code>75</code>
      sets
      the
      alpha channel of the color to 75%:</p>
    <figure
      class="flex flex-col gap-1 rounded-xl bg-gray-950/5 p-1 inset-ring inset-ring-gray-950/5 dark:bg-white/10 dark:inset-ring-white/10">
      <div class="not-prose overflow-auto rounded-lg bg-white outline outline-white/5 dark:bg-gray-950/50">
        <div
          class="flex items-center justify-center p-8 pb-4 [--checkered-bg:--alpha(var(--color-gray-950)/10%)] dark:[--checkered-bg:--alpha(var(--color-white)/5%)]"
          style="background-image:linear-gradient(45deg, var(--checkered-bg) 25%, transparent 25%),
    linear-gradient(-45deg, var(--checkered-bg) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--checkered-bg) 75%),
    linear-gradient(-45deg, transparent 75%, var(--checkered-bg) 75%);background-size:20px 20px;background-position:0 0, 0 10px, 10px -10px, -10px 0px">
          <div
            class="mx-auto inline-grid max-w-lg grid-cols-1 justify-center gap-3 *:*:first:size-9 *:*:first:rounded-md sm:grid-cols-10 sm:flex-row sm:*:*:first:aspect-square sm:*:*:first:w-full">
            <div class="flex items-center gap-1.5 sm:flex-col">
              <div class="bg-x-sky-300/10"></div>
              <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">10</p>
            </div>
            <div class="flex items-center gap-1.5 sm:flex-col">
              <div class="bg-x-sky-300/20"></div>
              <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">20</p>
            </div>
            <div class="flex items-center gap-1.5 sm:flex-col">
              <div class="bg-x-sky-300/30"></div>
              <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">30</p>
            </div>
            <div class="flex items-center gap-1.5 sm:flex-col">
              <div class="bg-x-sky-300/40"></div>
              <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">40</p>
            </div>
            <div class="flex items-center gap-1.5 sm:flex-col">
              <div class="bg-x-sky-300/50"></div>
              <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">50</p>
            </div>
            <div class="flex items-center gap-1.5 sm:flex-col">
              <div class="bg-x-sky-300/60"></div>
              <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">60</p>
            </div>
            <div class="flex items-center gap-1.5 sm:flex-col">
              <div class="bg-x-sky-300/70"></div>
              <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">70</p>
            </div>
            <div class="flex items-center gap-1.5 sm:flex-col">
              <div class="bg-x-sky-300/80"></div>
              <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">80</p>
            </div>
            <div class="flex items-center gap-1.5 sm:flex-col">
              <div class="bg-x-sky-300/90"></div>
              <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">90</p>
            </div>
            <div class="flex items-center gap-1.5 sm:flex-col">
              <div class="bg-x-sky-300"></div>
              <p class="text-center font-mono text-xs text-gray-600 dark:text-gray-400">100</p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  </section>
</template>
<style scoped>
h3 {
  padding: 2rem 0 1rem;
  font-weight: var(--font-weight-semibold);
}

p {
  padding: 0 0 1rem;

  code {

    &::before,
    &::after {
      content: '`';
    }

    font-weight: var(--font-weight-bold);
    font-family: var(--font-mono);
  }
}
</style>
