<template>
    <Program
        :draggable-elements="[safariNavbarRef, safariLeftRef, safariRightRef]"
        class="safari"
    >
        <div
            ref="safariNavbarRef"
            class="safari__navbar"
        >
            <div
                ref="safariLeftRef"
                class="safari__left"
            >
                <ProgramDots program-name="safari" />
                <div class="safari__sidebar">
                    <Icon
                        name="sidebar-left"
                        class="safari__navbar-icon hover-effect hover-effect--small"
                    />
                    <Icon
                        name="chevron-right"
                        class="safari__sidebar-icon-chevron safari__navbar-icon hover-effect hover-effect--small"
                    />
                </div>
                <div class="safari__navigations">
                    <Icon
                        name="chevron-right"
                        class="safari__navigation-icon-chevron safari__navbar-icon safari__navbar-icon--smallest hover-effect hover-effect--small"
                        @click="navigateBack"
                    />
                    <Icon
                        name="chevron-right"
                        class="safari__navbar-icon safari__navbar-icon--smallest hover-effect hover-effect--small"
                        @click="navigateForward"
                    />
                </div>
            </div>

            <div class="safari__middle">
                <div class="safari__input">
                    <Icon
                        class="safari__input-icon"
                        name="lock-fill"
                    />
                    <input
                        placeholder="nln.fyi"
                        size="4"
                        class="safari__input-text"
                    >
                </div>
            </div>

            <div
                ref="safariRightRef"
                class="safari__right"
            >
                <Icon
                    name="square-and-arrow-up"
                    class="safari__navbar-icon safari__navbar-icon--small hover-effect hover-effect--small"
                />
                <Icon
                    name="plus"
                    class="safari__navbar-icon safari__navbar-icon--small hover-effect hover-effect--small"
                />
                <Icon
                    name="square-on-square"
                    class="safari__navbar-icon hover-effect hover-effect--small"
                />
            </div>
        </div>

        <div class="safari__tabs">
            <div
                v-for="(page, index) in safariPages"
                :key="index"
                class="safari__tab"
                :class="{ 'safari__tab--inactive' : activePage !== index }"
                @click="switchPage(index)"
            >
                <NuxtImg
                    :src="`/favicons/${page.name}.png`"
                    class="safari__tab-favicon"
                />
                <div class="safari__tab-title">
                    {{ page.title }}
                </div>
            </div>
        </div>

        <iframe
            v-for="(page, index) in safariPages"
            :key="index"
            :src="page.url"
            class="safari__iframe"
            :class="{ 'safari__iframe--active' : activePage === index }"
        />
    </Program>
</template>

<script setup lang="ts">
interface SafariPage {
    name: string,
    title: string,
    url: string,
}

const safariNavbarRef: Ref<HTMLElement | undefined> = ref();
const safariLeftRef: Ref<HTMLElement | undefined> = ref();
const safariRightRef: Ref<HTMLElement | undefined> = ref();

const safariPages: SafariPage[] = [
    {
        name: 'nln',
        title: 'Ngoc Long Nguyen | Home',
        url: 'https://nln.fyi',
    },
    {
        name: 'linkedin',
        title: 'Ngoc Long Nguyen | LinkedIn',
        url: 'https://linkedin.com/in/ngoc-long-nguyen',
    },
    {
        name: 'github',
        title: 'nlongn22 (Ngoc Long Nguyen) • GitHub',
        url: 'https://github.com/nlongn22',
    },
];

const activePage = ref(0);

function navigateBack(): void {
    window.history.back();
}

function navigateForward(): void {
    window.history.forward();
}

function switchPage(newPage: number): void {
    activePage.value = newPage;
}
</script>

<style lang="scss" scoped>
.safari {
    display: flex;
    flex-direction: column;
    background-color: $color-white-100;
}

.safari__navbar-icon {
    font-size: $space-9;
    color: rgba($color-foreground, $opacity-high);

    &--small {
        font-size: $space-8;
    }

    &--smallest {
        font-size: $space-6;
    }
}

.safari__navbar,
.safari__left,
.safari__sidebar,
.safari__navigations,
.safari__middle,
.safari__right,
.safari__tabs,
.safari__tab {
    display: flex;
    align-items: center;
}

.safari__navbar {
    justify-content: space-between;
    padding-inline: $space-6;
    padding-block-start: $space-2;
    padding-block-end: $space-3;
}

.safari__left {
    flex-grow: 1;
    flex-basis: 0;
    column-gap: $space-7;
}

.safari__sidebar-icon-chevron {
    transform: rotate(90deg);
    margin-inline-start: $space-2;
    font-size: $space-5;
}

.safari__navigations {
    column-gap: $space-7;
}

.safari__navigation-icon-chevron {
    transform: rotate(180deg);
}

.safari__middle {
    inline-size: 40%;
    padding: r(6);
    border-radius: $border-radius-lg;
    background-color: rgba($color-gray, $opacity-low);
}

.safari__input {
    display: flex;
    align-items: center;
    margin-inline: auto;
}

.safari__input-icon {
    margin-inline-end: $space-1;
    font-size: $space-3;
    color: rgba($color-foreground, $opacity-medium);
}

.safari__input-text {
    cursor: inherit;
    font-size: r(13);

    &::placeholder {
        color: $color-foreground;
    }
}

.safari__right {
    justify-content: flex-end;
    flex-grow: 1;
    flex-basis: 0;
    column-gap: $space-5;
}

.safari__tabs {
    margin-inline: -$space-0;
    border-block-end: $border-width-thin solid $color-border;
}

.safari__tab {
    flex-basis: 33.33%;
    justify-content: center;
    padding: $space-1;
    transition: background-color $transition-duration-fast;

    &--inactive {
        box-shadow: inset 0 $space-0 0 0 rgba($color-gray, $opacity-low);
        background-color: rgba($color-gray, $opacity-very-low);

        @include has-hover {
            background-color: rgba($color-gray, $opacity-low);
        }
    }

    &:first-child {
        .safari__tab-favicon {
            @include size($space-4);
        }
    }

    &:nth-child(2) {
        border-inline: $border-width-thin solid $color-border;
    }
}

.safari__tab-favicon {
    @include size($space-5);
    margin-inline-end: $space-1;
}

.safari__tab-title {
    font-size: r(11);
    color: rgba($color-foreground, $opacity-very-high);
}

.safari__iframe {
    @include size(100%);
    display: none;
    border: 0;

    &--active {
        display: block;
        visibility: visible;
    }
}
</style>
