'use strict';

const cars = ["honda","ford","fonda","hoard","horse"];

const carsInReverse = (arr1) => {
    arr1.reverse().forEach(car => {
        console.log(car)
    });
}

carsInReverse(cars);

cars.forEach(car => {
    console.log(car)
});

const persons = {
    firstName: "Jane",
    lastName: "Doe",
    birthDate: "Jan 5, 1925",
    gender: "female",
}

const printPersonalDataKeys = (obj1) => {
    for (const personalData in obj1){
        console.log(personalData);
    }
}

printPersonalDataKeys(persons);

const printPersonBirthday = (obj1) => {
    for (const personalData in obj1){
        if(personalData=="birthDate") return console.log(obj1[personalData]);
    }
}

printPersonBirthday(persons);

const countForLoop = ()=>{
    for(let i = 1; i<1001;i++){
        console.log(i)
    }
}

const countWhileLoop = () => {
    let counter = 1;
    while(counter<1001){
        console.log(counter);
        counter++;
    }
}

const countDoWhileLoop = () => {
    let counter = 1;
    do {
        console.log(counter);
        counter++;
    } while (counter<1001)
}

// When is a for loop better than a while loop?
// How is the readability of the code affected?
// What is the difference between a for loop and a for...in loop?
// What is the difference between a while loop and a do...while loop?

countForLoop();
countWhileLoop();
countDoWhileLoop();