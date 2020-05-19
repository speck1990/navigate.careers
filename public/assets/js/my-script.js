$(function () {
	$("#loginForm").on("submit", event => {
		event.preventDefault();
		$(".loading").show();

		var data = $(event.target).serialize();

		$.post("/login", data, result => {
			if (result.valid == true) {
				window.location.href = "/library";
			} else {
				$(".loading").hide();
				$("#loginErrors").show().html(result);
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

				$("#registerErrors").show().html(msg);
			}
		});
	});

	$("#resend a").on("click", event => {
		event.preventDefault();

		$("#sendingLoading").show();
		$("#sentmsg").hide();

		const data = { uid: $(event.target).data("uid") };

		$.post("/register/resend", data, result => {
			if (result.valid == true) {
				$("#sentmsg").show().html("<i class='fas fa-check'></i>  Sent");
			} else {
				$("#sentmsg").show().html(result.msg);
			}
			$("#sendingLoading").hide();
		});
	});

	$("#passwordResetForm").on("submit", event => {
		event.preventDefault();

		$("#passwordResetContent > .loading").show();

		var data = $(event.target).serialize();

		const url = $(event.target).data("url");

		$.post(url, data, result => {
			if (result.valid == true) {
				$("#passwordResetContent").html(`<p>${result.msg}</p>`);
			} else {
				$("#passwordResetContent > .loading").hide();

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

				$("#resetErrors").show().html(msg);
			}
		});
	});
});
