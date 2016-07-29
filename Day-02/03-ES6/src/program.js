console.log('welcome to es6');

var numbers = [10,20,30,40];
var total = numbers.reduce((n1,n2) => n1 + n2);
console.log(total);

class Employee{
   constructor(id, name, salary){
      this.__id = id;
      this.name = name;
      this.salary = salary;
   }
   display(){
     console.log(this.id, this.name, this.salary);
   }
   get id(){
   	  console.log('id getter triggered')
   	  return this.__id;
   }
   set id(value){
   	  console.log('id setter triggered');
   	  this.__id = value;
   }
}

class PermenantEmployee extends Employee{
	constructor(id, name, salary, benefits){
		super(id, name, salary);
		this.benefits = benefits;
	}


}

let Spinner = (function(){
	let countSymbol = Symbol();
	class Spinner{
		constructor(){
			this[countSymbol] = 0;
		}
		up(){
			return ++this[countSymbol];
		}
		down(){
			return --this[countSymbol];
		}
	}
	return Spinner;
})()

