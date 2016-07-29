var products = [
	{id : 5, name : 'Pen', cost : 60, units : 30, category : 1},
	{id : 9, name : 'Hen', cost : 80, units : 60, category : 2},
	{id : 4, name : 'Ten', cost : 50, units : 50, category : 1},
	{id : 7, name : 'Den', cost : 30, units : 70, category : 2},
	{id : 2, name : 'Zen', cost : 70, units : 90, category : 1},
]
function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

/*
sort
filter
any
all
groupBy
sum
min,
max
aggregate
*/



describe('Default list', function(){
	console.table(products);
});

describe('Sorting', function(){
	describe('Default Products Sort [ by id ]', function(){
		function sort(){
			for(var i = 0; i < products.length-1; i++)
				for(var j = i + 1; j < products.length; j++)
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		}
		sort();
		console.table(products);
	});
	describe('Generic implementation [ attribute name ]', function(){
		function sort(list, attrName){
			for(var i = 0; i < list.length-1; i++)
				for(var j = i + 1; j < list.length; j++)
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}
		describe('Products by cost', function(){
			sort(products, 'cost');
			console.table(products);
		})
		describe('Products by units', function(){
			sort(products, 'units');
			console.table(products);
		})

		
	});

	describe('Generic implementation [ comparison function ]', function(){
		function sort(list, comparer){
			for(var i = 0; i < list.length-1; i++)
				for(var j = i + 1; j < list.length; j++)
					if (comparer(list[i], list[j]) > 0){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}
		describe('Products by value [units * cost]', function(){
			var productComparerByValue = function(p1, p2){
				var p1Value = p1.cost * p1.units,
					p2Value = p2.cost * p2.units;
				if (p1Value < p2Value) return -1;
				if (p1Value === p2Value) return 0;
				return 1;
			}
			sort(products, productComparerByValue);
			console.table(products);
		});
	});
});

describe('Filtering', function(){
	function filter(list, criteriaFn){
		var result = [];
		for(var i=0; i< list.length; i++)
			if (criteriaFn(list[i]))
				result.push(list[i]);
		return result;
	}
	var category1ProductCriteria = function(product){
		return product.category === 1;
	};
	describe("Category 1 products", function(){
		
		var category1Products = filter(products, category1ProductCriteria);
		console.table(category1Products);
	});
	var costlyProductCriteria = function(product){
		return product.cost > 50;
	};
	describe("Costly products [cost > 50]", function(){
		
		var costlyProducts= filter(products, costlyProductCriteria);
		console.table(costlyProducts);
	});
	function negate(criteriaFn){
		return function(){
			return !criteriaFn.apply(this, arguments);
		}
	}
	describe("Non Category 1 products", function(){
		var nonCategory1ProductCriteria = negate(category1ProductCriteria);
		var nonCategory1Products = filter(products, nonCategory1ProductCriteria);
		console.table(nonCategory1Products);
	});

	describe("Affordable products [cost > 50]", function(){
		var affordableProductCriteria = negate(costlyProductCriteria);
		var affordableProducts= filter(products, affordableProductCriteria);
		console.table(affordableProducts);
	});
});

describe("Grouping", function(){
	function groupBy(list, keySelector){
		var result = {};
		for(var i=0; i < list.length; i++){
			var key = keySelector(list[i]);
			result[key] = result[key] || [];
			result[key].push(list[i]);
		}
		return result;
	}
	function displayGroup(obj){
		for(var key in obj){
			describe('Key - ' + key, function(){
				console.table(obj[key]);
			});
		}
	}
	describe("Products by category", function(){
		var categoryKeySelector = function(product){
			return product.category;
		};
		var productsByCategory = groupBy(products, categoryKeySelector);
		displayGroup(productsByCategory);
	});

	describe("Products by cost", function(){
		var costKeySelector = function(product){
			return product.cost > 50 ? 'costly' : 'affordable';
		};
		var productsByCost = groupBy(products, costKeySelector);
		displayGroup(productsByCost);
	});
});




