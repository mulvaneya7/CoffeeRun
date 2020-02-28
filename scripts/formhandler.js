(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if(!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with the selector: ' + selector);
        }
    }

    FormHandler.prototype.addSumbitHandler = function (fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('sumbit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data);
            this.reset();
            this.elements[0].focus();
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);