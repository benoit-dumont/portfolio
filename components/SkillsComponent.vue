<template>
  <div class="skills-container">
    <div v-for="item in skills" :key="item" class="skill">
      <h2>{{ item.name }}</h2>
      <ul>
        <li
          v-for="{ name, icon } in item.stack"
          :key="name"
          class="skill-content"
        >
          <img :src="`/portfolio/${icon}`" :alt="name" />
          <p>{{ name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line import/no-unresolved, import/extensions
import skills from '~/data/skills';
</script>

<style scoped>
.skills-container {
  overflow-y: scroll;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.skill {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.skill h2 {
  color: white;
}

.skill ul {
  display: flex;
  margin: 0;
  padding: 0;
}

.skill-content {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  list-style-type: none;
  align-items: center;
  padding: 0 1em;
}

.skill-content:first-of-type {
  padding-left: 0;
}

.skill-content li {
  display: flex;
}

.skill-content p {
  color: white;
}

.skill-content img {
  width: 32px;
  height: 32px;
}

@media screen and (max-width: 800px) {
  .skills-container {
    overflow-y: initial;
  }
  .skill ul {
    gap: 0.5em;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
}
</style>
