import { defineStore } from 'pinia';
import { Car } from '../types/cars';

export const useCarStore = defineStore('car', () => {
    const car = ref<Car>();
    const isListHoryzontal = ref<boolean>(false);
    
    function setCar(data: Car) {
        car.value = data;
    }

    function toggleListType() {        
        isListHoryzontal.value = !isListHoryzontal.value;
    }

    return {car, isListHoryzontal, setCar, toggleListType};
});