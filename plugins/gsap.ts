import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(gsap);
    nuxtApp.provide('gsap', gsap);
    nuxtApp.provide('Draggable', Draggable);
});
