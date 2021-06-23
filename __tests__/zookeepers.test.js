const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers');

jest.mock('fs');

test('creates zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        { name: 'Dalinar', id: 'Uruthiru' },
        zookeepers
    );

    expect(zookeeper.name).toBe('Dalinar');
    expect(zookeeper.id).toBe('Uruthiru');
});

test('filters by query', () => {
    const startingZookeepers = [
        {
            id: "0",
            name: "Kim",
            age: 28,
            favoriteAnimal: "dolphin"
        },
        {
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
        },
    ];

    const updatedZookeepers = filterByQuery({ age: 28 }, startingZookeepers);
    
    expect(updatedZookeepers.length).toEqual(1);
});

test('finds by id', () => {
    const startingZookeepers = [
        {
            id: "0",
            name: "Kim",
            age: 28,
            favoriteAnimal: "dolphin"
        },
        {
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
        },
    ];

    const result = findById('1', startingZookeepers);

    expect(result.name).toBe('Raksha');
});

test('validates age', () => {
    const zookeeper = {
        id: '4',
        name: 'Kaladin',
        age: 21,
        favoriteAnimal: 'Sylphrena',
    };

    const invalidZookeeper = {
        id: '4',
        name: 'Kaladin', 
        age: '32', //quotes make it invalid
        favoriteAnimal: 'Sylphrena'
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});