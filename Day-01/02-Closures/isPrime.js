function isPrimeFactory(){
	function checkPrime(n){
		console.log('processing ', n);
		if (n <= 3) return true;
		for(var i=2; i <= (n/2); i++)
			if (n % i === 0) return false;
		return true;
	}
	var cache = {};
	return function (n){
		if (typeof cache[n] === 'undefined')
			cache[n] = checkPrime(n);
		return cache[n];
	}
}
var isPrime = isPrimeFactory();


isPrime(100); // runs the algo, returns false
isPrime(101); // runs the algo, returns true
isPrime(102); // runs the algo, returns false
isPrime(103); // runs the algo, returns true

isPrime(100); // DO NOT run the algo, returns false
isPrime(101); // DO NOT run the algo, returns true
isPrime(102); // DO NOT run the algo, returns false
isPrime(103); // DO NOT run the algo, returns true

isPrime(104); // runs the algo, returns false
