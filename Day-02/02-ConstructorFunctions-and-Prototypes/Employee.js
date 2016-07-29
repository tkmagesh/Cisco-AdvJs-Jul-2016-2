function Employee(id, name, salary){
	//this -> new object
	
	'this.id = id;
	this.name = name;
	this.salary = salary;

	//this returned by default
}


var SalaryCalculator = (function(){
	var calculate = function(){
      var gross = this.basic + this.hra + this.da;
      this.salary = gross * ((100-this.tax)/100);
   }
	function SalaryCalculator(basic, hra , da, tax){
	   this.basic = basic;
	   this.hra = hra;
	   this.da = da;
	   this.tax = tax;
	   this.salary = 0;
	   this.calculate = calculate;

	}
	return SalaryCalculator

})()