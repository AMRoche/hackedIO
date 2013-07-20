var utils = {
	"getById" : function(element) {
		return document.getElementById(element);
	},
	"getByClass" : function(element) {
		return document.getElementsByClassName(element);
	},
	"getElements" : function(element) {
		return document.getElementsByTagName(element);
	}
}

utils.getById("r").addEventListener("change", function() {
	colourswap(utils.getById("r").value, utils.getById("g").value, utils.getById("b").value)
});
utils.getById("g").addEventListener("change", function() {
	colourswap(utils.getById("r").value, utils.getById("g").value, utils.getById("b").value)
});
utils.getById("b").addEventListener("change", function() {
	colourswap(utils.getById("r").value, utils.getById("g").value, utils.getById("b").value)
});

var colourswap = function(r, g, b) {
	console.log("thing");
	utils.getElements("body")[0].style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
	utils.getById("rgb").innerHTML = "rgb("+r+","+g+","+b+")";
	utils.getElements("body")[0].style.color = "rgb(" + (255-r) + "," + (255-g) + "," + (255-b) + ")";
}
colourswap(utils.getById("r").value, utils.getById("g").value, utils.getById("b").value)
