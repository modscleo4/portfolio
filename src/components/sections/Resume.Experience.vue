<script setup lang="ts">
import { } from 'vue';

import {
  IconBriefcase,
} from '@tabler/icons-vue';

import { Dev } from '../../Dev.js';
import UList from '../UList.vue';
import Badge from '../Badge.vue';

const { dev } = defineProps<{ dev: Dev; }>();
</script>

<template>
  <section id="experience">
    <div class="section-wrapper">
      <h2><IconBriefcase :size="24" stroke-width="1.25" /> Experiência profissional</h2>

      <UList>
        <li v-for="job in dev.resume.experience">
          <h1>{{ job.company_name }}</h1>
          <p>{{ job.description }}</p>
          <aside>
            <p>{{ job.start_year }} - {{ job.end_year ?? '' }}</p>
            <p v-if="typeof job.activities === 'string'">{{ job.activities }}</p>
            <ul>
              <li v-for="activity in job.activities">{{ activity }}</li>
            </ul>
          </aside>
          <footer>
            <Badge v-for="skill in job.skills" :key="skill">{{ skill }}</Badge>
          </footer>
        </li>
      </UList>
    </div>
  </section>
</template>

<style scoped>
aside {
  margin-bottom: 8px;
}

aside ul {
  padding: 0 1rem;
  margin: 0;
}

footer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  gap: 8px;
}
</style>
