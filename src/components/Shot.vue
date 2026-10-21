<script setup>
// A screenshot in a frame. Phone shots sit centered on a muted panel.
// framed=false drops the border and rounding when a card already draws them.
defineProps({ src: String, alt: String, mobile: Boolean, ratio: { type: String, default: 'aspect-[16/10]' }, framed: { type: Boolean, default: true } })
</script>

<template>
  <div :class="[ratio, framed && 'rounded-lg border', 'overflow-hidden bg-muted']">
    <img v-if="src" :src="src" :alt="alt" loading="lazy" decoding="async" draggable="false"
         :class="[mobile ? 'mx-auto h-full w-auto object-contain py-3' : 'h-full w-full object-cover object-top',
                  'transition-transform duration-500 ease-out group-hover:scale-[1.03]']" />
    <div v-else class="flex h-full items-center justify-center font-mono text-xs text-muted-foreground">Screens not shown</div>
  </div>
</template>
