// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/google-fonts', 'nuxt-phosphor-icons', '@nuxt/image-edge'],

  googleFonts: {
    families: {
      'Plus Jakarta Sans': true,
    },
  },

  image: {
    provider: 'ipx',
    serveStatic: true,
  },

  app: {
    baseURL: '/',
    buildAssetsDir: 'public/portfolio', // don't use "_" at the begining of the folder name to avoids nojkill conflict
  },

  nitro: {
    prerender: {
      failOnError: false,
    },
  },

  compatibilityDate: '2024-10-05',
});
