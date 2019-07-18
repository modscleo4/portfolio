<script setup lang="ts">
import { ref } from 'vue';

import { Dev } from '../Dev.js';

import Navbar from './Navbar.vue';
import Header from './sections/Header.vue';
import DevInfo from './sections/DevInfo.vue';
import About from './sections/About.vue';
import Resume from './sections/Resume.vue';
import Portfolio from './sections/Portfolio.vue';
import Footer from './sections/Footer.vue';

const { dev } = defineProps<{ dev: Dev; }>();

const sidebarOpened = ref(false);
const tech_filter = ref<string[]>([]);

function portfolio() {
  if (tech_filter.value.length === 0) {
    return dev.portfolio;
  }

  return dev.portfolio.filter(p => p.techs.find(t => tech_filter.value.includes(t)));
}
</script>

<template>
  <main>
    <Navbar :dev="dev" :sidebarOpened="sidebarOpened" @toggleSidebar="sidebarOpened = !sidebarOpened" />
    <div v-if="sidebarOpened" class="sidebar-backdrop" @click="sidebarOpened = !sidebarOpened"></div>

    <Header :dev="dev" :sidebarOpened="sidebarOpened" @toggleSidebar="sidebarOpened = !sidebarOpened" />
    <DevInfo :dev="dev" />
    <About :dev="dev" />
    <Resume :dev="dev" />
    <Portfolio :portfolio="portfolio()" :tech_filter="tech_filter" />
    <Footer :dev="dev" />
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.sidebar-backdrop {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 950;
  background-color: rgba(0, 0, 0, 0.4);
}

:deep(section) {
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0);
  padding: 64px 0 32px;
  background: var(--background-color);
  display: flex;
  justify-content: center;
  position: relative;
}

:deep(section section) {
  padding: unset;
  background: unset;
  display: unset;
}

:deep(section h1) {
  margin: 0;
  margin-bottom: 36px;
  font-size: 2.5em;
}

:deep(.section-wrapper) {
  max-width: var(--app-max-width);
  width: 100%;
  padding: 0 32px;
}

:deep(.alt-bg) {
  color: var(--text-color-alt);
}

:deep(.alt-bg a) {
  color: var(--link-color-alt);
}

:deep(.alt-bg a:hover) {
  color: var(--link-color-hover-alt);
}

:deep(.no-bg) {
  background: none;
}
</style>
