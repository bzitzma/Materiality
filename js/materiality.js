/* fixed action btn */
$(document).on("click", ".fixed-action-btn.click-to-toggle > a", function() {
	var btn = $(this);
	var menu = $(this).parent();
	var item = menu.find("ul a, ul button");
	if (menu.hasClass("active")) {
		item.css({ "transition-delay": "0ms" });
		btn.children().show();
		menu.removeClass("active");
		btn.find("cancel").remove();
    } else {
		var time = 0;
		item.each(function() {
			$(this).css({ "transition-delay": time+"ms" });
				time += 40;
		});
		btn.children().hide();
		btn.append("<i class='material-icons cancel'>&#xE5CD;</i>");
		menu.addClass("active");
	}
});

$(document).on("click", function(e) {
	if ($(".fixed-action-btn.click-to-toggle").hasClass("active") && !$(".fixed-action-btn.click-to-toggle > a").has(e.target).length) {
		$(".fixed-action-btn.click-to-toggle > a").trigger("click");
	}
});

/* panel fullscreen */
$.fn.extend({
	openPanel: function() {
		var panel = $(this);
		$("<div class='panel-backdrop'></div>").appendTo("body").fadeIn(function() {
			var height = "calc(100% - "+((panel.find(".panel-heading").outerHeight() || 0) + (panel.find(".panel-footer").outerHeight() || 0))+"px)";
			panel.find(".panel-body").css("height", height);
			panel.fadeIn(function() {
				$("body").addClass("panel-open");
			});
		});
	},
	closePanel: function(options) {
		var panel = $(this);
		options = $.extend({ callback: function() {} }, options);
		panel.fadeOut(function() {
			options.callback.call(this);
			$(".panel-backdrop").fadeOut(function() { $(this).remove(); });
			$("body").removeClass("panel-open");
		});
	}
});

/* snackbar */
var	snackbar = (function() {
	var previous = null;
 	return function(message, timeout, actionText, action) {
		if (previous) previous.dismiss();
		var $snackbar = $("<div>", { class: "snackbar" });
		var $message = $("<span>", { class: "text flex" }).html(message);
		$snackbar.append($message);
		if (actionText) {
			if (!action) action = function() { $snackbar.dismiss(); }.bind($snackbar);
			var $action = $("<span>", { class: "action" }).html(actionText);
			$action.on("click", action);
			$snackbar.append($action);
		}
		$snackbar.dismiss = function() { $(this).removeClass("active"); };
		setTimeout(function() { if (previous === this) previous.dismiss(); }.bind($snackbar), timeout);
		$snackbar.on("transitionend", function() {
			if (!$(this).hasClass("active")) {
				$(this).remove();
				if (previous === this) previous = null;
			}
		}.bind($snackbar));
		$($snackbar).prependTo("body").delay(10).queue(function() { $(this).addClass("active"); });
		previous = $snackbar;
	};
})();