<template>
  <div
    v-for="{ name, title, image, startDate, endDate, timeElapsed } in study"
    :key="title"
    class="study-list"
  >
    <div class="study-date">
      <span
        >{{ startDate }} - {{ endDate }} <br />
        ({{ timeElapsed }})</span
      >
    </div>
    <div class="study-details">
      <img :src="`/portfolio/${image}`" :alt="name" />
      <div class="study-details-infos">
        <h1>{{ name }}</h1>
        <h2>{{ title }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line import/no-unresolved, import/extensions
import study from '~/data/study';
</script>

<style scoped>
.study-list {
  display: flex;
  color: white;
  gap: 1em;
  padding-bottom: 2em;
}

.study-details {
  flex: 3 1;
  display: flex;
  gap: 1em;
}

.study-details h1 {
  margin-top: 0;
}

.study-details h2 {
  font-size: 1em;
  font-weight: 300;
  color: #466fff;
}

.study-date {
  flex: 1.2 1;
  display: inline-flex;
  gap: 5px;
  height: fit-content;
  flex-direction: column;
}

.study-details img {
  width: clamp(16px, auto, 78px);
}

.study-date span {
  background-color: #272f52;
  padding: 0.5em;
  border-radius: 10px;
  text-align: center;
}

@media screen and (max-width: 800px) {
  .study-list {
    flex-direction: column;
  }
}
@media screen and (max-width: 400px) {
  .study-details {
    flex-direction: column;
  }
  .study-details-infos {
    text-align: center;
  }
}
</style>
