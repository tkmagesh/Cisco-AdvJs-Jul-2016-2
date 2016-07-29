function oddEvenFactory(){
	function isOddOrEven(n){
		console.log('processing ', n);
		return n % 2 === 0 ? 'even' : 'odd';
	}
	var cache = {};
	return function (n){
		if (typeof cache[n] === 'undefined')
			cache[n] = isOddOrEven(n);
		return cache[n];
	}
}