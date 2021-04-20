import { priceConfig, totalMultiplier } from './priceConfig.js';

const pricing = {
    
    selectedSize: "",
    setSize(size) {
        this.selectedSize = size;
    },

    frequency: "",

    setFrequency(frequency) {
        this.frequency = frequency;
    },
    
    // get option prices to be displayed in the subscription form
    getWeeklyPrice() {
        return priceConfig[this.selectedSize]["every week"];
    },
    getBiweeklyPrice() {
        return priceConfig[this.selectedSize]["every 2 weeks"];
    },
    getMonthlyPrice() {
        return priceConfig[this.selectedSize]["every month"];
    },
    getTotal() {
        return priceConfig[this.selectedSize][this.frequency] * totalMultiplier[this.frequency];
    }
}

export default pricing;