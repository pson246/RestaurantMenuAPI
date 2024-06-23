const calculateSpidersCount = (restaurants) => {

    var spidersCount = 0;

    for (const restaurant of restaurants) {
    
        if (restaurant.foodItems) {

            spidersCount++;

        }

    }

    return spidersCount;

};

export { calculateSpidersCount };
