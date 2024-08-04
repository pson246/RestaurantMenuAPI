const calculateMenuAvailabilityCount = (restaurants) => {
    var menuAvailabilityCount = 0;
    for (const restaurant of restaurants) {    
        if (restaurant.menu) {
            menuAvailabilityCount++;
        }
    }
    return menuAvailabilityCount;
};

const calculateMenuAvailableAndUnavailablePercentage = (restaurantsCount, menuAvailabilityCount) => {
    const availablePercentage = Math.round((menuAvailabilityCount / restaurantsCount) * 100);    
    const unavailablePercentage = 100 - availablePercentage;
    return {
        "availablePercentage": availablePercentage,
        "unavailablePercentage": unavailablePercentage
    };
};

export {
    calculateMenuAvailabilityCount as calculateMenuAvailabilityCount,
    calculateMenuAvailabilityCount as calculateSpiderAvailableAndMissingPercentage
};
