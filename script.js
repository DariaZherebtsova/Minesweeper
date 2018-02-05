//игра Сапер
//Жеребцова Дарья


	//создаем двумерный массив - игровое поле
	var n = 4, m = 4;	
	//заполняем нулями
	var field = [];
	for (var i = 0; i < m; i++){
	    field[i] = [];
	    for (var j = 0; j < n; j++){
	        field[i][j] = 0;
	}}
	
	//количество бомб
	let num_bombs = 2;
	//раставляем бомбы
	field[1][1] = 9;
	field[2][2] = 9;
	
	//cчетчик флажков
	let num_flags = 0;
	//счетчик правильно поставленных флажков 
	let num_luck_flags = 0;
	
	//раставляем метки
	for (var i = 0; i < m; i++){
	    for (var j = 0; j < n; j++){
			//ели бомба
	        if (field[i][j] > 8) {
				//ставим +1 вокруг него
				field[i-1][j-1] += 1;
				field[i-1][j] += 1;
				field[i-1][j+1] += 1;
				field[i][j-1] += 1;
				//field[i][j] += 1;
				field[i][j+1] += 1;
				field[i+1][j-1] += 1;
				field[i+1][j] += 1;
				field[i+1][j+1] += 1;
			}
	}}	
	
	// одномерный массив, чтобы было соответствие массиву <td>
	let arr_cells = [];
	for (var i = 0; i < m; i++){
	    for (var j = 0; j < n; j++){
			arr_cells.push( field[i][j]);
		}
	}	
	
	let index = 0;
	//задаем обработчики событий
	// и классы ячейкам для соответствия меткам
	document.querySelectorAll('td').forEach (function(item,i) {	
	item.addEventListener( "click" ,  cell_click);
	item.addEventListener("contextmenu", cell_right_click);

    if  (arr_cells[index] == 0) {
        item.className = "near0 close";
        //item.style.backgroundImage =  "url(1.png)";
    }

	if  (arr_cells[index] == 1) {
		item.className = "near1 close";
		//item.style.backgroundImage =  "url(1.png)";
	}
	
	if  (arr_cells[index] == 2) {
        item.className = "near2 close";
        //item.style.backgroundImage =  "url(2.png)";
    }

    if  (arr_cells[index] == 3) {
        item.className = "near3 close";
        //item.style.backgroundImage =  "url(2.png)";
    }
	
	if  (arr_cells[index] > 8) {
        item.className = "bomb close";
		//item.style.backgroundImage =  "url(index.jpeg)";
	}
	
	index++;
});

let num_open_cell = 0;

function cell_click() {
		//открываем
   		this.classList.toggle("close");
    	this.classList.toggle("open");

		if (this.classList.contains("bomb")) {			
			// открываем все
			openAllCell();
			//поражение
			document.querySelector('h1').style.visibility = "visible";
			document.querySelector('h2').style.visibility = "visible";
			//alert ("Game over!");
		}
		else {
			num_open_cell++;
		}
		//открыты все ячейки кроме бомб
		if (num_open_cell == 14) {
			//победа
			document.querySelector('h1').textContent = "Победа!";
			document.querySelector('h1').style.visibility = "visible";
			// открываем все
			openAllCell();
		}
}

//установить флажок
function cell_right_click(event) {	
	event.preventDefault();
	//если флажок уже есть, то снимаем
	if (this.classList.contains("setFlag")){
		this.classList.remove("setFlag");
		num_flags--;
		document.querySelector('#num_flags').textContent = num_flags;
		//проверяем что флажок на бомбе
		if (this.classList.contains("bomb")) {
			num_luck_flags--;
		}		
		return false;
	}
	
	//флажка небыло
	//число флажков меньше числа бомб
	if (num_flags < num_bombs) {
		//ставим флажок
		this.classList.add("setFlag");
		num_flags++;
		document.querySelector('#num_flags').textContent = num_flags;

		//проверяем что флажок на бомбе
		if (this.classList.contains("bomb")) {
			num_luck_flags++
			
			//если на все бомбы поставленны флажки
			if (num_luck_flags == num_bombs) {
				//победа
				document.querySelector('h1').textContent = "Победа!";
				document.querySelector('h1').style.visibility = "visible";
				// открываем все
				openAllCell();
			}
		}
	}
	return false;
}

function openAllCell() {
	document.querySelectorAll('td').forEach (function(item,i) {	
		if (!item.classList.contains("open")) {
			item.classList.add("open");
		}
		if (item.classList.contains("close")) {
			item.classList.remove("close");
		}
        
	});
}
