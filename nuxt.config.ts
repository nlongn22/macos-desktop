// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
    app: {
        head: {
            title: 'macOS Desktop',
            htmlAttrs: { lang: 'en' },
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                {
                    name: 'format-detection',
                    content: 'telephone=no',
                },
                {
                    name: 'description',
                    content: 'A replication of the macOS desktop with some of its UI elements',
                },
                {
                    name: 'author',
                    content: 'Ngoc Long Nguyen',
                },
                {
                    hid: 'og-site_name',
                    property: 'og:site_name',
                    content: 'macos-desktop',
                },
                {
                    hid: 'og-title',
                    property: 'og:title',
                    content: 'macOS desktop',
                },
                {
                    hid: 'og-image',
                    property: 'og:image',
                    content: '/og/og.png',
                },
            ],
            link: [
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: '/favicons/apple-touch-icon.png',
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '96x96',
                    href: '/favicons/favicon-96x96.png',
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '32x32',
                    href: '/favicons/favicon-32x32.png',
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    href: '/favicons/favicon-16x16.png',
                },
                {
                    rel: 'mask-icon',
                    href: '/favicons/safari-pinned-tab.svg',
                    color: '#5bbad5',
                },
                {
                    rel: 'manifest',
                    href: '/favicons/site.webmanifest',
                },
            ],
        },
    },
    css: [
        '@/assets/styles/common/index.scss',
        '@/assets/styles/partials/index.scss',
    ],
    imports: {
        dirs: ['stores'],
    },
    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@nuxt/image',
        '@nuxtjs/color-mode',
    ],
    pinia: {
        autoImports: [
            'defineStore',
        ],
    },
    ssr: false,
    vite: {
        plugins: [
            svgLoader(),
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/styles/core/index.scss" as *;',
                },
            },
        },
    },
});
