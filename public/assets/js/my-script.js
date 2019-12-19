$(function() {
	$("#loginForm").on("submit", event => {
		event.preventDefault();
		$(".loading").show();

		var data = $(event.target).serialize();

		$.post("/login", data, result => {
			if (result.valid == true) {
				window.location.href = "/library";
			} else {
				$(".loading").hide();
				$("#loginErrors").html(result);
			}
		});
	});

	$("#registerForm").on("submit", event => {
		event.preventDefault();
		$(".loading").show();

		const data = $(event.target).serialize();

		$.post("/register", data, result => {
			console.log(result);
			if (result.valid) {
				window.location.href = "/register?s=ok";
			} else {
				$(".loading").hide();
				$(".alert").show();

				let msg = "";
				result.errors.forEach(error => (msg += error.msg + "<br>"));

				let errorFields = [];
				result.errors.forEach(error => {
					if (error.param === "_error") {
						error.nestedErrors.forEach(e => {
							errorFields.push(e.param);
						});
					} else {
						errorFields.push(error.param);
					}
				});
				errorFields = [...new Set(errorFields)];

				result.fields.forEach(field => {
					const errorIndex = errorFields.indexOf(field);
					if (errorIndex > -1) {
						event.target[field].classList.add("is-invalid");
					} else {
						event.target[field].classList.remove("is-invalid");
					}
				});

				$("#registerErrors").html(msg);
			}
		});
	});
});
