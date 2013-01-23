function createControl(name, value, min, max, step) {
	$('#controls').append(
		'<p><label for="' + name + '">' + name + ': <input type="text" id="' + name + '" value="' + value + '" data-min="' + min + '" data-max="' + max + '" data-step="' + step + '"></label></p>'
	);

	$('#' + name)
		.slider({
			showValue: true,
			showRange: true,
			onChange: function(value, el) {
				options[name] = parseFloat(value);
				run();
			}
		});
};