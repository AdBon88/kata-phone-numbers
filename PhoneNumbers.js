
//execution
const dataSet = readDataSetFromFile('phone_data.txt')
const phoneNumberArray = extractPhoneNumbers(dataSet, []);
console.log(isConsistent(phoneNumberArray));
//end execution

function readDataSetFromFile(path) {
    const fs = require('fs');
    const data = fs.readFileSync(path);
    const string = data.toString().replace(/\r\n/g,'\n');
    return string.split("\n");
}

function extractPhoneNumbers(currentDataSet, currentPhoneNumberArray){
    const lastIndex = currentDataSet.length - 1;
    const nameAndNumberString = currentDataSet[lastIndex];
    const nameAndNumberArray = nameAndNumberString.split(",");
    const phoneNumberString = nameAndNumberArray[1].replace(/[ -]/g, '');
    const newPhoneNumberArray = Array.from(currentPhoneNumberArray);
    newPhoneNumberArray.push(phoneNumberString);

    const remainingDataSet = Array.from(currentDataSet);
    remainingDataSet.pop()
    if(remainingDataSet.length === 1) {
        return newPhoneNumberArray;
    }
    return extractPhoneNumbers(remainingDataSet, newPhoneNumberArray);
}

function isConsistent(phoneNumberArray, currentIndex, comparativeIndex){

    if (currentIndex == null) {
        currentIndex = 0;
        comparativeIndex = 1;
    }

    if(phoneNumberArray[currentIndex].includes(phoneNumberArray[comparativeIndex]) && currentIndex != comparativeIndex){
        return false;
    }
    if (comparativeIndex != phoneNumberArray.length - 1){
        return isConsistent(phoneNumberArray, currentIndex, comparativeIndex + 1)
    }
    if (currentIndex != phoneNumberArray.length - 1) {
        return  isConsistent(phoneNumberArray, currentIndex + 1, 0)
    }

    return true;
}


// function isConsistent(phoneNumberArray) {
//     return true;
// }
//
//
// const catArray = ["Bob", "Trudy", "Alice"];
//
// console.log(test(catArray))