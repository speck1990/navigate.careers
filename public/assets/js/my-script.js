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
				//$("#registerErrors").html(errors.email.message);
				result.fields.forEach(field => {
					const inputField = event.target[field];
					if (result.errors.includes(field)) {
						event.target[field].classList.add("is-invalid");
						$("#registerErrors").html("Please complete required fields.");
					} else {
						event.target[field].classList.remove("is-invalid");
						// event.target[field].classList.add("is-valid");
					}
				});
			}
		});
	});
});
