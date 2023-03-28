<template>
    <Program
        :draggable-elements="[safariNavbarRef, safariLeftRef, safariRightRef]"
        :is-minimized="isMinimized"
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
                            @click="minimize"
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

            <div class="safari__middle">
                <Icon
                    class="spotlight__icon"
                    name="magnifyingglass"
                />
                <input
                    placeholder="Search or enter website name"
                    class="spotlight__input"
                >
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
const safariNavbarRef: Ref<HTMLElement | undefined> = ref();
const safariLeftRef: Ref<HTMLElement | undefined> = ref();
const safariRightRef: Ref<HTMLElement | undefined> = ref();

const isMinimized = ref(false);

function minimize(): void {
    isMinimized.value = true;
}
</script>

<style lang="scss" scoped>
.safari {
    background-color: $color-background;
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
    padding-block: $space-3;
    background-color: $color-background;
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

.safari__dots {
    column-gap: $space-2;
}

.safari__dot {
    font-size: r(7);
    color: rgba($color-foreground, $opacity-very-high)
}

.safari__sidebar-icon-sidebar {
    margin-inline-end: $space-2;
    padding-inline-end: $space-2;
    width: 55%;
    border-inline-end: $border-width-thin solid rgba($color-border, $opacity-low);
}

.safari__sidebar-icon-chevron {
    transform: rotate(90deg);
    font-size: $space-2 !important;
}

.safari__navigations {
    column-gap: $space-4;
}

.safari__navigation-icon-chevron {
    transform: rotate(180deg);
}

.safari__middle {
    display: flex;
    justify-content: center;
    width: 40%;
    padding: $space-2;
    padding-block: $space-1;
    border-radius: $border-radius-md;
    background-color: rgba($color-foreground, $opacity-very-low);
}

.spotlight__icon {
    margin-right: $space-1;
    color: rgba($color-foreground, $opacity-medium);
}

.spotlight__input {
    inline-size: auto;
    transition: inline-size $transition-duration-medium;

    &::placeholder {
        color: rgba($color-foreground, $opacity-low);
    }

    @include has-hover {
        cursor: revert;
    }
}

iframe {
    width: 100%;
    height: 100%;
    border: none;
}

.safari__navbar-icon {
    font-size: $space-5;
    color: rgba($color-foreground, $opacity-high);

    &--smaller {
        font-size: $space-4;
    }
}
</style>
