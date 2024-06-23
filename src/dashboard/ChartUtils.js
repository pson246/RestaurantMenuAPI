const calculateSpidersCount = (restaurants) => {

    var spidersCount = 0;

    for (const restaurant of restaurants) {
    
        if (restaurant.foodItems) {

            spidersCount++;

        }

    }

    return spidersCount;

};

const calculateSpiderAvailableAndMissingPercentage = (restaurantsCount, restaurantSpidersCount) => {

    const availablePercentage = Math.round((restaurantSpidersCount / restaurantsCount) * 100);    
    const missingPercentage = 100 - availablePercentage;

    return {
        "availablePercentage": availablePercentage,
        "missingPercentage": missingPercentage
    };    

};

export { calculateSpidersCount, calculateSpiderAvailableAndMissingPercentage };
