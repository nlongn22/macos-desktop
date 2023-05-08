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
                        <span class="safari__dot">
                            &times;
                        </span>
                    </div>
                    <div class="safari__dot-background">
                        <span class="safari__dot">
                            &minus;
                        </span>
                    </div>
                    <div class="safari__dot-background">
                        <span class="safari__dot">
                            &plus;
                        </span>
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
                v-on-click-outside="disableInput"
                class="safari__middle"
                :class="{ 'safari__middle--active' : isSafariMiddleActive }"
                @click="activateInput"
            >
                <div
                    ref="safariInputRef"
                    class="safari__input"
                    :class="{ 'safari__input--active' : isSafariMiddleActive }"
                >
                    <Icon
                        class="safari__input-icon"
                        name="magnifyingglass"
                    />
                    <input
                        placeholder="Search or enter website name"
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
.safari__dot-background,
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

.safari__dot {
    transform: translateY(r(-1.5));
    visibility: hidden;
    font-size: r(13);
    color: rgba($color-foreground, $opacity-high);
}

.safari__dot-background {
    @include size($space-3);
    justify-content: center;
    border-radius: $border-radius-full;

    &:first-child {
        background-color: $color-red;
    }

    &:nth-child(2) {
        background-color: $color-orange;
    }

    &:last-child {
        background-color: $color-green;

        .safari__dot {
            transform: translate(r(-0.5), r(-1.5));
        }
    }
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
    inline-size: 40%;
    padding: r(6);
    border-radius: $border-radius-lg;
    background-color: rgba($color-gray, $opacity-low);

    &--active {
        margin: -$space-1;
        border: $space-1 solid rgba($color-blue, 0.5);
        cursor: text;
    }
}

.safari__input {
    inline-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: margin-inline-end $transition-duration-fast;

    &--active {
        margin-inline-end: 100%;
    }
}

.safari__input-icon {
    min-inline-size: $space-3;
    margin-inline-end: $space-1;
    font-size: $space-3;
    color: rgba($color-foreground, $opacity-medium);
}

.safari__input-text {
    min-inline-size: r(175);
    cursor: inherit;
    font-size: r(13);

    &::placeholder {
        color: rgba($color-gray, $opacity-high);
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
