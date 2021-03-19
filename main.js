function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
	}
}

function buildCast(names) {
	if (names.length != 9) {
		alert("Cast has to be 9")
		return
	}

	$('.squares').html('')

	var row1 = $("<div>").addClass("row")
	var row2 = $("<div>").addClass("row")
	var row3 = $("<div>").addClass("row")
	var rows = [row1, row2, row3]
	for (var i = 0; i < 9; i++) {
		var rowToModify = rows[parseInt(i / 3)]
		var $input = $("<input>").addClass('cell').val(names[i])
		var $container = $("<span>").addClass("container").append($input)
		rowToModify.append($container)
	}

	$(".squares").append(rows)
	bindEvents($(".squares"))
}

function buildWaitList(names) {
	$('.waitlist').html('')

	var currentCast = $.map($(".squares .cell"), function (cell, i) { return $(cell).val() })
	let waitList = names.filter(x => !currentCast.includes(x));
	var rowsToBuild = waitList.length / 3
	var rows = []
	for (var i = 0; i < rowsToBuild; i++) {
		var newRow = $("<div>").addClass("row")
		rows.push(newRow)
		$(".waitlist").append(newRow)
	}

	for (var i = 0; i < waitList.length; i++) {
		var rowToModify = rows[parseInt(i / 3)]
		var $input = $("<input>").addClass('cell').val(waitList[i])
		var $container = $("<span>").addClass("container").append($input)
		rowToModify.append($container)
	}

	bindEvents($(".waitlist"))
}

function bindEvents(container) {
	container.find(".container").on("click", function(event) {
		if ($(event.target).hasClass("cell")) {
			return
		}

		$(this).toggleClass("highlighted")
	})
}

$(function () {
	buildCast(
		["Cast 1", "Cast 2", "Cast 3", "Cast 4", "Cast 5", "Cast 6", "Cast 7", "Cast 8", "Cast 9"])
	buildWaitList(
		["Cast 1", "Cast 2", "Cast 3", "Cast 4", "Cast 5", "Cast 6", "Cast 7", "Cast 8", "Cast 9", "Cast 10", "Cast 11", "Cast 12", "Cast 13"])

	$("#remove").on('click', function() {
			var selectedCast = $.map($(".squares .highlighted .cell"), function (cell, i) { return $(cell).val() })
			var currentWaitlist = $.map($(".waitlist .cell"), function (cell, i) { return $(cell).val() })
			var newWaitList = currentWaitlist.concat(selectedCast)
			$(".squares .highlighted").remove()
			buildWaitList(newWaitList)
	})

	$("#add").on('click', function() {
			if ($(".squares .cell").length == 9) {
				return
			}

			var currentCast = $.map($(".squares .cell"), function (cell, i) { return $(cell).val() })
			var currentWaitlist = $.map($(".waitlist .cell"), function (cell, i) { return $(cell).val() })
			var numberToPull = 9 - currentCast.length
			var newCast = currentCast.concat(currentWaitlist.splice(0,numberToPull))
			$($(".waitlist .container").splice(0,numberToPull)).remove()


			buildCast(newCast)
	})

	$("#shuffle").on('click', function() {
		var cast = $.map($(".squares .cell"), function (cell, i) { return $(cell).val() })
		var centerUser = cast[4]
		delete cast[4]
		shuffleArray(cast)
		cast.splice(4, 0, centerUser)
		const newCast = cast.filter(function (elem) {
				 return elem !== undefined;
		});

		buildCast(newCast)
	})

	$("#replace_center").on('click', function() {
		var selectedNewCenters = $.map($(".waitlist .highlighted .cell"), function (cell, i) { return $(cell).val() })
		if (selectedNewCenters.length != 1) {
			alert("Select one new center")
			return
		}

		var selectedNewCenter = selectedNewCenters[0]
		var cast = $.map($(".squares .cell"), function (cell, i) { return $(cell).val() })
		var oldCenter = cast[4]
		cast[4] = selectedNewCenter

		var currentWaitlist = $.map($(".waitlist .cell"), function (cell, i) { return $(cell).val() })
		var newWaitList = currentWaitlist.concat(oldCenter)
		buildCast(cast)
		buildWaitList(newWaitList)
	})
})