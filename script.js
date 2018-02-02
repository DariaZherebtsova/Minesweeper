
console.log("Hi");
	var n = 4, m = 4;
	//создаем матрицу - игровое поле
	//заполняем нулями
	var mas = [];
	for (var i = 0; i < m; i++){
	    mas[i] = [];
	    for (var j = 0; j < n; j++){
	        mas[i][j] = 0;
	}}
	
	//раставляем бомбы
	mas[1][1] = 9;
	mas[2][2] = 9;
	
	// одномерный массив
	let mas_pole = [];
	
	//раставляем метки
	for (var i = 0; i < m; i++){
	    for (var j = 0; j < n; j++){
	        if (mas[i][j] > 8) {
				console.log(`bomb ${i},${j}`);
				//ставим +1 вокруг него
				mas[i-1][j-1] += 1;
				mas[i-1][j] += 1;
				mas[i-1][j+1] += 1;
				mas[i][j-1] += 1;
				//mas[i][j] += 1;
				mas[i][j+1] += 1;
				mas[i+1][j-1] += 1;
				mas[i+1][j] += 1;
				mas[i+1][j+1] += 1;
			}
			//делаем одномерный массив
	        //mas_pole.push( mas[i][j]);
	}}	
	console.log(mas);
	for (var i = 0; i < m; i++){
	    for (var j = 0; j < n; j++){
			mas_pole.push( mas[i][j]);
		}
	}	
    console.log(mas_pole);
let index = 0;
document.querySelectorAll('td').forEach (function(item,i) {	
	item.addEventListener( "click" ,  cell_click);
	item.addEventListener("contextmenu", cell_right_click);
	if  (mas_pole[index] == 1) {
		item.style.backgroundImage =  "url(1.png)";
	}
	
	if  (mas_pole[index] == 2) {
		item.style.backgroundImage =  "url(2.png)";
	}
	
	if  (mas_pole[index] > 8) {
		item.style.backgroundImage =  "url(index.jpeg)";
	}
	
	index++;
});

let num_open_cell = 0;

function cell_click() {
		console.log("Click");
		this.style.backgroundColor =  "#FFFFFF";
		console.log(this.textContent);
		if (this.textContent == "*") {
			alert ("Game over!");
			// открываем все
			openAllCell();
		}
		else {
			num_open_cell++;
			console.log(num_open_cell);
		}
		
		if (num_open_cell == 6) {
			alert ("You win!");
			// открываем все
			openAllCell();
		}
}

function cell_right_click(event) {	
	event.preventDefault();
	console.log("=cell_right_click=");
	//this.style.backgroundColor =  "#8B6914";
	this.style.backgroundImage =  "url(checkbox_no.png)";
	//background-image: url(images/bg.jpg);
	return false;
}

function openAllCell() {
	document.querySelectorAll('td').forEach (function(item,i) {	
				item.style.backgroundColor =  "#FFFFFF";
			});
}
