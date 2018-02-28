/*
 * @Author: askMeWhy
 * @Date:   2018-02-27 10:22:34
 * @Last Modified by:   smile
 * @Last Modified time: 2018-02-28 15:16:49
 */
;
(function() {
	var lastTime = 0;
	var vendors = ['webkit', 'moz', 'ms'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame =
			window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() {
					callback(currTime + timeToCall);
				},
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());

var scrollBody = {
	template: '\
		<div class="ask-scroll" :class="{\
					\'refresh-before\': (refreshState == 0),\
					\'refresh-loosen\' : (refreshState == 1),\
					\'refresh-in\': (refreshState == 2),\
					\'refresh-end\': (refreshState == 3),\
					\'infinite-before\': (infiniteState == 0),\
					\'infinite-in\': (infiniteState == 1),\
					\'infinite-end\': (infiniteState == 2),\
					\'touching\': touching\
				}" \
				@touchstart="touchStart($event)" \
				@touchmove="touchMove($event)" \
				@touchend="touchEnd($event)" \
				@mousedown="mouseDown($event)" \
				@mousemove="mouseMove($event)" \
				@mouseup="mouseUp($event)" \
			>\
			<div class="ask-scroll-body" :style="style">\
				<div class="ask-scroll-header" v-if="onRefresh">\
					<slot name="refresh">\
						<div class="scroll-before">下拉刷新</div>\
						<div class="scroll-loosen">松开刷新</div>\
						<div class="scroll-in">正在刷新</div>\
						<div class="scroll-end">刷新成功</div>\
					</slot>\
				</div>\
				<slot></slot>\
				<div class="ask-scroll-footer" v-if="onInfinite">\
					<slot name="infinite">\
						<div class="scroll-before">上拉加载</div>\
						<div class="scroll-in">正在加载</div>\
						<div class="scroll-end">加载成功</div>\
					</slot>\
				</div>\
			</div>\
			<div class="ask-scroll-bar" v-show="!barHide">\
				<div class="as-barx" v-if="scrollX && barX">\
					<div class="as-bartrack"></div>\
				</div>\
				<div class="as-bary" v-if="scrollY && barY">\
					<div class="as-bartrack" :style="barStyle"></div>\
				</div>\
			</div>\
		</div>\
	',
	props: {
		direction: {
			type: String,
			default: 'y'
		},
		thresholdR: {
			type: Number,
			default: 44
		},
		thresholdI: {
			type: Number,
			default: -20
		},
		scrollX: {
			type: Boolean,
			default: false
		},
		scrollY: {
			type: Boolean,
			default: true
		},
		barX: {
			type: Boolean,
			default: true
		},
		barY: {
			type: Boolean,
			default: true
		},
		onRefresh: {
			type: Function,
			default: undefined,
			required: false
		},
		onInfinite: {
			type: Function,
			default: undefined,
			required: false
		}
	},
	computed: {
		style() {
			return {
				transform: "translate3d(" + this.left + "px," + this.top + "px,0)",
				'transition-duration': this.boundTime + 'ms'
			};
		},
		barStyle() {
			var height = 0,
				_proportion = 0;
			if (this.$el) {
				var scrollInfo = this.getScroll();
				if (scrollInfo.scrollLength <= this.thresholdI) return;
				_proportion = scrollInfo.container.clientHeight / scrollInfo.body.clientHeight;
				height = _proportion * scrollInfo.container.clientHeight;
			}
			return {
				height: height + 'px',
				transform: "translate3d(" + -this.left + "px," + -this.top * _proportion + "px,0)"
			}
		}
	},
	data: function() {
		return {
			infiniteState: 0,
			infiniteLoading: false,
			refreshState: 0,
			touching: false,
			startX: 0,
			startY: 0,
			speed: 0,
			decay: .95,
			top: 0,
			left: 0,
			barHide: false,
			boundTime: 0,
			oldY: 0,
			requestId: null,
			barTimer: null,
		}
	},
	mounted: function() {
		this.checkBountry(true);
		window.onresize = function() {
			this.checkBountry(true);
		}.bind(this);
		if (this.onInfinite) {
			var scrollInfo = this.getScroll();
			if (scrollInfo.scrollLength <= this.thresholdI) {
				this.infinite();
			}
			this.$on('on-scroll', function(scroll) {
				if (this.infiniteLoading) return;
				var _scrollInfo = this.getScroll();

				var _bottom = _scrollInfo.scrollLength + scroll.scrollTop - _scrollInfo.footerHeight;

				if (_bottom < this.thresholdI) this.infinite();
			})
		}
	},
	methods: {
		scrollTop(value, time) {
			time = Number(time);
			time = isNaN(time) ? 0 : time;
			if (!isNaN(Number(value))) {
				this.boundTime = time;
				this.top = value;
				this.checkBountry(true);
				if (this.boundTime != 0) {
					setTimeout(function() {
						this.boundTime = 0
					}.bind(this), this.boundTime);
				}
			}
		},
		touchStart(e) {
			var scrollInfo = this.getScroll();
			if (scrollInfo.scrollLength <= this.thresholdI) return;
			var s = this.getPosition(e);
			this.startX = s.x - this.left;
			this.startY = s.y - this.top;
			this.oldY = this.top;
			this.touching = true;
			this.boundTime = 0;
			this.barHide = false;
			if (this.barTimer) clearTimeout(this.barTimer);
		},
		touchMove(e) {
			if (!this.touching) return;

			if (e.preventDefault) e.preventDefault();
			else e.returnValue = false;

			this.boundTime = 0;
			var move = this.getPosition(e);

			var diff = {
				x: move.x - this.startX,
				y: move.y - this.startY,
			}
			if (diff.y > 0) {
				this.top = Math.pow(diff.y, 0.8);
			} else {
				this.top = diff.y;
			}
			this.speed = this.top - this.oldY;
			this.oldY = this.top;
			this.onScroll();
			//下拉刷新
			if (this.onRefresh) {
				if (this.refreshState == 2) return;
				if (this.top >= this.thresholdR) {
					this.refreshState = 1;
				} else {
					this.refreshState = 0;
				}
			}

		},
		touchEnd(e) {
			if (!this.touching) return;
			this.touching = false;
			this.move();
			this.barTimer = setTimeout(function() {
				this.barHide = true;
			}.bind(this), 1500);
			if (this.top >= 0) {
				if (this.refreshState == 2) {
					this.top = this.thresholdR;
					return;
				}
				if (this.refreshState == 1) {
					this.refresh();
				} else {
					this.refreshState = 0;
				}
			}
		},
		mouseDown(e) {
			this.touchStart(e)
		},
		mouseMove(e) {
			this.touchMove(e)
		},
		mouseUp(e) {
			this.touchEnd(e)
		},
		move() {
			if (this.requestId) window.cancelAnimationFrame(this.requestId);
			if (!this.touching && this.speed != 0) {
				if ((this.speed >= 1 || this.speed <= -1) && !this.checkIsCritical()) {
					this.top += this.speed;
					this.speed *= this.decay;
					this.onScroll();
				} else {
					this.checkBountry();
					return;
				}
				this.requestId = window.requestAnimationFrame(this.move.bind(this));
			} else {
				this.checkBountry();
			}
		},
		checkBountry(notTransform) {
			if (this.top > 0) {
				this.top = 0;
				this.boundTime = notTransform == true ? 0 : 500;
				this.speed = 0;
				return;
			}
			var scrollInfo = this.getScroll();

			var realScroll = scrollInfo.scrollLength;

			if (realScroll <= this.thresholdI) {
				this.top = 0;
				return;
			}
			if (this.top <= -realScroll) {
				this.top = -realScroll;
				this.boundTime = notTransform == true ? 0 : 500;
				this.speed = 0;
			}
			this.onScroll();
		},
		//检测惯性滑动的时候是否超出临界值 true 超出界线
		checkIsCritical() {
			var scrollInfo = this.getScroll();

			var realTop = scrollInfo.container.clientHeight + Math.abs(this.top);
			var safeDistance = 30;
			// if (this.onInfinite) {
			// 	safeDistance = this.thresholdI < 0 ? this.thresholdI / 2 : safeDistance;
			// }
			var minCritical = this.thresholdR / 2,
				maxCritical = scrollInfo.scrollLength + safeDistance;

			if (this.top > minCritical || this.top < -maxCritical) {
				return true;
			}
			return false;
		},
		getScroll() {
			var scrollContainer = this.$el,
				scrollBody = this.$el.querySelector('.ask-scroll-body'),
				scrollFooter = this.$el.querySelector('.ask-scroll-footer');
			var scrollLength = scrollBody.clientHeight - scrollContainer.clientHeight;
			return {
				container: scrollContainer,
				body: scrollBody,
				footerHeight: scrollFooter ? scrollFooter.clientHeight : 0,
				scrollLength: scrollLength
			}
		},
		onScroll() {
			this.$emit('on-scroll', {
				scrollTop: this.top
			})
		},
		getPosition(e) {
			e = e.originalEvent || e;

			if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend') {
				if (e.type === 'touchend') {
					return {
						x: e.changedTouches[0].pageX,
						y: e.changedTouches[0].pageY
					}
				}
				return {
					x: e.targetTouches[0].pageX,
					y: e.targetTouches[0].pageY
				};
			} else {
				return {
					x: e.pageX,
					y: e.pageY
				};
			}
		},
		refresh() {
			this.refreshState = 2;
			this.top = this.thresholdR;
			this.onRefresh(this.refreshDone);
		},
		refreshDone() {
			this.refreshState = 3;
			setTimeout(function() {
				if (this.touching) {
					this.refreshState = 0;
					return;
				}
				this.top = 0;
				this.boundTime = 300;
				setTimeout(function() {
					this.refreshState = 0;
				}.bind(this), this.boundTime);
			}.bind(this), 500);
		},
		infinite() {
			this.infiniteState = 1;
			this.infiniteLoading = true;
			this.onInfinite(this.infiniteDone);
		},
		infiniteDone() {
			this.infiniteState = 2;
			setTimeout(function() {
				this.infiniteState = 0;
				this.infiniteLoading = false;
			}.bind(this), 500)
		}
	}
}