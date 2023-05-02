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
                <div class="safari__dots">
                    <div class="safari__dot-background">
                        <Icon
                            name="xmark"
                            class="safari__dot"
                        />
                    </div>
                    <div class="safari__dot-background">
                        <Icon
                            name="minus"
                            class="safari__dot"
                        />
                    </div>
                    <div class="safari__dot-background">
                        <Icon
                            name="minus"
                            class="safari__dot"
                        />
                    </div>
                </div>
                <div class="safari__sidebar">
                    <Icon
                        name="sidebar-left"
                        class="safari__sidebar-icon-sidebar safari__navbar-icon"
                    />
                    <Icon
                        name="chevron-right"
                        class="safari__sidebar-icon-chevron safari__navbar-icon"
                    />
                </div>
                <div class="safari__navigations">
                    <Icon
                        name="chevron-right"
                        class="safari__navigation-icon-chevron safari__navbar-icon safari__navbar-icon--smaller"
                    />
                    <Icon
                        name="chevron-right"
                        class="safari__navbar-icon safari__navbar-icon--smaller"
                    />
                </div>
            </div>

            <div
                class="safari__middle"
                :class="{ 'safari__middle--active' : isSafariMiddleActive }"
                v-on-click-outside="disableInput"
                @click="activateInput"
            >
                <div
                    ref="safariInputRef"
                    class="safari__input"
                >
                    <Icon
                        class="spotlight__icon"
                        name="magnifyingglass"
                    />
                    <input
                        placeholder="Search or enter website name"
                        class="spotlight__input"
                    >
                </div>
            </div>

            <div
                ref="safariRightRef"
                class="safari__right"
            >
                <Icon
                    name="square-and-arrow-up"
                    class="safari__navbar-icon"
                />
                <Icon
                    name="plus"
                    class="safari__navbar-icon safari__navbar-icon--smaller"
                />
                <Icon
                    name="square-on-square"
                    class="safari__navbar-icon"
                />
            </div>
        </div>
    </Program>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';

const safariNavbarRef: Ref<HTMLElement | undefined> = ref();
const safariLeftRef: Ref<HTMLElement | undefined> = ref();
const safariRightRef: Ref<HTMLElement | undefined> = ref();

const isSafariMiddleActive = ref(false);

function activateInput(): void {
    isSafariMiddleActive.value = true;
}

function disableInput(): void {
    isSafariMiddleActive.value = false;
}
</script>

<style lang="scss" scoped>
.safari {
    background-color: $color-white-100;
}

.safari__navbar,
.safari__left,
.safari__dots,
.safari__sidebar,
.safari__navigations,
.safari__middle,
.safari__right {
    display: flex;
    align-items: center;
}

.safari__navbar {
    justify-content: space-between;
    padding-inline: $space-6;
    padding-block: $space-2;
}

.safari__left {
    flex-grow: 1;
    flex-basis: 0;
    column-gap: $space-6;
}

.safari__right {
    justify-content: flex-end;
    flex-grow: 1;
    flex-basis: 0;
    column-gap: $space-4;
}

.safari__dots {
    column-gap: $space-2;

    @include has-hover {
        .safari__dot {
            visibility: visible;
        }
    }
}

.safari__dot-background {
    @include size(r(13));
    display: grid;
    place-items: center;
    flex-shrink: 0;
    border-radius: $border-radius-full;

    &:first-child {
        background-color: $color-red;
    }

    &:nth-child(2) {
        background-color: $color-orange;
    }

    &:last-child {
        background-color: $color-green;
    }
}

.safari__dot {
    visibility: hidden;
    font-size: r(6);
    color: $color-foreground;
}

.safari__sidebar-icon-sidebar {
    @include size($space-9, 100%);
    padding-inline: $space-2;
    padding-block: r(6);

    @include has-hover {
        border-radius: $border-radius;
        background-color: rgba($color-gray, $opacity-low);
    }
}

.safari__sidebar-icon-chevron {
    @include size($space-5, 100%);
    transform: rotate(90deg);
    padding: $space-2;
    font-size: $space-2 !important;
    border-block-end: $border-width-thin solid rgba($color-gray, $opacity-low);

    @include has-hover {
        border-radius: $border-radius;
        background-color: rgba($color-gray, $opacity-low);
    }
}

.safari__navigations {
    column-gap: $space-4;
}

.safari__navigation-icon-chevron {
    transform: rotate(180deg);
}

.safari__middle {
    width: 40%;
    padding: $space-2;
    padding-block: $space-1;
    border-radius: $border-radius-md;
    background-color: rgba($color-gray, $opacity-very-low);

    &--active {
        margin: r(-3);
        border: r(3) solid rgba($color-blue, 0.5);
        cursor: text;

        .safari__input {
            transform: translateX(-65%);
        }

        @include has-hover {
            cursor: text;
        }
    }
}

.safari__input {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-inline: auto;
    transition: all $transition-duration-fast;
}

.spotlight__icon {
    margin-right: $space-1;
    font-size: $space-3;
    color: rgba($color-foreground, $opacity-medium);
}

.spotlight__input {
    cursor: inherit;

    &::placeholder {
        color: rgba($color-foreground, $opacity-low);
    }
}

.safari__navbar-icon {
    font-size: $space-5;
    color: rgba($color-foreground, $opacity-high);

    &--smaller {
        font-size: $space-4;
    }
}
</style>
