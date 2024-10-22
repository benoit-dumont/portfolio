<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Portfolio',
  description: 'Un portfolio de Développeur Web',
  ogTitle: 'Portfolio | Dumont Benoit',
  ogDescription: 'Le portfolio de Dumont Benoit',
  twitterTitle: 'Portfolio | Dumont Benoit',
  twitterDescription: 'Le portfolio de Dumont Benoit',
  twitterCard: 'player',
});

useHead({
  htmlAttrs: {
    lang: 'fr',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: 'https://media.licdn.com/dms/image/D4E03AQEEAMC8oxH7xQ/profile-displayphoto-shrink_200_200/0/1692704248404?e=1723075200&v=beta&t=E1g_1L9Zzg8M9CdcKiiW1rwu6v_ZwPnmKxVNhjb_-Vo',
    },
  ],
});
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>

<style>
body {
  margin: 0;
  font-family: 'Plus Jakarta Sans';
}
</style>
