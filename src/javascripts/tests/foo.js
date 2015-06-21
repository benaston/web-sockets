;(function(module) {
	console.log(module);

	function Foo() {}
	Foo.path = 'shared/foo';

	module.exports = Foo;
}(module));