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

            <div class="safari__middle">
                <div class="safari__input">
                    <Icon
                        class="safari__input-icon"
                        name="magnifyingglass"
                    />
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

        <iframe
            src="https://nln.fyi"
            class="safari__iframe"
        />
    </Program>
</template>

<script setup lang="ts">
const safariNavbarRef: Ref<HTMLElement | undefined> = ref();
const safariLeftRef: Ref<HTMLElement | undefined> = ref();
const safariRightRef: Ref<HTMLElement | undefined> = ref();
</script>

<style lang="scss" scoped>
// Most websites don't allow accessing from iframes -> show my personal website.
// The only way to remove the white padding around iframe is to set the same background-color
// as my website to mask it.
// Then reapply white background to navbar separately.
.safari {
    border: 0;
    background-color: #232931; // from personal website!
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
    margin-inline: -$space-0;
    margin-block-start: -$space-0;
    padding-inline: $space-6;
    padding-block: $space-2;
    background-color: $color-white-100;
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

.safari__navbar-icon {
    font-size: $space-5;
    color: rgba($color-foreground, $opacity-high);

    &--smaller {
        font-size: $space-4;
    }
}

.safari__iframe {
    @include size(100%, 95.8%);
    border: 0;
}
</style>
