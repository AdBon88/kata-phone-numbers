const fs = require('fs');

//execution
var counter = 0;
const dataSet = readDataSetFromFile('phone_data_10000.txt')

//const NameAndNumbersArray = splitNameAndNumbers(dataSet, []);
const phoneNumbersArray = extractPhoneNumbers(dataSet, []);
if(isConsistent(phoneNumbersArray)){
   console.log('The phone numbers are consistent!')
} else {
   console.log('The phone numbers are NOT consistent!')
}
//end execution

function readDataSetFromFile(path) {
    const dataSet = fs.readFileSync(path);
    return dataSet.toString().replace(/\r\n/g,'\n').split("\n");
}


function extractPhoneNumbers(currentDataSet, currentPhoneNumbersArray) {
    counter++;
    console.log(counter);

    const nameAndNumberString = currentDataSet[currentDataSet.length - 1];

    if(nameAndNumberString === ''){ //last line is blank, want to remove and skip this)
        const remainingDataSet = currentDataSet.slice(0,currentDataSet.length - 1)
        return extractPhoneNumbers(remainingDataSet, currentPhoneNumbersArray);
    }

    const phoneNumber = nameAndNumberString.substring(nameAndNumberString.indexOf(",") + 1, nameAndNumberString.indexOf("\n") - 1);
    const newPhoneNumbersArray = [phoneNumber, ...currentPhoneNumbersArray];

    if(currentDataSet.length === 2) {
        return newPhoneNumbersArray;
    }

    const remainingDataSet = currentDataSet.slice(0,currentDataSet.length - 1)
    return extractPhoneNumbers(remainingDataSet, newPhoneNumbersArray);
}


function extractPhoneNumbersOLD(currentNameAndNumbersArray, currentPhoneNumbersArray){

    const phoneNumberString = currentNameAndNumbersArray[0][1].replace(/[ -]/g, '');
    const newPhoneNumberArray = [phoneNumberString, ...currentPhoneNumbersArray];
    if(currentNameAndNumbersArray.length === 2) {
        return newPhoneNumberArray;
    }

    const remainingNameAndNumbersArray = currentNameAndNumbersArray.slice(1,currentNameAndNumbersArray.length)
    return extractPhoneNumbers(remainingNameAndNumbersArray, newPhoneNumberArray);
}

function isConsistent(phoneNumberArray){

    if( phoneNumberArray[0].includes(phoneNumberArray[1]) || phoneNumberArray[1].includes(phoneNumberArray[0]) ){
        return false;
    }

    if (phoneNumberArray.length > 2 ) {
        const remainingPhoneNumberArray = phoneNumberArray.slice(1,phoneNumberArray.length)
        return isConsistent(remainingPhoneNumberArray)
    }
    return true;
}

