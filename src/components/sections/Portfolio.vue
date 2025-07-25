<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted } from 'vue';

import {
  IconDeviceDesktopCode,
} from '@tabler/icons-vue';

import { Dev } from '../../Dev.js';
import PortfolioItem from './Portfolio.Item.vue';

const { portfolio, tech_filter } = defineProps<{
  portfolio: Dev['portfolio'];
  tech_filter: string[];
}>();

let portfolioLeftMargin: number = 0;

function scrollHandlerPortfolio() {
  const target                  = document.querySelector<HTMLElement>(`section#portfolio`)!;
  const portfolioSectionWrapper = document.querySelector<HTMLDivElement>(`section#portfolio .section-wrapper`)!;
  const ul                      = document.querySelector<HTMLUListElement>(`section#portfolio .portfolio-items ul`)!;
  const ulBounds                = ul.getBoundingClientRect();

  const targetBounds = target.getBoundingClientRect();
  if (Math.floor(targetBounds.top) <= 64 && targetBounds.bottom >= 0) {
    if (window.matchMedia('(max-width: 800px)').matches) {
      // mobile
      return;
    }

    const top = targetBounds.top;
    const bottom = targetBounds.bottom;

    if (!portfolioSectionWrapper.classList.contains('visible')) {
      portfolioSectionWrapper.classList.add('visible');
    }

    if (bottom < window.innerHeight) {
      portfolioSectionWrapper.classList.add('bottom');
      ul.style.setProperty('--top', `${-ulBounds.width + window.innerHeight + portfolioLeftMargin - 64}px`);
      return;
    } else {
      portfolioSectionWrapper.classList.remove('bottom');
    }

    ul.style.setProperty('--top', `${top + portfolioLeftMargin - 64}px`);
  } else {
    portfolioSectionWrapper.classList.remove('visible');
    if (targetBounds.top > 0) { // scrolled up
      ul.style.setProperty('--top', `0px`);
    }
  }
}

function resizePortfolio() {
  const target                  = document.querySelector<HTMLElement>(`section#portfolio`)!;
  const portfolioSectionWrapper = document.querySelector<HTMLDivElement>(`section#portfolio .section-wrapper`)!;
  const heading                 = document.querySelector<HTMLElement>(`section#portfolio .section-wrapper > h1`)!;
  const itemsContainer          = document.querySelector<HTMLUListElement>(`section#portfolio .portfolio-items`)!;
  const ul                      = document.querySelector<HTMLUListElement>(`section#portfolio .portfolio-items ul`)!;
  const header                  = document.querySelector<HTMLElement>(`header`)!;

  if (window.matchMedia('(max-width: 800px)').matches) {
    // mobile
    target.style.height = '';
    return;
  }

  ul.style.setProperty('--top', `0px`);

  const ulBounds = ul.getBoundingClientRect();
  target.style.height = ulBounds.width + 'px';
  portfolioLeftMargin = ulBounds.x;
  itemsContainer.style.setProperty('--bottom', `${Math.max(0, (window.innerHeight - header.getBoundingClientRect().height) - ulBounds.height - heading.getBoundingClientRect().height)}px`);

  scrollHandlerPortfolio();

  if (portfolioSectionWrapper.classList.contains('bottom')) {
    // portfolio section is no longer visible, update the top property manually
    ul.style.setProperty('--top', `${-ulBounds.width + window.innerHeight + portfolioLeftMargin - 64}px`);
  }
}

onBeforeMount(() => {
  window.addEventListener('scroll', scrollHandlerPortfolio);

  window.addEventListener('resize', resizePortfolio);
});

onMounted(resizePortfolio);

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandlerPortfolio);

  window.removeEventListener('resize', resizePortfolio);
});
</script>

<template>
  <section id="portfolio">
    <div class="section-wrapper">
      <h1><IconDeviceDesktopCode :size="36" stroke-width="1.25" /> Alguns dos meus projetos</h1>

      <div v-if="portfolio.length === 0">
        <p>Nenhum item encontrado.</p>
      </div>

      <div class="portfolio-items" v-else>
        <ul>
          <li v-for="item in portfolio">
            <PortfolioItem :item="item" :tech_filter="tech_filter" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>

#portfolio {
  --top: 160px;
  overflow-x: hidden;
}

#portfolio .section-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
  max-width: unset;
}

#portfolio .section-wrapper > h1 {
  margin: 0;
  margin-left: calc((100vw - var(--app-max-width)) / 2);
  padding: 0 32px;
}

#portfolio .section-wrapper.visible > h1 {
  top: 72px;
  left: 0;
  position: fixed;
}

#portfolio .section-wrapper.bottom > h1 {
  position: absolute;
  top: unset;
  bottom: var(--bottom);
  left: 0;
}

#portfolio .portfolio-items {
  --bottom: 0px;
  overflow: hidden;
  margin-left: calc(32px + (100vw - var(--app-max-width)) / 2);
}

#portfolio .section-wrapper.visible .portfolio-items {
  top: var(--top);
  left: 0;
  position: fixed;
  margin-left: 0;
}

#portfolio .section-wrapper.bottom .portfolio-items {
  position: absolute;
  top: unset;
  bottom: var(--bottom);
  left: 0;
}

#portfolio .portfolio-items ul {
  --top: 0px;
  display: grid;
  grid-column-gap: 32px;
  grid-auto-flow: column;
  grid-auto-columns: 25vw;
  list-style: none;
  padding: 0;
  padding-bottom: 4px;
  margin: 0;
  transform: translate3d(var(--top), 0, 0);
  will-change: transform;
  position: absolute;
}

#portfolio .section-wrapper.visible .portfolio-items ul {
  position: unset;
}

#portfolio .portfolio-items ul li {
  transition: all 200ms;
  background: var(--odd);
}

#portfolio .portfolio-items ul li:hover {
  color: var(--text-color);
  box-shadow: -1px 1px 5px 0 rgba(0, 0, 0, 0.35);
  background: var(--even);
}

@media (max-width: 800px) {
  #portfolio .section-wrapper {
    padding: 0 32px;
  }

  #portfolio .section-wrapper > h1 {
    margin-left: 0;
    padding: 0;
    position: unset;
  }

  #portfolio .portfolio-items {
    margin-left: 0;
    position: unset;
  }

  #portfolio .portfolio-items ul {
    position: unset;
    display: flex;
    flex-direction: column;
    transform: unset;
    gap: 16px;
  }

  #portfolio .portfolio-items ul li {
    height: unset;
  }
}
</style>
