(function($){
	$.fn.checkboxgroup = function(checkboxes) {
		allCheckbox = this;

		function allSelected() {
			var allSelected = true;

			$(checkboxes).each(function (key, value) {
				if (!($(value).is(":checked"))) {
					allSelected = false;
				}
			});

			return allSelected;
		};

		function selectAll() {
			$(checkboxes).check('on');
		}

		function deselectAll() {
			$(checkboxes).check('off');
		}

		allCheckbox.on("click", function() {
			if (allCheckbox.is(':checked')) {
				selectAll();
			} else {
				deselectAll();
			}

			return true;
		});

		$(checkboxes).each(function(key, value) {
			$(value).on("click", function() {
				if (allSelected()) {
					allCheckbox.check('on');
				} else {
					allCheckbox.check('off');
				}

				return true;
			});
		});
	};

	jQuery.fn.check = function(mode) {
    	mode = mode || 'on';

    	return this.each(function(){
        	if (this.type == 'checkbox') {
            	jQuery.fn._setCheckboxState(this, mode);
        	} else {
            	$(this).field('checkbox').each(function(){
                	jQuery.fn._setCheckboxState(this, mode);
            	});
        	}
    	});
	}

	jQuery.fn._setCheckboxState = function(checkbox, mode)
	{
	    switch (mode) {
	        case 'toggle':
	            checkbox.checked = !checkbox.checked;
	            break;

	        case 'off':
	            checkbox.checked = false;
	            break;

	        case 'on':
	            checkbox.checked = true;
	            break;
	    }
	}

	jQuery.fn.field = function(type, filter)
	{
	    var rule;
	    filter = filter || '';

	    if(type == 'all' || !type) {
	        rule = 'input|textarea|select';
	    } else {
	        if (type != 'select' && type != 'textarea') {
	            rule = 'input[@type=' + type + ']';
	        } else {
	            rule = type;
	        }
	    }

	    return jQuery(rule, this).not(filter);
	}

})(jQuery);
