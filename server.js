const express = require('express');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;
//instantiate the server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

//filter functionality
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    //save animalsArray as filteredResults
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        //save personalityTraits as dedicated array
        // if PT is string, place into new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        //loop through each trait in the PT array:
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remember, it is initially a copy of the animalsArray, but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults array will then contain only the entries that contain the trait,
            // so at the end we'll have an array of animals that have every one of the traits when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
};

//function to find animal by ID
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
};

//function to add new animal to json file
function createNewAnimal(body, animalsArray) {
    console.log(body);
    //function main code here

    //return finished code to post route for response
    return body;
};

//route front end can request data from (GET)
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    // console.log(req.query)
    res.json(results);
});

//route to GET animal by id
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

//routes http POST request
app.post('/api/animals', (req, res) => {
    //req.body is where our incoming content will be
    // console.log(req.body);
    
    //set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    //res.json() sends the data back to the client
    res.json(req.body);
});

//tell it to listen for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});