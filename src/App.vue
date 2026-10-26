<script setup>
// Two layouts over the same routes and content; the switch lives in each layout's header.
import DeveloperShell from './components/layout/DeveloperShell.vue'
import ProfessionalShell from './components/pro/ProfessionalShell.vue'
import { view } from './view'
</script>

<template>
  <ProfessionalShell v-if="view === 'professional'" />
  <DeveloperShell v-else />
</template>
