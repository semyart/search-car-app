<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { Car, CarItem } from '@/types/cars';
import { getCarData } from '@/api/cars';

const route = useRoute();
const carStore = useCarStore();

const inputValue = ref<string>("");
const carData = ref<CarItem[]>([]);
const showModal = ref<boolean>(false);
const pending = ref<boolean>(true);

onMounted(async () => {
    try {
        const { data } = await axios.request<CarItem[]>(getCarData(Number(route.params.id)));
        carData.value = data;
    } catch(e) {
        console.log(e);
        alert('Ошибка при получении данных');
    } finally {
        pending.value = false;
    }
})

const filteredArray = computed<CarItem[]>(() => {
    if (inputValue.value && carData.value.length) {
        const filtArr = carData.value.filter((car) => {
            if (Object.entries(car).some(([propertyName, propertyValue]) => propertyName !== 'id' && String(propertyValue).toLowerCase().includes(inputValue.value.toLowerCase()))) {
                return car;
            }
        });
        return filtArr;
    } else {
        return carData.value;
    }
})

function showCar(car: Car) {
    carStore.setCar(car);
    showModal.value = true;
}
</script>

<template>
    <div v-if="pending">
        Загрузка...
    </div>
    <div v-else class="search-page">
        <input class="search-page__input" v-model="inputValue" type="text" placeholder="Введите ключевое слово">

        <div v-if="!filteredArray.length" class="search-page__empty">
            Автомобили отсутствуют.
        </div>
        <div v-else>
            <div 
                class="search-page__list-mode-wrapper"                 
            >   
                <button
                    class="search-page__list-mode-btn"    
                    :class="{'disabled': !carStore.isListHoryzontal}"
                    @click="carStore.toggleListType()"
                >
                    <icon-base                                            
                        iconColor="#fff" 
                        width="18" 
                        height="18" 
                        icon-name="card-mode"
                    >
                        <icon-card-mode />
                    </icon-base>
                </button>
                <button
                    class="search-page__list-mode-btn"    
                    :class="{'disabled': carStore.isListHoryzontal}"
                    @click="carStore.toggleListType()"
                >
                    <icon-base
                        iconColor="#fff" 
                        width="18" 
                        height="18" 
                        icon-name="card-mode"
                    >
                        <icon-horyzontal-mode />
                    </icon-base>
                </button>
            </div>

            <ul 
                class="search-page__car-list" 
                :class="{'search-page__car-list_horyzontal': carStore.isListHoryzontal}"
            >
                <cars-item  
                    v-for="car in filteredArray"
                    :key="car.id"
                    :car-make="car.make"
                    :car-model="car.model"
                    :car-type="car.type"
                    :car-year="car.year"
                    @show-car="(car) => showCar(car)"
                >
                </cars-item>
            </ul>
        </div>

        <div class="search-page__pagination">            
            <NuxtLink 
                v-if="Number(route.params.id) > 1" 
                :to="`/cars/${Number(route.params.id) - 1}`"
            >
                <icon-base 
                    iconColor="#007bff" 
                    width="36" 
                    height="36" 
                    icon-name="arrow-left"
                >
                    <icon-arrow-left />
                </icon-base>
            </NuxtLink>

            <NuxtLink 
                :to="`/cars/${Number(route.params.id) + 1}`" 
                class="search-page__next-page"
            >
                <icon-base 
                    iconColor="#007bff" 
                    width="36" 
                    height="36" 
                    icon-name="arrow-right"
                >
                    <icon-arrow-right />
                </icon-base>
            </NuxtLink>
        </div>
    </div>
    <app-modal
      v-model="showModal"
      title="Автомобиль"
      @confirm="showModal = false"
    >
        <img class="app-modal__img" src="@/assets/img/auto.jpg" alt="">
        <span class="app-modal__text">Марка авто: {{ carStore.car?.carMake }} </span>
        <span class="app-modal__text">Модель: {{ carStore.car?.carModel }} </span>
        <span class="app-modal__text">Тип авто: {{ carStore.car?.carType }} </span>
        <span class="app-modal__text">Год: {{ carStore.car?.carYear }} </span>
    </app-modal>
</template>

<style lang="scss">
.search-page {
    padding: 10px 0;

    &__input {
        margin-bottom: 30px;
        padding: 6px;
        width: 100%;
        border: 1px solid $black;
        border-radius: 3px;
        font-size: 16px;
    }

    &__pagination {
        display: flex;
        justify-content: space-between;
    }

    &__next-page {
        margin-left: auto;
    }

    &__list-mode-wrapper {
        display: flex;
        justify-content: end;
        gap: 10px;
        margin-bottom: 20px;
        background: none;
        border: none;
    }

    &__list-mode-btn {
        padding: 5px;
        background-color: $blue;
        border: none;
        cursor: pointer;
    }

    &__empty {
        margin-bottom: 15px;
    }

    &__car-list {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>