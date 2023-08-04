<template>
    <Program
        :draggable-elements="[calculatorNavbarRef, calculatorResultsRef]"
        horizontal-resize-only
        vertical-resize-only
        class="calculator"
    >
        <div
            ref="calculatorNavbarRef"
            class="calculator__navbar"
        >
            <ProgramDots program-name="calculator" />
        </div>

        <div
            ref="calculatorResultsRef"
            class="calculator__results"
        >
            {{ result() }}
        </div>

        <div class="calculator__buttons">
            <div 
                v-for="(button, index) in buttons"
                :key="index"
                class="calculator__button"
                @click="registerButton(button)"
            >
                {{ button }}
            </div>
        </div>
    </Program>
</template>

<script setup lang="ts">
const buttons = ['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', ',', '='];

const calculatorNavbarRef: Ref<HTMLElement | undefined> = ref();
const calculatorResultsRef: Ref<HTMLElement | undefined> = ref();

function registerButton(button: string): void {
}

function result(): string {
    return '0';
}
</script>

<style lang="scss" scoped>
.calculator {
    @include size(r(235), r(325));
    display: flex;
    flex-direction: column;
    backdrop-filter: $blur-2xl;
    background-color: rgba($color-foreground, 0.55);
}

.calculator__navbar {
    display: flex;
    padding: $space-2;
}

.calculator__results {
    margin-inline: $space-3;
    margin-block-start: $space-3;
    margin-block-end: $space-6;
    text-align: right;
    font-size: $space-12;
    font-weight: $font-weight-light;
    color: $color-background;
}

.calculator__buttons {
    block-size: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: $border-width-thin;
}

.calculator__button {
    display: grid;
    place-items: center;
    font-size: $space-6;
    color: $color-background;
    background-color: rgba($color-background, 0.3);

    &:nth-child(17) {
        grid-column: span 2;
    }

    &:nth-child(-n + 3) {
        font-size: $space-5;
        background-color: rgba($color-background, 0.1);
    }

    &:nth-child(4n),
    &:last-child {
        font-size: $space-7;
        background-color: $color-orange;
    }
}
</style>
