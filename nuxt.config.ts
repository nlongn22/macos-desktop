// https://nuxt.com/docs/api/configuration/nuxt-config
import eslintPlugin from 'vite-plugin-eslint';
import stylelintPlugin from 'vite-plugin-stylelint';
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
    app: {
        head: {
            title: 'Mock macOS desktop',
            htmlAttrs: { lang: 'en' },
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                {
                    name: 'description',
                    content: 'A mock of the macOS desktop with some of its UI elements',
                },
                { name: 'format-detection', content: 'telephone=no' },
                { name: 'author', content: 'Ngoc Long Nguyen' },
                { hid: 'og-site_name', property: 'og:site_name', content: 'mock-macos-desktop' },
                {
                    hid: 'og-title',
                    property: 'og:title',
                    content: 'Mock macOS desktop',
                },
                { hid: 'og-image', property: 'og:image', content: '/og/og.png' },
                { property: 'og:image:type', content: 'image/png' },
                { hid: 'default-theme-color', name: 'theme-color', content: '#fbfbfb' },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: 'favicons/favicon.ico' },
                { rel: 'icon', href: 'favicons/favicon.ico', sizes: 'any' },
                { rel: 'shortcut icon', href: 'favicons/favicon.ico' },
                {
                    rel: 'apple-touch-icon',
                    href: 'favicons/apple-touch-icon.png',
                    sizes: '180x180',
                },
                {
                    rel: 'icon',
                    href: 'favicons/favicon-32x32.png',
                    sizes: '32x32',
                    type: 'image/png',
                },
                {
                    rel: 'icon',
                    href: 'favicons/favicon-16x16.png',
                    sizes: '16x16',
                    type: 'image/png',
                },
                {
                    rel: 'mask-icon',
                    href: 'favicons/safari-pinned-tab.svg',
                    color: '#5bbad5',
                },
                { rel: 'manifest', href: 'favicons/site.webmanifest' },
            ],
        },
    },
    css: [
        '@/assets/styles/common/index.scss',
        '@/assets/styles/partials/index.scss',
    ],
    vite: {
        plugins: [
            eslintPlugin(),
            stylelintPlugin(),
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
    modules: [
        'nuxt-font-loader',
        '@nuxt/image-edge',
        '@nuxtjs/color-mode',
        '@funken-studio/sitemap-nuxt-3',
    ],
    image: {
        dir: 'assets/images',
    },
});
