<template>
    <Teleport
        v-if="isMounted"
        to="#dock-minimized-calculator"
        :disabled="!globalStore.isProgramMinimized('calculator')"
    >
        <Program
            :draggable-elements="[calculatorNavbarRef, calculatorResultRef]"
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
                ref="calculatorResultRef"
                class="calculator__result"
                :title="result"
            >
                &#x200E;
                {{ result }}
                &#x200E;
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
    </Teleport>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~/store/global';

const globalStore = useGlobalStore();

const buttons = ['C', '±', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];

const calculatorNavbarRef: Ref<HTMLElement | undefined> = ref();
const calculatorResultRef: Ref<HTMLElement | undefined> = ref();
const result = ref('0');
const evaluation = ref('');

const isMounted = ref(false);

function registerButton(button: string): void {
    if (button === '=') {
        result.value = eval(evaluation.value).toString();
        evaluation.value = result.value;
        return;
    }

    if (button === 'C') {
        result.value = '0';
        evaluation.value = '';
        return;
    }

    if (button === '±') {
        result.value = (parseFloat(result.value) * -1).toString();
        evaluation.value = result.value;
        return;
    }

    if (button === '%') {
        result.value = (parseFloat(result.value) / 100).toString();
        evaluation.value = result.value;
        return;
    }

    if (button === '.' && !result.value.includes('.')) {
        result.value += '.';
        evaluation.value += '.';
        return;
    }

    if (/\d/.test(button)) {
        if (result.value === '0' || /[-+/*]/.test(evaluation.value.slice(-1))) {
            result.value = button;
        } else {
            result.value += button;
        }

        evaluation.value += button;
        return;
    }

    if (/[-+/*]/.test(button)) {
        if (result.value === '0') {
            return;
        }

        if (/[-+/*]/.test(evaluation.value.slice(-1))) {
            evaluation.value = evaluation.value.slice(0, -1) + button;
        } else {
            try {
                result.value = eval(evaluation.value);
                evaluation.value = result.value;
            } finally {
                evaluation.value += button;
            }
        }
    }
}

onMounted(() => {
    nextTick(() => {
        isMounted.value = true;
    });
});
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

.calculator__result {
    padding-inline: $space-2;
    padding-block-start: $space-3;
    padding-block-end: $space-6;
    overflow: hidden;
    direction: rtl;
    text-align: right;
    text-overflow: ellipsis;
    font-size: $space-10;
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

    &:active {
        background-color: rgba($color-background, $opacity-high);
    }

    &:nth-child(-n + 3) {
        font-size: $space-5;
        background-color: rgba($color-background, 0.1);

        &:active {
            background-color: rgba($color-background, 0.3);
        }
    }

    &:nth-child(4n),
    &:last-child {
        font-size: $space-7;
        background-color: $color-orange;

        &:active {
            filter: brightness(0.8);
        }
    }

    &:nth-child(17) {
        grid-column: span 2;
    }
}
</style>
