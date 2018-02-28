/*
 * @Author: askMeWhy
 * @Date:   2018-02-26 15:25:55
 * @Last Modified by:   bigWave
 * @Last Modified time: 2018-02-28 11:26:31
 */
/**
 * 左右侧滑，点击选中并居中组件
 * @Author   陈龙
 * @DateTime 2018-02-27
 * @version  [version]
 * @param    {[String]}   defaultActive 默认选中
 * @param    {[Array]}   list 导航栏数据[{content:"导航栏内容,可以为HTML  必传"}]
 * @param    {[Number]}   lineWidth 导航栏底部选中线条高度
 * @param    {[Boolean]}   vertical 暂时未做此功能
 * 
 * @item-click 每个节点点击的回调，会返回当前节点索引和当前节点相关数据
 */
var slideNav = {
	template: '\
	<div class="ask-slide-nav">\
			<ul class="ask-sn-list">\
				<template v-for="(item,$i) in list">\
					<li class="ask-sn-item" \
						:class="{\'active\': activeIndex == $i}"\
						:data-index=$i \
						@click="onClick(item,$i)">\
						<span v-html="item.content"></span>\
					</li>\
				</template>\
				<div class="ask-sn-ink-bar" :class="barClass" :style="barStyle"></div>\
			</ul>\
		</div>\
	',
	computed: {
		barLeft: function() {
			var distance = 0;
			if (this.currentItemEl) {
				var curEl = $(this.currentItemEl),
					scrollEl = curEl.closest('.ask-slide-nav');

				distance = curEl.position().left;
				scrollEl.animate({
					"scrollLeft": distance + curEl.outerWidth() / 2 - scrollEl.outerWidth() / 2
				})
				var pEl = curEl.closest('.ask-sn-list');

				distance = (distance / pEl.outerWidth()).toFixed(4) * 100 + '%';
			}
			return distance;
		},
		barRight: function() {
			var distance = '100%';
			if (this.currentItemEl) {
				var curEl = $(this.currentItemEl),
					scrollBody = $(this.currentItemEl).closest('.ask-sn-list');

				var scrollLength = scrollBody.outerWidth();
				distance = scrollLength - curEl.position().left - curEl.outerWidth();
				var pEl = curEl.closest('.ask-sn-list');
				distance = (distance / pEl.outerWidth()).toFixed(4) * 100 + '%';
			}
			return distance;
		},
		barStyle: function() {
			var commonStyle;
			if (this.vertical) {
				commonStyle = {
					top: this.barLeft,
					bottom: this.barRight,
					display: 'block',
					width: this.lineWidth + 'px'
				}
			} else {
				commonStyle = {
					left: this.barLeft,
					right: this.barRight,
					display: 'block',
					height: this.lineWidth + 'px'
				}
			}

			return commonStyle;
		},
		barClass: function() {
			return {
				'ink-bar-transition-forward': this.direction === 'forward',
				'ink-bar-transition-backward': this.direction === 'backward'
			}
		}
	},
	props: {
		defaultActive: {
			type: String,
			default: ''
		},
		list: {
			type: Array,
			default: []
		},
		lineWidth: {
			type: Number,
			default: 2
		},
		vertical: {
			type: Boolean,
			default: false
		}
	},
	data: function() {
		return {
			currentItemEl: null,
			direction: "forward",
			activeIndex: this.defaultActive
		}
	},
	mounted: function() {
		this.currentItemEl = $('.ask-sn-item')[this.activeIndex];
	},
	methods: {
		onClick: function(item, index) {
			this.activeIndex = index;
			this.$emit('item-click', item, index);
		}
	},
	watch: {
		defaultActive: function(value) {
			const item = this.list[value];
			if (item) {
				this.activeIndex = value;
			} else {
				this.activeIndex = "";
			}
		},
		activeIndex(n, o) {
			this.currentItemEl = $('.ask-sn-item')[this.activeIndex];
			this.direction = n > o ? 'forward' : 'backward';
		},
		list(n) {
			this.$nextTick(function() {
				this.currentItemEl = $('.ask-sn-item')[this.activeIndex];
			}.bind(this))
		}
	}
}