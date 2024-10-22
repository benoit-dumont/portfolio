<template>
  <div
    v-for="{ startDate, endDate, title, location, details, learned } in history"
    :key="title"
    class="work-experience"
  >
    <div class="experience-date">
      <span>{{ startDate }} - {{ endDate }}</span>
    </div>
    <div class="experience-details">
      <h1>{{ title }}</h1>
      <h2>{{ location }}</h2>
      <p>{{ details }}</p>
      <div class="learned-container">
        <h2>Compétences apprises :</h2>
        <div v-for="item in learned" :key="item.name" class="learned">
          <img :src="`/portfolio/${item.icon}`" :alt="item.name" />
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line import/no-unresolved, import/extensions
import history from '~/data/history';
</script>

<style scoped>
.work-experience {
  display: flex;
  color: white;
  gap: 1em;
  padding-bottom: 2em;
}

.experience-date {
  flex: 1.2 1;
}

.experience-details {
  flex: 3 1;
}

.experience-details h1 {
  margin-top: 0;
}

.experience-details h2 {
  font-size: 1em;
  font-weight: 300;
  color: #466fff;
}

.experience-date span {
  background-color: #272f52;
  padding: 0.5em;
  border-radius: 10px;
  display: block;
  text-align: center;
}

.learned-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.learned {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.learned img {
  max-width: 24px;
  object-fit: cover;
}

@media screen and (max-width: 500px) {
  .work-experience {
    flex-direction: column;
  }
}
</style>
