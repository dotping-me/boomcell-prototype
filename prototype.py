import random

'''Grid generation'''

def build_grid(size) :
	'''Returns list of coordinates (grid)'''

	# Building empty grid
	grid = []
	for i in range(size) :
		for j in range(size) :
			grid.append((i, j))

	return grid

def choose_target_cells(grid, n_target_cells) :
	'''Returns target cells'''

	# Chooses empty cells randomly
	actual_n_target_cells = 0
	total_target_cells 	  = []

	while actual_n_target_cells < n_target_cells :
		temp_cell = random.choice(grid)

		# if temp cell isn't already a target cell
		if temp_cell not in total_target_cells :
			total_target_cells.append(temp_cell)

			actual_n_target_cells += 1

	return total_target_cells

def display_grid(grid, size) :
	'''Prints grid'''
	print("=====")

	index = 0
	for _ in range(size) :
		print(grid[index : index + size])
		index += size

	print("=====")

'''Game mechanics'''

def eval_grid(cell, total_target_cells) :
	'''Evaluates distance/radius of target cell from [cell]'''

	radii = []

	for i in total_target_cells :
		delta_x = abs(cell[0] - i[0])
		delta_y = abs(cell[1] - i[1])

		if delta_x > delta_y :
			radii.append(delta_x)

		elif delta_x < delta_y :
			radii.append(delta_y)

		else :
			radii.append(delta_x)

	return radii

def play_game(size, grid, total_target_cells, n_guesses) :
	'''Main gameplay loop'''

	found_target = False

	while (n_guesses > 0) and (found_target == False) :
		display_grid(grid, size)

		guessed_cell = input("Guess the target cell [X,Y]\n>>> ")
		guessed_cell = [int(i) for i in guessed_cell.split(",")]

		radii = eval_grid(guessed_cell, total_target_cells)

		print("=====")
		for i in range(len(radii)) :
			if radii[i] == 0 :
				print(f"Target cell {i + 1} found !!!")
				found_target = True

			else :
				if radii[i] > 5 :
					print(f"Target cell {i + 1} is in a > 5 cell radius !!!")

				else :
					print(f"Target cell {i + 1} is in a {radii[i]} cell radius !!!")

		n_guesses -= 1
		print(f"\nNumber of guesses left = {n_guesses}")
		
	print("=====")
	print(f"Target cells =\n{' '.join(str(i) for i in total_target_cells)}")

size = 6
test = build_grid(size)
total_target_cells = choose_target_cells(test, 2)

#display_grid(test, size)

play_game(size, test, total_target_cells, 8)