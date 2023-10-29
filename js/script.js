const inputRange = document.querySelector('#input-range')
const inputRangeValue = document.querySelector('#input-range-value')
const containerInput = document.querySelector('#input')
const alert = document.querySelector('#alert')
const btn = document.querySelector('#calc')
const output = document.querySelector('#output')
const graph = document.querySelector('#graph')
const graphColor = document.querySelector('#color')
const graphType = document.querySelector('#type')
const btnDownload = document.querySelector('#download')
var Graph
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
    outputData()

}

const outputData = () =>{
    const prototype = `
        <span>Promedio: <b>${getPromedio()}</b></span>
        <span>Mediana: <b>${getMediana()}</b></span>
        <span>Moda: <b>${getModa()}</b></span>

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
        var x = parseFloat(prototype[(prototype.length / 2) - 1])
        var y = parseFloat(prototype[prototype.length / 2])
        
        return (x + y) / 2
    }
    else{
        return prototype[Math.floor(prototype.length / 2)];

    }
}

getModa = () => {
    var prototype = [...numbers]
    prototype.sort(function(a,b){return a - b})
    //elemntos 
    let x = []
    //cantidad de veces que se repiten 
    let y = []
    let contador = 1
    for (let i = 0; i < prototype.length; i++){
        if(prototype[i + 1] === prototype[i]){
            contador ++    
        }else{
            x.push(prototype[i])
            y.push(contador)
            contador = 1
        }
    }

    var moda = []
    var max = Math.max(...y)
    console.log(max)
    for(let i = 0; i < y.length; i ++){
        if(y[i] == max)
        moda.push(x[i])
    }
    
    getGraph(x , y)
    return moda   
}

const getGraph = (items, frequency) =>{
    const datos = {
        labels: items,
        datasets: [{
            label: 'Frecuencia',
            data: frequency, 
            backgroundColor: graphColor.value, // Color de las barras
            borderWidth: 1 // Ancho del borde
        }]
    }
    const opciones = {
        scales: {
            y: {    
                beginAtZero: true
            }
        }
    };
    
    
    if(Graph){
        Graph.destroy()
    }

    Graph = new Chart(graph,{
        type: graphType.value,
        data: datos,
        options: opciones
    }) 
}

btnDownload.addEventListener('click', ()=>{
    if(Graph){
        const a = document.createElement('a')
        a.href = graph.toDataURL("image/png")
        a.download = 'grafica.png'

        a.click()
    }
})

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
