import { expect, test } from 'vitest';
import { calculateSpidersCount } from './ChartUtils';

test('spiders count should return 1', () => {
    
    const restaurants = [ {
        "foodItems": "leipä"
    } ];

    const spidersCount = calculateSpidersCount(restaurants);

    expect(spidersCount).toBe(1);

});

test('spiders count should return 0', () => {

    const restaurants = [ {} ];

    const spidersCount = calculateSpidersCount(restaurants);

    expect(spidersCount).toBe(0);

});