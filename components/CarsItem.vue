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
        <img src="@/assets/img/auto.jpg" alt="" class="cars__item-img">
        <div class="cars__item-body">
            <div class="cars__item-info">
                <span class="cars__item-text">Марка авто: {{ carMake }} </span>
                <span class="cars__item-text">Модель: {{ carModel }} </span>
                <span class="cars__item-text">Тип авто: {{ carType }} </span>
                <span class="cars__item-text">Год: {{ carYear }} </span>
            </div>
            <button class="cars__item-btn" @click="showCar({carMake, carModel, carType, carYear})">
                Открыть
            </button>
        </div>
    </li>
    
</template>

<style lang="scss">
.cars {
    &__list-item {
        display: flex;
        flex-direction: column;
        flex: 0 0 calc(420/1340 * 100%);
        margin-right: calc(40/1340 * 100%);
        margin-bottom: 30px;

        &:nth-child(3n+3) {
            margin-right: 0;
        }
    }

    &__item-img {
        width: 100%;
        height: 300px;
        object-fit: cover;

        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    &__item-text {
        display: inline-block;
        margin-bottom: 15px;
        font-size: 18px;
    }

    &__item-body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px;

        border-right: 1px solid rgba(0,0,0,.125);
        border-bottom: 1px solid rgba(0,0,0,.125);
        border-left: 1px solid rgba(0,0,0,.125);
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    &__item-info {
        display: flex;
        flex-direction: column;
    }

    &__item-btn {
        display: inline-block;
        padding: 10px 5px;
        background-color: $blue;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        color: $white;
        cursor: pointer;
    }
}

.search-page__car-list_horyzontal {
    flex-direction: column;

    .cars {
        &__list-item {
            flex-direction: row;
            padding: 10px;
            margin-right: 0;
            min-height: auto;
            border: 1px solid rgba(0, 0, 0, .125);
        }

        &__item-img {
            width: auto;
            height: 200px;
            border-radius: 0;
        }

        &__item-body {
            padding: 0 20px;
            width: 100%;
            border: none;
        }

        &__item-btn {
            width: 15%;
        }
    }
}
</style>