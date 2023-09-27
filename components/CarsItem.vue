<script setup lang="ts">

interface Car {
    carMake: string;
    carModel: string;
    carType: string;
    carYear: number;
}

defineProps<Car>();

const emit = defineEmits<{
    showCar: [car: Car];
}>()

function showCar(car: Car) {
    emit('showCar', car);
}
</script>

<template>
    <li class="cars__list-item">
        <span class="cars__text">Марка авто: {{ carMake }} </span>
        <span class="cars__text">Модель: {{ carModel }} </span>
        <span class="cars__text">Тип авто: {{ carType }} </span>
        <span class="cars__text">Год: {{ carYear }} </span>
        <button @click="showCar({carMake, carModel, carType, carYear})">
            Открыть
        </button>
    </li>
    
</template>

<style lang="scss">
.cars {
    &__list-item {
        display: flex;
        flex-direction: column;
        flex: 0 0 calc(290/1340 * 100%);
        margin-right: calc(60/1340 * 100%);
        margin-bottom: 30px;
        padding: 10px;
        min-height: 300px;
        outline: 1px solid red;

        &:nth-child(4n+4) {
            margin-right: 0;
        }
    }

    &__text {
        display: inline-block;
        margin-bottom: 10px;
        font-size: 16px;
    }
}

.search-page__car-list_horyzontal {
    flex-direction: column;

    .cars__list-item {
        margin-right: 0;
        min-height: auto;
    }
}
</style>