//игра Сапер
//Жеребцова Дарья
"use_strict"

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
	let num_bombs = 4;
    let arr_bombs = [];
	//раставляем бомбы
    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.abs(Math.round(rand)); //бывает -0 по-этому модуль
        return rand;
    }

    function identicalCoord(obj1, obj2) {
        if ((obj1.x === obj2.x) && (obj1.y === obj2.y)) {
            return true;
        }
    }

    function duplicateInArr(new_elem, arr) {
        for (item of arr) {
            if (identicalCoord(new_elem, item)) {
            //такой уже есть
                return true;
            }
        }
    }

    for (let i=0; i<num_bombs; i++ ) {
        let bomb_x = randomInteger(0, 3);
        let bomb_y = randomInteger(0, 3);
        console.log("bomb_x", bomb_x);
        console.log("bomb_y", bomb_y);
        let coordBomb = {
            x: bomb_x,
            y: bomb_y
        };
        //проверяем что с такими координатами еще нет
        if (!duplicateInArr(coordBomb, arr_bombs)) {
            arr_bombs.push(coordBomb);
            field[bomb_x][bomb_y] = 9;
        } else {
            //с такими координатами уже есть
            // повторим этот шаг цикла
            i--;
        }
    }
    console.log(arr_bombs);
	
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
                if (i > 0) {
                    field[i-1][j] += 1;
                    if (j < 3) {
                        field[i-1][j+1] += 1;
                    }
                    if (j > 0) {
                        field[i-1][j-1] += 1;
                    }
                }
                if (j > 0) {
                    field[i][j-1] += 1;
                    if (i < 3) {
                        field[i+1][j-1] += 1;
                    }
                }
                if (j < 3) {
                    field[i][j+1] += 1;
                    if (i < 3) {
                        field[i+1][j+1] += 1;
                    }
                }
                if (i < 3) {
                    field[i+1][j] += 1;
                }

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

    if  (arr_cells[index] === 0) {
        item.className = "near0 close";
        //item.style.backgroundImage =  "url(0.png)";
    }

	if  (arr_cells[index] === 1) {
		item.className = "near1 close";
		//item.style.backgroundImage =  "url(1.png)";
	}
	
	if  (arr_cells[index] === 2) {
        item.className = "near2 close";
        //item.style.backgroundImage =  "url(2.png)";
    }

    if  (arr_cells[index] === 3) {
        item.className = "near3 close";
        //item.style.backgroundImage =  "url(3.png)";
    }

    if  (arr_cells[index] === 4) {
        item.className = "near4 close";
        //item.style.backgroundImage =  "url(4.png)";
    }
	
	if  (arr_cells[index] > 8) {
        item.className = "bomb close";
		//item.style.backgroundImage =  "url(bomb.jpeg)";
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
