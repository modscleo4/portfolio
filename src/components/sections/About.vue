<script setup lang="ts">
import { } from 'vue';

import {
  IconInfoCircle,
} from '@tabler/icons-vue';

import { Dev } from '../../Dev.js';

const { dev } = defineProps<{
  dev: Dev;
}>();
</script>

<template>
  <section id="about">
    <div class="section-wrapper">
      <h1><IconInfoCircle :size="36" stroke-width="1.25" /> Olá</h1>
      <p>{{ dev.brief }}</p>
    </div>
  </section>
</template>

<style scoped>
p {
  margin-bottom: 32px;
  text-align: justify;
}
</style>
