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
			if (result.valid == true) {
				window.location.href = "/library";
			} else {
				$(".loading").hide();

				let msg;

				if (result.errors.invalid.length > 0) {
					msg = result.errors.invalid[0].message;
				}

				if (result.errors.requiredEmpty.length > 0) {
					msg = "Please complete required fields.";
				}

				result.fields.forEach(field => {
					if (result.errors.requiredEmpty.includes(field)) {
						event.target[field].classList.add("is-invalid");
						$("#registerErrors").html(msg);
					} else {
						event.target[field].classList.remove("is-invalid");
						// event.target[field].classList.add("is-valid");
					}
				});
			}
		});
	});
});
