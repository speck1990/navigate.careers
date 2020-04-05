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
				$("#loginErrors")
					.show()
					.html(result);
			}
		});
	});

	$("#registerForm").on("submit", event => {
		event.preventDefault();
		$(".loading").show();

		const data = $(event.target).serialize();

		$.post("/register", data, result => {
			if (result.valid) {
				window.location.href = "/register";
			} else {
				$(".loading").hide();

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

				$("#registerErrors")
					.show()
					.html(msg);
			}
		});
	});

	$("#resend a").on("click", event => {
		event.preventDefault();

		const data = { uid: $(event.target).data("uid") };

		$.post("/register/resend", data, result => {
			//
		});
	});

	/*===== Popup =====*/
	$(".ask-question").on("click", function() {
		$("#ask-question").addClass("show-model");
		$("body").addClass("modal-visible");
		return false;
	});

	$(".modal-overlay, .model-close").on("click", function() {
		if ($("body").hasClass("modal-visible")) {
			$("body").removeClass("modal-visible");
			$("#ask-question").removeClass("show-model");
		}
	});
});
