<script setup>
// A small file-type glyph in the spirit of VS Code's file icons.
import { FileText, Folder, FolderOpen } from '@lucide/vue'

defineProps({ name: String, folder: Boolean, open: Boolean })
</script>

<template>
  <span class="inline-grid size-4 shrink-0 place-items-center" aria-hidden="true">
    <template v-if="folder">
      <FolderOpen v-if="open" class="size-4 text-folder" />
      <Folder v-else class="size-4 text-folder" />
    </template>
    <span v-else-if="name?.endsWith('.ts')" class="font-mono text-[9px] font-bold leading-none text-syn-keyword">TS</span>
    <FileText v-else-if="name?.endsWith('.pdf')" class="size-4 text-syn-string" />
    <FileText v-else class="size-4 text-syn-var" />
  </span>
</template>
