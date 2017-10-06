$(document).ready(function() {

	"use strict";

	var selectDefault = $('.select-default');

	selectDefault.each(function() {
		var that = $(this),
			selectOption = that.find("option"),
			selectLength = selectOption.length,
			selectPlaceholder = that.attr('data-placeholder');
		
		 that.wrap('<div class="select js-select"></div>');
		
		var select = that.parents('.js-select');
	
		$('<ul class="select__list js-select-list"></ul>').appendTo(select);

		var selectList = select.find('.js-select-list');
		
		for(var i = 0; i < selectLength; i++) {
			var selectItem = $('<li>' + selectOption.eq(i).text() +'</li>');

			selectItem.appendTo(selectList);
		}
		
		$('<span class="select__text js-select-text"></span>').prependTo(select);
		
		var selectText = select.find('.js-select-text');
		
		selectText.text(selectPlaceholder);
	});

	$(document).click(function(e) {
		var element = $('.js-select');

		if (!$(e.target).closest('.js-select').length) {
		element.removeClass('is-open');
		}
	});

	$('.js-select-text').click(function(){
		var that = $(this),
			select = that.parents('.js-select'),
			allSelects = $('.js-select');

		if(!select.hasClass('is-open')) {
		allSelects.removeClass('is-open');
		select.addClass('is-open'); 
		} else {
		select.removeClass('is-open');
		}
	});

	$('.js-select-list li').on('click', function(){
		var that = $(this),
			select = that.parents('.js-select'),
			selectText = select.find('.js-select-text'),
			itemIndex = that.index(),
			itemValue = that.text(),
			selectOption = select.find('option'),
			selectDefault = select.find('.select-default');

		selectText.text(itemValue);
		selectOption.prop('selected', false);
		selectOption.eq(itemIndex).prop('selected', true);
		selectDefault.trigger('change');
		select.removeClass('is-open');
	});

	selectDefault.on('change', function() {
		var that = $(this),
			select = that.parents('.js-select'),
			selectText = select.find('.js-select-text'),
			current = that.find('option:selected').text();
		
		selectText.text(current);
		select.removeClass('is-open');
		console.log(current);
	});

	var $input = $('.js-input');

	$input.on('focus', function() {
		var $group = $(this).closest('.form-group');
		var $label = $group.find('label');

		if(!$group.hasClass('is-focused')) {
			$group.addClass('is-focused');
		}
	});

	$input.on('blur', function() {
		var val = $(this).val();
		var $group = $(this).closest('.form-group');
		var $label = $group.find('label');

		if( $group.hasClass('is-focused') && val !== '') {
			$group.addClass('is-completed');
			return;
		}

		$group.removeClass('is-focused');
		$group.removeClass('is-completed');
	});

	class Slider {
		constructor(options) {
			this.slider = options.slider;
			this.items  = options.items;
			this.init(
				this.createSliderItems.bind(this),
				this.createSliderTrack.bind(this),
				this.createSliderPointer.bind(this),
				this.dragPointer.bind(this)
			);
		}
		createElement(htmlElement, elementClassName) {
			let el = document.createElement(htmlElement);
			el.className = elementClassName;

			return el;
		}
		appendElement(elem, parent, text) {
			if(!elem || !parent) throw new Error('elem и parent обязательны');
			if(typeof text === 'string') elem.innerHTML = text;

			parent.appendChild(elem);
		}
		createSliderTrack(slider) {
			let track = this.createElement('div', 'slider__track');
			this.appendElement(track, slider);
		}
		createSliderItems(slider, items) {
			for(let txt of items) {
				let item = this.createElement('div', 'slider__item');
				this.appendElement(item, slider, txt);
			}
		}
		createSliderPointer(slider) {
			let pointer = this.createElement('div', 'slider__pointer js-slider-pointer');
			this.appendElement(pointer, slider);

		}
		pointerOnMousedownHundler(e) {
			let el = this;
			let offset = e.pageX - el.offsetWidth / 2 + 'px';

			el.style.cssText = "\
				z-index: 9999; \
				cursor: pointer; \
				transform: translateX(`#{offset}`px); \
			";
			// el.style.transform = `translateX(${offset})`;

			// console.log(el.style)

		}
		dragPointer(hundler) {
			let sliderPointer = document.querySelector('.js-slider-pointer');

			sliderPointer.addEventListener('mousedown', hundler, false);
			
		}
		init(createSliderItems, createSliderTrack, createSliderPointer, dragPointer) {
			let slider = this.slider;
			let items  = this.items;

			createSliderItems(slider, items);
			createSliderTrack(slider);
			createSliderPointer(slider);
			dragPointer(this.pointerOnMousedownHundler);
		}

	}

	let slider = new Slider({
		slider: document.querySelector('.js-slider'),
		items: [
			'Не владею',
			'Использую готовые решения',
			'Использую готовые решения и умею переделывать',
			'Пишу сложный JS с нуля'
		]
	});

});

