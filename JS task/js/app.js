let direction = document.getElementById("route").value; 
let timeValue = document.getElementById("time").value; 
let timeOptions = document.getElementById("time").options; 
let timeSelect = document.getElementById("time");
let ABALabel= document.getElementById("time-back-label");
let ABASelect= document.getElementById("time-back");
let ABAOptions;
let arrABA;
let arrBA1;
let arrBA2;
let arrBA345;
let arrBA6;

let ticketsNumber = document.getElementById("num").value;
let result= document.getElementById("result");
const oneWayCost = 700;
const bothWayCost = 1200;
const durationTime = 50;


let arrAB = [
    {text:'18:00(из A в B)',value:'18:00(из A в B)'},
    {text:'18:30(из A в B)',value:'18:30(из A в B)'}, 
    {text:'18:45(из A в B)',value:'18:45(из A в B)'}, 
    {text:'19:00(из A в B)',value:'19:00(из A в B)'}, 
    {text:'19:15(из A в B)',value:'19:15(из A в B)'}, 
    {text:'21:00(из A в B)',value:'21:00(из A в B)'}
];
let arrBA= [
    {text:'18:30(из B в A)',value:'18:30(из B в A)'}, 
    {text:'18:45(из B в A)',value:'18:45(из B в A)'}, 
    {text:'19:00(из B в A)',value:'19:00(из B в A)'},
    {text:'19:15(из B в A)',value:'19:15(из B в A)'}, 
    {text:'19:35(из B в A)',value:'19:35(из B в A)'}, 
    {text:'21:50(из B в A)',value:'21:50(из B в A)'}, 
    {text:'21:55(из B в A)',value:'21:55(из B в A)'}
];

document.getElementById("time").innerHTML="";
arrAB.forEach(option=>timeOptions.add(new Option(option.text, option.value)));


//получаем массив времени обратных рейсов
function getBackArr(){
    timeValue = document.getElementById("time").value; 
    console.log(direction);
    console.log(ABASelect.value);
    if (ABASelect.value == ''){
        console.log("inside: " + timeValue);
        if(timeValue === arrAB[0].value){  
            ABASelect.options.length = 0;
            arrBA1 = arrBA.slice(2)         
            arrBA1.forEach(option=>ABASelect.options.add(new Option(option.text, option.value)));  
        } else if (timeValue === arrAB[1].value){
            ABASelect.options.length = 0;      
            arrBA2 = arrBA.slice(4)
            arrBA2.forEach(option=>ABASelect.options.add(new Option(option.text, option.value)));
        } else if(timeValue === arrAB[2].value || timeValue === arrAB[3].value || timeValue === arrAB[4].value){
            ABASelect.options.length = 0;      
            arrBA345 = arrBA.slice(5)
            arrBA345.forEach(option=>ABASelect.options.add(new Option(option.text, option.value)));
        } else { 
            ABASelect.options.length = 0;    
            arrBA6 = arrBA.slice(6) 
            arrBA6.forEach(option=>ABASelect.options.add(new Option(option.text, option.value)));
        }
    }
} 

//Загружаем лист/листы со временем в зависимости от выбранного направления
function loadTimeList(){
    direction = document.getElementById("route").value;
    if (direction === "AB"){
        
        document.getElementById("time").innerHTML="";
        arrAB.forEach(option=>timeOptions.add(new Option(option.text, option.value)));
        ABALabel.style.display = 'none';
        ABASelect.style.display = 'none';    
        timeValue = document.getElementById("time").value;
            
    } else if (direction === "BA"){
        document.getElementById("time").innerHTML="";
        arrBA.forEach(option=>timeOptions.add(new Option(option.text, option.value)));
        ABALabel.style.display = 'none';
        ABASelect.style.display = 'none';
        timeValue = document.getElementById("time").value;
    
    } else{
        document.getElementById("time").innerHTML="";
        arrAB.forEach(option=>timeOptions.add(new Option(option.text, option.value)));     
        ABALabel = document.getElementById('time-back-label');
        getBackArr();          
        ABALabel.style.display = 'inline';
        ABASelect.style.display = 'inline';     
    }
    
}

function getCurrentInput(){
    ticketsNumber = document.getElementById("num").value;
}

function showResult(){
    direction = document.getElementById("route").value;
    result.style.display = "block";
     
    getCurrentInput();
    let res = timeValue.split('(')[0];
    let numbersArray = res.split(':');
    let hours = parseInt(numbersArray[0]);
    let minutes = parseInt(numbersArray[1]);
    let convertedTime = hours * 60 + minutes + 50;
    let resultHour = Math.floor(convertedTime / 60);
    let resultMinute = convertedTime % 60;
    if (direction === "ABA"){ 
        console.log(ABASelect.value);
        let res2 = ABASelect.value.split('(')[0];
        let numbersArray2 = res2.split(':');
        let hours2 = parseInt(numbersArray2[0]);
        let minutes2 = parseInt(numbersArray2[1]);
        let convertedTime2 = hours2 * 60 + minutes2 + 50;
        let resultHour2 = Math.floor(convertedTime2 / 60);
        let resultMinute2 = convertedTime2 % 60;
        result.textContent = `Выбрано: кол-во билетов: ${num.value} ,  маршрут : ${direction} , 
        cтоимость: ${direction == 'AB' || direction == 'BA'? (oneWayCost*ticketsNumber): (bothWayCost*ticketsNumber)}
        Время в пути займет у вас ${direction == 'AB' || direction == 'BA'? durationTime: durationTime*2} минут. 
        Теплоход отправляется в ${numbersArray[0]}:${numbersArray[1]}, а вернется в ${resultHour2}:${resultMinute2}`       
    } else {
        result.textContent = `Выбрано: кол-во билетов: ${num.value} ,  маршрут : ${direction} , 
        cтоимость: ${direction == 'AB' || direction == 'BA'? (oneWayCost*ticketsNumber): (bothWayCost*ticketsNumber)}
        Время в пути займет у вас ${direction == 'AB' || direction == 'BA'? durationTime: durationTime*2} минут. 
        Теплоход отправляется в ${numbersArray[0]}:${numbersArray[1]}`
    }
    
}

