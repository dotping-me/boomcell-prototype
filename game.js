var grid = [];
var size = 8;

var n_bombs    = 1;
var n_bombs_at = [];

var n_guesses  = 8;
var is_running = true;

var bombs_found = 0;

// When page is loaded
window.onload = function() {
	start_game();
}

function update() {
	// Displays number of guesses
	document.getElementById("n_guesses").innerText = n_guesses;

	if (bombs_found == n_bombs) {
		document.getElementById("n_guesses").innerText = "Game won !";
		is_running = false;

	} else {
		if (n_guesses <= 0) {
			document.getElementById("n_guesses").innerText = "Game over !";
			is_running = false;
		}
	}
}

function start_game() {
	update();

	// Placing bombs
	place_bombs();

	// Creates grid
	for (let c = 0; c < size; c++) {
		row = [];

		for (let r = 0; r < size; r++) {
			// Creates div tag
			// <div id="0,0"></div>
			let cell = document.createElement("div");
			cell.id  = r.toString() + "," + c.toString();

			// Adds event to cell to detect click
			cell.addEventListener("click", click_cell);

			// Appends div tag to grid in html
			document.getElementById("grid").append(cell);

			//Adds cell to array row
			row.push(cell);
		}

		grid.push(row);
	}

	// Debugging purposes
	console.log(n_bombs_at);
}

function place_bombs() {
	let n_bombs_placed = 0;

	while (n_bombs_placed < n_bombs) {
		// Rounds off a randomly generated number
		// Math.random() generates a random number in the interval 0 <= x <= 1
		let r  = Math.floor(Math.random() * size);
		let c  = Math.floor(Math.random() * size);
		let id = r.toString() + "," + c.toString();

		// If cell doesn't already have a bomb
		if (!n_bombs_at.includes(id)) {

			// Appends coord of bomb to array
			n_bombs_at.push(id);
			n_bombs_placed += 1;
		}
		
	}
}

function click_cell() {
	if (is_running) {
		// Decrement number of guesses
		n_guesses -= 1;
		console.log(n_guesses)

		let cell = this;

		// If clicked cell has a bomb
		if (n_bombs_at.includes(cell.id)) {
			bombs_found += 1

			// Updating cell visuals
			cell.innerText = "💣";

			//alert("Game Won !");
		}
		
		update();

		// If clicked cell has no bomb
		// "0,0" -> ["0", "0"]
		let coords = cell.id.split(",");

		let r = Number(coords[0]);
		let c = Number(coords[1]);

		// Calculates radius of bomb from cell
		let radii = calc_radius_from(r, c);
		console.log(radii);

		// Updating cell visuals
		if (radii[0] >= 5) {
			radii[0] = 5;
		}

		// grid[c][r].innerText = radii[0];
		grid[c][r].classList.add("R" + radii[0].toString());
	}
}

function calc_radius_from(r, c) {
	let radii = [];
	
	// Debugging
	console.log("cell", r, c)

	// Gets coords of bombs
	for (i in n_bombs_at) {
		// "0,0" -> ["0", "0"]
		let coords = n_bombs_at[i].split(",");
		
		let x = Number(coords[0]);
		let y = Number(coords[1]);

		// Debugging
		console.log("bomb", x, y)

		let diff_x = Math.abs(r - x);
		let diff_y = Math.abs(c - y);

		if (diff_x > diff_y) {
			radii.push(diff_x);

		} else {
			radii.push(diff_y);
		}
	}

	return radii;
}