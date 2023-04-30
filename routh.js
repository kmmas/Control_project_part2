let coefficients =[]
let sum = 0
let stable = true

function myFunction() {
    AnsClear()
    equation = document.getElementById("input").value;
    // Remove all white spaces from the equation string
    coefficients = getCoefficients(equation);
    let matrix = routh_alg(coefficients)
    console.log(matrix);
    checkStability(matrix);
    let ssss=[]
    for(let i=matrix.length-1;i>=0;i--){
        ssss.push("S^"+i)
    }
    const table2 = document.getElementById("NameTable");

    // Loop through the vector and create a row with a cell for each element
    for (let i = 0; i < ssss.length; i++) {
        const row = table2.insertRow();
        const cell = row.insertCell();
        cell.innerText = ssss[i];
    }
    var table = document.getElementById("matrixTable");
    for (var i = 0; i < matrix.length; i++) {
      var row = table.insertRow(i);
    
      for (var j = 0; j < matrix[i].length; j++) {
        var cell = row.insertCell(j);
        cell.innerHTML = matrix[i][j];
      }
    }
    var answer = document.getElementById("stable");
    var num = document.getElementById("num");
    answer.innerHTML = "stable ? "+ stable
    if(stable == false){
        num.innerHTML = "Number of poles in RHS : "+ sum
    }
}
function getCoefficients(equation) {
    let parts = equation.split(/(?=[+-])/);
    let newArr = parts.map(str => str.replace(/\s+/g, ""));
    newArr = newArr.map(str => str.replace(/\+/g, ''));
    if(newArr[0].charAt(newArr[0].length-1) == 's'){
        size = 2;
    }else if(!newArr[0].includes('s')){
        size = 1;
        console.log("iam here")
    }else{
        size = parseInt(newArr[0].charAt(newArr[0].length-1))+1
    }
    let coeff = new Array(size).fill(0);
    // console.log(coeff)    
    for(let i =0 ; i<newArr.length ; i++){
        let parts = []
        let match = newArr[i].match(/s\^(\d+)/);
        if (match) {
            let value = parseInt(match[1]);
             parts = newArr[i].split("s");
            if(parts[0]==""){
                parts[0]="1"
            }
            coeff[value]=parseInt(parts[0])
        }else{
            if(newArr[i].includes('s')){
                 parts = newArr[i].split("s");
                if(parts[0]==""){
                    parts[0]="1"
                }
                coeff[1]=parseInt(parts[0])
            }else{
                coeff[0]=parseInt(newArr[i])
            }
        }

    }return coeff;
  }
    let martrix = []
    let rows = []
    function routh_alg(coefficients){
            let k=coefficients.length-1
            for(let j =0  ; j< Math.floor((coefficients.length+1)/2); j++){
                rows.push(coefficients[k])
                k=k-2;
            }
            martrix.push(rows)
            rows=[]
            k=coefficients.length-2
            for(let j =0  ; j< Math.floor((coefficients.length+1)/2); j++){
                if(coefficients.length%2 !=0 && k ==-1){
                    rows.push(0)
                }else{
                    rows.push(coefficients[k])
                }
                k=k-2;
            }
            martrix.push(rows)
            rows =[]
            for(let i =0 ; i<coefficients.length-2 ; i++){
                let k=i
                for(let j =0 ; j<martrix[0].length ; j++){
                    if((martrix[i][j+1] ==0 && martrix[i+1][j+1] ==0) || j+1 == martrix[i].length ){
                        rows.push(0)
                    }else{
                        if(martrix[k+1][0]==0 && martrix[k][0]>0){
                            martrix[k+1][0]=0.0001
                        }if(martrix[k+1][0]==0 && martrix[k][0]<0){
                            martrix[k+1][0]=-0.0001
                        }
                        rows.push((martrix[k+1][0]*martrix[i][j+1]-martrix[k][0]*martrix[i+1][j+1])/martrix[k+1][0])
                    }
                }
                martrix.push(rows)
                rows= []
            }
            return martrix

    } 
    function checkStability(matrix){
        for(let i = 1 ; i <matrix.length;i++){
                if(Math.sign(matrix[i][0])!=Math.sign(matrix[i-1][0])){
                    sum = sum+1;
                }
        }
        if(sum==0){
            stable = true
            console.log("Stable ? " + stable)
        }else{
            stable = false
            console.log("Stable ? " + stable)
            console.log("number of poles on RHS = " + sum)
        }
    }  
    function Clear(){
        document.getElementById("NameTable").innerHTML = "";
        document.getElementById("matrixTable").innerHTML = "";
        document.getElementById("stable").innerHTML = "";
        document.getElementById("num").innerHTML = "";
        document.getElementById("input").value = "";
        martrix=[]
        rows = []
        coefficients =[]
        sum = 0
        stable = true
    }
    function AnsClear(){
        document.getElementById("NameTable").innerHTML = "";
        document.getElementById("matrixTable").innerHTML = "";
        document.getElementById("stable").innerHTML = "";
        document.getElementById("num").innerHTML = "";
        martrix=[]
        rows = []
        coefficients =[]
        sum = 0
        stable = true
    }