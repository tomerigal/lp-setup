export default (function () {
    function validator(form, options) {
        this.inputs = [].slice.call(form.querySelectorAll('[data-v]'));
        this.options = options;
        form.addEventListener('submit', this.onsubmit.bind(this));
    }

    validator.prototype = {
        onsubmit: function (e) {
            e.preventDefault();
            if (this.validate()) {
                if (this.inOptions('onsubmit')) {
                    this.options.onsubmit();
                }
                return true;
            }
            return false;
        },
        inOptions: function (string) {
            return this.options.hasOwnProperty(string);
        },
        inValidations: function (string) {
            return this.validations.hasOwnProperty(string);
        },
        validate: function () {
            var _this = this;
            var faildInputs = this.inputs.filter(function (input) {
                var validFn = input.getAttribute('data-v');
                validFn = typeof validFn === 'string' && validFn.length === 0 ? 'rValue' : validFn;
                var required = input.getAttribute('data-required') == "true" || input.getAttribute('data-required') == "1";
                if (!required && input.value.length === 0) {
                    return false;
                }
                return (required && input.value.length === 0) ? true : !_this.validations[validFn].call(_this, input);
            });

            if (faildInputs.length) {
                if (this.inOptions('onError')) {
                    this.options.onError(faildInputs);
                }
                return false;
            }

            return true;
        },
        validations: {
            email: function (input) {
                return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(input.value);
            },
            name: function (input) {
                return /^[a-zA-Z|\s|א-ת]{2,30}$/.test(input.value.trim());
            },
            phone_il: function (input) {
                ///^[0][5][0]-\d{7}|[0][5][2]-\d{7}|[0][5][4]-\d{7}|[0][5][7]-\d{7}|[0][7][7]-\d{7}|[0][2]-\d{7}|[0][3]-\d{7}|[0][4]-\d{7}|[0][8]-\d{7}|[0][9]-\d{7}|[0][5][0]\d{7}|[0][5][2]\d{7}|[0][5][4]\d{7}|[0][5][7]\d{7}|[0][7][7]\d{7}|[0][2]\d{7}|[0][3]\d{7}|[0][4]\d{7}|[0][8]\d{7}|[0][9]\d{7}$/
                return /^\b\d{2,3}-*\d{7}\b$/.test(input.value.replace("-", ""));
            },
            fullName: function (input) {
                return /^[a-zA-Zא-ת']+[ ]+[a-zA-Zא-ת'\- ]*$/.test(input.value);
            },
            rValue: function (input) {
                return input.value;
            }
        }
    };
    return validator;
}());