import { expect, test } from 'vitest';
import { calculateSpidersCount } from './ChartUtils';

test('spiders count should return 1', () => {    
    const restaurants = [ {
        "menu": "leipä"
    } ];
    const spidersCount = calculateSpidersCount(restaurants);
    expect(spidersCount).toBe(1);
});

test('spiders count should return 0', () => {
    var restaurants = [ {} ];
    var spidersCount = calculateSpidersCount(restaurants);
    expect(spidersCount).toBe(0);
    restaurants = [ {
        "food": "items"
    } ];    
    spidersCount = calculateSpidersCount(restaurants);
    expect(spidersCount).toBe(0);
    restaurants = [];    
    spidersCount = calculateSpidersCount(restaurants);
    expect(spidersCount).toBe(0);
    restaurants = [
        { "food": "items1" },
        { "food": "items1" }
    ];
    spidersCount = calculateSpidersCount(restaurants);
    expect(spidersCount).toBe(0);
});