import { expect, test } from 'vitest';
import { calculateMenuAvailabilityCount } from './PieChartUtils';

test('Menu availability count should return 1', () => {    
    const restaurants = [ {
        "menu": "leipä"
    } ];
    const menuAvailabilityCount = calculateMenuAvailabilityCount(restaurants);
    expect(menuAvailabilityCount).toBe(1);
});

test('Menu availability count should return 0', () => {
    var restaurants = [ {} ];
    var menuAvailabilityCount = calculateMenuAvailabilityCount(restaurants);
    expect(menuAvailabilityCount).toBe(0);
    restaurants = [ {
        "food": "items"
    } ];    
    menuAvailabilityCount = calculateMenuAvailabilityCount(restaurants);
    expect(menuAvailabilityCount).toBe(0);
    restaurants = [];    
    menuAvailabilityCount = calculateMenuAvailabilityCount(restaurants);
    expect(menuAvailabilityCount).toBe(0);
    restaurants = [
        { "food": "items1" },
        { "food": "items1" }
    ];
    menuAvailabilityCount = calculateMenuAvailabilityCount(restaurants);
    expect(menuAvailabilityCount).toBe(0);
});