const inputRange = document.querySelector('#input-range')
const inputRangeValue = document.querySelector('#input-range-value')
const containerInput = document.querySelector('#input')
const alert = document.querySelector('#alert')
const btn = document.querySelector('#calc')
const output = document.querySelector('#output')
var numbers = []
var index = 0

inputRange.addEventListener('input', ()=>{
    index = inputRange.value
    inputRangeValue.innerHTML = index
    addInput()
})
btn.addEventListener('click', ()=>{
    if(index == 0 || index == 1){
        getAlert(true)      
    }else{
        getAlert(false)
        getData()

    }
})

const getData = ()=>{
    const inputs = containerInput.getElementsByTagName('input')
    clearNumbers()
    for(var i = 0; i < inputs.length; i++){
        if(inputs[i].value == ''){
            inputs[i].value = 0
        }
        numbers.push(inputs[i].value)
    }
    const promedio = getPromedio()
    outputData()

}

const outputData = () =>{
    const prototype = `
        <span>Promedio: <b>${getPromedio()}</b></span>
        <span>Mediana: <b>${getMediana()}</b></span>

    `
    output.innerHTML = prototype
}

const getPromedio = ()=>{
    var sum = 0 
    for(var i = 0; i < numbers.length; i++){
        sum += parseFloat(numbers[i])
    }
    return sum/numbers.length
}

const getMediana = () =>{
    var prototype = [...numbers]
    prototype.sort(function(a,b){return a - b})

    if(prototype.length % 2 === 0){
        var x = prototype[prototype.length / 2 - 1]
        var y = prototype[prototype.length / 2]
        return (x + y) / 2
    }
    else{
        return prototype[Math.floor(prototype.length / 2)];

    }

}

const getAlert = (mode) =>{
    if(mode){
        alert.innerHTML = 'No Data'  
    }else{
        alert.innerHTML = ''
    }
}

const clearContinerInput = ()=>{
    containerInput.innerHTML = ''
}

const clearNumbers = ()=>{
    numbers = []
}

const addInput = ()=>{
    clearContinerInput()
    for(let i = 0; i<index; i++){
        const input = document.createElement('input')
        input.setAttribute('type', 'number')
        input.classList.add('input-number')
        containerInput.appendChild(input)
    }
}

inputRange.value = index
