/*
 * @Author: askMeWhy
 * @Date:   2017-10-19 18:24:08
 * @Last Modified by:   smile
 * @Last Modified time: 2018-02-28 15:33:59
 */
;
(function(arr) {
	arr.forEach(function(item) {
		if (item.hasOwnProperty('remove')) {
			return;
		}
		Object.defineProperty(item, 'remove', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: function remove() {
				this.parentNode.removeChild(this);
			}
		});
	});
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

var askMask = {
	type: 'slide',
	show: function(content, type) {
		this.hide();
		this.type = type || 'slide';
		this.delay = 302;
		if (this.type == 'register') this.delay = 602;
		var html = '\
                <div class="ask-modal ' + this.type + '">\
                    <div class="ask-overlay"></div>\
                    <div class="ask-modal-box">\
                        <div class="close-icon"></div>\
                        <div class="modal-content">\
                            ' + (content || '默认内容') + '\
                        </div>\
                    </div>\
                </div>\
            ';

		this.bodyStyle = {
			overflow: document.body.style.overflow,
			width: document.body.style.width,
			height: document.body.style.height,
			position: document.body.style.position
		};
		document.body.style.overflow = 'hidden';

		$('body').append(html);
		$('body').on('click', '.ask-modal .close-icon', function() {
			this.hide();
		}.bind(this))
	},
	hide: function() {
		var boxEl = $('.ask-modal');
		if (boxEl.length) {
			boxEl.find('.ask-modal-box').addClass('leave');
			setTimeout(function() {
				document.body.style.position = this.bodyStyle.position;
				document.body.style.width = this.bodyStyle.width;
				document.body.style.height = this.bodyStyle.height;
				document.body.style.overflow = this.bodyStyle.overflow;
				boxEl.remove();
			}.bind(this), this.delay);
		}
	}
}

var AskLoaderFn = function() {
	return this.loader.bind(this);
}
AskLoaderFn.prototype = {
	constructor: askLoader,
	loaderIndex: 0,
	open: function() {
		if (this.loaderIndex === 0) {
			this.creatLoader();
		}
		this.loaderIndex++;
	},
	close: function() {
		this.loaderIndex--;
		if (this.loaderIndex == 0) {
			this.removeLoader();
		}
	},
	loader: function(isOpen) {
		if (isOpen == void 0 || Object.prototype.toString.call(isOpen) != "[object Boolean]") {
			console.error('参数不能为空且只能为boolean值');
			return;
		}
		if (isOpen == true) {
			this.open();
		} else {
			this.close();
		}
	},
	creatLoader: function() {
		this.removeLoader();
		/*var html = '\
		        <div class="ask-loader">\
					<div class="ask-loverlay"></div>\
					<div class="ask-lbody">\
						<div class="ask-lbox">\
							<div class="ask-lcircle"><i></i></div>\
							<div class="ask-lcircle"><i></i></div>\
							<div class="ask-lcircle"><i></i></div>\
							<div class="ask-lcircle"><i></i></div>\
							<div class="ask-lcircle"><i></i></div>\
							<div class="ask-lcircle"><i></i></div>\
						</div>\
					</div>\
				</div>\
		    ';*/
		var html = '\
		        <div class="ask-loader">\
					<div class="ask-loverlay"></div>\
					<div class="ask-lbody">\
						<div class="ask-lbox">\
						<svg viewBox="0 0 80 80"><defs><path d="M0 0 A30 30 0 0 0 0 60 A30 30 0 0 0 0 0" stroke-width="1%" stroke="#000" fill="none" transform="translate(40,10)"></path></defs><g transform="translate(40,10)"><circle cx="0" cy="0" r="5" fill="#1abc9c" stroke="none" style="opacity: 0.72;"><animateMotion repeatCount="indefinite" path="M0 0 A30 30 0 0 0 0 60 A30 30 0 0 0 0 0" rotate="auto" keyPoints="0;.6;1;1" keyTimes="0;.28;.5;1" calcMode="linear" dur="3s" begin="0.15s"></animateMotion><animate attributeName="fill" attributeType="XML" values="#e67e22;#1abc9c;#1abc9c" keyTimes="0;.5;1" calcMode="linear" repeatCount="indefinite" dur="3s" begin="0.15s"></animate></circle><circle cx="0" cy="0" r="5" fill="#1abc9c" stroke="none" style="opacity: 0.64;"><animateMotion repeatCount="indefinite" path="M0 0 A30 30 0 0 0 0 60 A30 30 0 0 0 0 0" rotate="auto" keyPoints="0;.6;1;1" keyTimes="0;.28;.5;1" calcMode="linear" dur="3s" begin="0.3s"></animateMotion><animate attributeName="fill" attributeType="XML" values="#e67e22;#1abc9c;#1abc9c" keyTimes="0;.5;1" calcMode="linear" repeatCount="indefinite" dur="3s" begin="0.3s"></animate></circle><circle cx="0" cy="0" r="5" fill="#1abc9c" stroke="none" style="opacity: 0.56;"><animateMotion repeatCount="indefinite" path="M0 0 A30 30 0 0 0 0 60 A30 30 0 0 0 0 0" rotate="auto" keyPoints="0;.6;1;1" keyTimes="0;.28;.5;1" calcMode="linear" dur="3s" begin="0.44999999999999996s"></animateMotion><animate attributeName="fill" attributeType="XML" values="#e67e22;#1abc9c;#1abc9c" keyTimes="0;.5;1" calcMode="linear" repeatCount="indefinite" dur="3s" begin="0.44999999999999996s"></animate></circle><circle cx="0" cy="0" r="5" fill="#1abc9c" stroke="none" style="opacity: 0.48;"><animateMotion repeatCount="indefinite" path="M0 0 A30 30 0 0 0 0 60 A30 30 0 0 0 0 0" rotate="auto" keyPoints="0;.6;1;1" keyTimes="0;.28;.5;1" calcMode="linear" dur="3s" begin="0.6s"></animateMotion><animate attributeName="fill" attributeType="XML" values="#e67e22;#1abc9c;#1abc9c" keyTimes="0;.5;1" calcMode="linear" repeatCount="indefinite" dur="3s" begin="0.6s"></animate></circle><circle cx="0" cy="0" r="5" fill="#1abc9c" stroke="none" style="opacity: 0.4;"><animateMotion repeatCount="indefinite" path="M0 0 A30 30 0 0 0 0 60 A30 30 0 0 0 0 0" rotate="auto" keyPoints="0;.6;1;1" keyTimes="0;.28;.5;1" calcMode="linear" dur="3s" begin="0.75s"></animateMotion><animate attributeName="fill" attributeType="XML" values="#e67e22;#1abc9c;#1abc9c" keyTimes="0;.5;1" calcMode="linear" repeatCount="indefinite" dur="3s" begin="0.75s"></animate></circle><circle cx="0" cy="0" r="5" fill="#1abc9c" stroke="none" style="opacity: 0.32;"><animateMotion repeatCount="indefinite" path="M0 0 A30 30 0 0 0 0 60 A30 30 0 0 0 0 0" rotate="auto" keyPoints="0;.6;1;1" keyTimes="0;.28;.5;1" calcMode="linear" dur="3s" begin="0.8999999999999999s"></animateMotion><animate attributeName="fill" attributeType="XML" values="#e67e22;#1abc9c;#1abc9c" keyTimes="0;.5;1" calcMode="linear" repeatCount="indefinite" dur="3s" begin="0.8999999999999999s"></animate></circle><circle cx="0" cy="0" r="5" fill="#1abc9c" stroke="none" style="opacity: 0.24;"><animateMotion repeatCount="indefinite" path="M0 0 A30 30 0 0 0 0 60 A30 30 0 0 0 0 0" rotate="auto" keyPoints="0;.6;1;1" keyTimes="0;.28;.5;1" calcMode="linear" dur="3s" begin="1.05s"></animateMotion><animate attributeName="fill" attributeType="XML" values="#e67e22;#1abc9c;#1abc9c" keyTimes="0;.5;1" calcMode="linear" repeatCount="indefinite" dur="3s" begin="1.05s"></animate></circle><circle cx="0" cy="0" r="5" fill="#1abc9c" stroke="none" style="opacity: 0.16;"><animateMotion repeatCount="indefinite" path="M0 0 A30 30 0 0 0 0 60 A30 30 0 0 0 0 0" rotate="auto" keyPoints="0;.6;1;1" keyTimes="0;.28;.5;1" calcMode="linear" dur="3s" begin="1.2s"></animateMotion><animate attributeName="fill" attributeType="XML" values="#e67e22;#1abc9c;#1abc9c" keyTimes="0;.5;1" calcMode="linear" repeatCount="indefinite" dur="3s" begin="1.2s"></animate></circle><circle cx="0" cy="0" r="5" fill="#1abc9c" stroke="none" style="opacity: 0.08;"><animateMotion repeatCount="indefinite" path="M0 0 A30 30 0 0 0 0 60 A30 30 0 0 0 0 0" rotate="auto" keyPoints="0;.6;1;1" keyTimes="0;.28;.5;1" calcMode="linear" dur="3s" begin="1.3499999999999999s"></animateMotion><animate attributeName="fill" attributeType="XML" values="#e67e22;#1abc9c;#1abc9c" keyTimes="0;.5;1" calcMode="linear" repeatCount="indefinite" dur="3s" begin="1.3499999999999999s"></animate></circle><circle cx="0" cy="0" r="5" fill="#1abc9c" stroke="none" style="opacity: 0;"><animateMotion repeatCount="indefinite" path="M0 0 A30 30 0 0 0 0 60 A30 30 0 0 0 0 0" rotate="auto" keyPoints="0;.6;1;1" keyTimes="0;.28;.5;1" calcMode="linear" dur="3s" begin="1.5s"></animateMotion><animate attributeName="fill" attributeType="XML" values="#e67e22;#1abc9c;#1abc9c" keyTimes="0;.5;1" calcMode="linear" repeatCount="indefinite" dur="3s" begin="1.5s"></animate></circle></g></svg>\
						</div>\
					</div>\
				</div>\
		'
		$('body').append(html);
	},
	removeLoader: function() {
		var boxEl = $('.ask-loader');
		if (boxEl.length) {
			boxEl.remove();
		}
	}
}


var askLoader = new AskLoaderFn();

var TOAST_TRANSITION_DURATION = 500;
var askToast = {
	container: false,
	instances: [],
	spread: function(msg) {
		this.init({
			msg: msg,
			time: 1500,
			class: 'spread',
			position: 'spread',
		});
	},
	info: function(msg, time, position) {
		this.init({
			msg: msg,
			class: '',
			time: time,
			position: position || 'top-center',
		});
	},
	init: function(option) {
		var opt = {
			msg: 'toast',
			class: '',
			time: 3000,
			position: 'top-center',
		};
		opt = $.extend(true, opt, option);
		opt.time = parseInt(opt.time, 10);
		var instance = this.creatToast(opt);

		if (!instance) return;
		if (this.instances.length === 0) {
			this.creatBox(opt.position);
		}
		var onlyKey = Date.now();
		this.instances.push(onlyKey);

		if (isNaN(opt.time)) {
			console.error('time必须是整数');
			return;
		}
		this.changePosition(opt.position);
		this.appendToast(instance, opt, onlyKey);
	},
	creatBox: function(position) {
		this.container = document.createElement('div');
		this.container.classList.add('ask-toast-box');
		this.container.classList.add(position);
		document.body.appendChild(this.container);
	},
	creatToast: function(opt) {
		var instance = document.createElement('div');

		instance.classList.add('ask-toast-message');
		instance.classList.add('ask-toast-theme-' + (opt.class == '' ? 'default' : opt.class));
		var _msg = opt.msg == '' ? 'toast' : opt.msg;
		instance.innerHTML = _msg;
		return instance;
	},
	changePosition: function(position) {
		var _el = this.container;
		if (_el.classList.item(1) != position) {
			_el.classList.remove(_el.classList.item(1));
			_el.classList.add(position);
		}
	},
	appendToast: function(instance, opt, onlyKey) {
		instance.style.transitionDuration = TOAST_TRANSITION_DURATION + 'ms';
		instance.style.transform = 'translateY(30px)';
		instance.style.opacity = '0';
		this.container.appendChild(instance);
		window.getComputedStyle(instance).getPropertyValue('opacity');
		instance.style.transform = 'translateY(0px)';
		instance.style.opacity = '1';

		var timer = setTimeout(function() {
			this.removeToast(instance, onlyKey);
			clearTimeout(timer);
		}.bind(this), TOAST_TRANSITION_DURATION + opt.time);
	},
	removeToast: function(instance, onlyKey) {
		var index = this.instances.indexOf(onlyKey);

		if (index === -1) return;

		instance.style.transitionDuration = TOAST_TRANSITION_DURATION + 'ms';
		instance.style.transform = 'translateY(-30px)';
		instance.style.opacity = '0';

		var timer = setTimeout(function() {
			this.instances = this.instances.filter(function(index) {
				return index != onlyKey;
			});
			if (this.instances.length === 0) {
				this.container.remove();
			}
			instance.remove();
			// this.container.removeChild(instance);
			clearTimeout(timer);
		}.bind(this), TOAST_TRANSITION_DURATION);
	}
};
var templateEngine = (function() {
	var pattern = /\{\{(\w*[:]*[=]*\w+)\}\}(?!})/g;
	return function(template, json) {
		return template.replace(pattern, function(match, key, value) {
			return json[key];
		});
	}
})();

var askAdaption = function(opt) {
	var Ask = function(opt) {
		this.init(opt);
	}
	Ask.prototype = {
		constructor: Ask,
		init: function(opt) {
			var multiple = {
				w: 0,
				h: 0
			};
			var sw = 1920,
				sh = 1080,
				sp = this.getPrint();
			multiple.w = sp.width / sw;
			multiple.h = sp.height / sh;
			var container = document.querySelector('.adap-container');
			var classList = container.classList,
				style = container.style;
			if (multiple.w < 1 || multiple.h < 1 || (multiple.w == 1 && multiple.h == 1)) {
				style.width = "";
				style.height = "";
				if (classList.contains('to-adap')) classList.remove('to-adap');
			} else {
				if (!classList.contains('to-adap')) classList.add('to-adap');
				if (multiple.w > multiple.h) {
					style.width = sw * multiple.h + "px";
					style.height = sp.height + "px";
				}
				if (multiple.w < multiple.h) {
					style.width = sp.width + "px";
					style.height = sh * multiple.w + "px";
				}
			}
			window.onresize = this.init.bind(this);
		},
		getPrint: function() {
			var user = navigator.userAgent;
			if (document.compatMode == "BackCompat") {
				return {
					width: Math.max(document.body.scrollWidth, document.body.clientWidth),
					height: Math.max(document.body.scrollHeight, document.body.clientHeight)
				}
			} else {
				if (user.indexOf('WOW64') > -1 || user.indexOf('MSIE') > -1) {
					return {
						width: document.documentElement.clientWidth,
						height: document.documentElement.clientHeight
					}
				} else {
					return {
						width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
						height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
					}
				}
			}
		}
	}

	return new Ask(opt);
}

;
(function($) {
	function RollList(opt) {
		this.init(opt);
		return {
			play: this.play.bind(this),
			stop: this.stop.bind(this)
		}
	}
	RollList.prototype = {
		constructor: RollList,
		init: function(opt) {
			if (!opt) return;
			if (!opt.el) {
				console.error('请传入el');
				return;
			}

			if (!Array.isArray(opt.data)) {
				console.error('data 必须是数组');
				return;
			}
			this.$el = this.isElementNode(opt.el) ? opt.el : $(opt.el);
			this.data = opt.data;
			this.src = opt.src;
			this.speed = opt.speed || 1;
			this.particles = [];
			this.buildData();
		},
		isElementNode: function(node) {
			return node !== void 0 && node.nodeType === 1;
		},
		buildData: function() {
			for (var i = 0, l = this.data.length; i < l; i++) {
				var particle = {
					src: "",
					class: "",
					html: ""
				};
				if (!Array.isArray(this.src)) {
					particle['src'] = this.src;
					particle['class'] = "";
					particle['html'] = this.data[i];
				} else {
					var srcLength = this.src.length;
					if (i < srcLength) {
						particle['src'] = this.src[i][0];
						particle['class'] = this.src[i][1] || "";
						particle['html'] = this.data[i];
					} else {
						particle['src'] = this.src[srcLength - 1][0];
						particle['class'] = this.src[srcLength - 1][1] || "";
						particle['html'] = this.data[i];
					}
				}
				this.particles[i] = new RollSingle(particle);
			}
			this.buildHtml()
		},
		buildHtml: function() {
			var container = [];
			for (var i = 0, l = this.particles.length; i < l; i++) {
				container.push(this.particles[i].$group.prop('outerHTML'));
			}
			this.$list = $('<div class="roll-list">')
			this.$list.html(container.join(''));
			this.$el.html(this.$list);
			this.run();
		},
		run: function() {
			var groupLength = this.$list.children('.roll-group').length;
			if (this.$list.height() < this.$el.height()) return;
			var animationSet = {};
			animationSet[getPrefix("animation") + '-duration'] = groupLength / this.speed + 's';

			this.$list.append(this.$list.html()).addClass('marquee').css(animationSet);
		},
		play: function() {
			var animationSet = {};
			animationSet[getPrefix("animation") + '-play-state'] = 'running';
			this.$list.css(animationSet);
		},
		stop: function() {
			var animationSet = {};
			animationSet[getPrefix("animation") + '-play-state'] = 'paused';
			this.$list.css(animationSet);
		}
	}
	var RollSingle = function(p) {
		this.$group = $('<div class="roll-group">');
		this.$cover = $('<div class="cover">');
		this.$cover.html('<img src="' + p.src + '" class="' + p.class + '" alt="图标">');
		this.$box = $('<div class="box">');
		this.$box.html(p.html);
		this.$group.append(this.$cover, this.$box);
		/*
		<div class="roll-group">
			<div class="cover">
				<img src="../images/free-single/other.png" alt="图标">
			</div>
			<div class="box">
				<div class="text">用户
					<span>159****8569</span>
				</div>
				<div class="text">获得
					<span>99999鼓励金</span>
				</div>
			</div>
		</div>
		 */
	}

	function getPrefix(attr) {
		var rtext = "";
		var toUpAttr = attr.charAt(0).toUpperCase() + attr.substr(1, attr.length);
		var divStyle = document.createElement('div').style;
		var attrArray = [attr + '', 'webkit' + toUpAttr, 'Moz' + toUpAttr, 'ms' + toUpAttr, 'O' + toUpAttr];
		for (var i = 0; i < attrArray.length; i++) {
			if (attrArray[i] in divStyle) {
				// 找到以后立刻返回，结束函数
				return rtext = attrArray[i];
			}
		}
		return rtext;
	}
	window.RollList = RollList;
})(window.jQuery);

var twoFloat = function(val) {
	var _v = (val || 0).toString().replace(/\,/g, "").split('\.');
	if (_v.length <= 1) {
		return _v[0] + '.00';
	} else {
		if (_v[1].length == 1) {
			return _v[0] + '.' + _v[1] + '0';
		} else {
			return _v[0] + '.' + _v[1].substr(0, 2);
		}
	}
}