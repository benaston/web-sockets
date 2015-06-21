(function() {

	'use strict';

	var importDoc, myButton;

	importDoc = document.currentScript.ownerDocument;
	myButton = Object.create(HTMLButtonElement.prototype);

	myButton.createdCallback = function() {
		var template, templateClone, shadow, host;

		template = importDoc.querySelector('#my-button-large-template');
		templateClone = importDoc.importNode(template.content, true);

		host = this;
		shadow = this.createShadowRoot();
		shadow.appendChild(templateClone);
	};

	document.registerElement('my-button', {
		prototype: myButton,
		extends: 'button'
	});

}());