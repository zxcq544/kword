
; /* Start:/bitrix/templates/keyword_8/script.js*/
function eshopOpenNativeMenu()
{
	var native_menu = BX("bx_native_menu");
	var is_menu_active = BX.hasClass(native_menu, "active");

	if (is_menu_active)
	{
		BX.removeClass(native_menu, "active");
		BX.removeClass(BX('bx_menu_bg'), "active");
		BX("bx_eshop_wrap").style.position = "";
		BX("bx_eshop_wrap").style.top = "";
		BX("bx_eshop_wrap").style.overflow = "";
	}
	else
	{
		BX.addClass(native_menu, "active");
		BX.addClass(BX('bx_menu_bg'), "active");
		var topHeight = document.body.scrollTop;
		BX("bx_eshop_wrap").style.position = "fixed";
		BX("bx_eshop_wrap").style.top = -topHeight+"px";
		BX("bx_eshop_wrap").style.overflow = "hidden";
	}

	var easing = new BX.easing({
		duration : 300,
		start : { left : (is_menu_active) ? 0 : -100 },
		finish : { left : (is_menu_active) ? -100 : 0 },
		transition : BX.easing.transitions.quart,
		step : function(state){
			native_menu.style.left = state.left + "%";
		}
	});
	easing.animate();
}

window.addEventListener('resize',
	function() {
		if (window.innerWidth >= 640 && BX.hasClass(BX("bx_native_menu"), "active"))
			eshopOpenNativeMenu();
	},
	false
);

/* End */
;
; /* Start:/bitrix/templates/keyword_8/components/bitrix/menu/hor_top_menu/script.js*/
var jshover = function()
{
	var menuDiv = document.getElementById("horizontal-multilevel-menu")
	if (!menuDiv)
		return;

	var sfEls = menuDiv.getElementsByTagName("li");
	for (var i=0; i<sfEls.length; i++) 
	{
		sfEls[i].onmouseover=function()
		{
			this.className+=" jshover";
		}
		sfEls[i].onmouseout=function() 
		{
			this.className=this.className.replace(new RegExp(" jshover\\b"), "");
		}
	}
}

if (window.attachEvent) 
	window.attachEvent("onload", jshover);
/* End */
;
; /* Start:/bitrix/components/api/main.feedback/js/jquery.modal.js*/
/*!
 * CSS Modal
 * http://drublic.github.com/css-modal
 *
 * @author Hans Christian Reinl - @drublic 
 * @version 1.0.3
 */

(function (global) {

	'use strict';

	// Storage variable
	var modal = {};

	// Store for currently active element
	modal.lastActive = undefined;
	modal.activeElement = undefined;

	// Polyfill addEventListener for IE8 (only very basic)
	modal._addEventListener = function (element, event, callback) {
		if (element.addEventListener) {
			element.addEventListener(event, callback, false);
		} else {
			element.attachEvent('on' + event, callback);
		}
	};

	// Hide overlay when ESC is pressed
	modal._addEventListener(document, 'keyup', function (event) {
		var hash = window.location.hash.replace('#', '');

		// If hash is not set
		if (hash === '' || hash === '!') {
			return;
		}

		// If key ESC is pressed
		if (event.keyCode === 27) {
			window.location.hash = '!';

			if (modal.lastActive) {
				return false;
			}

			// Unfocus
			modal.removeFocus();
		}
	}, false);

	// Convenience function to trigger event
	modal._dispatchEvent = function (event, modal) {
		var eventTigger;

		if (!document.createEvent) {
			return;
		}

		eventTigger = document.createEvent('Event');

		eventTigger.initEvent(event, true, true);
		eventTigger.customData = { 'modal': modal };

		document.dispatchEvent(eventTigger);
	};


	// When showing overlay, prevent background from scrolling
	modal.mainHandler = function () {
		var hash = window.location.hash.replace('#', '');
		var modalElement = document.getElementById(hash);
		var htmlClasses = document.documentElement.className;
		var modalChild;
		var oldModal;

		// If the hash element exists
		if (modalElement) {

			// Get first element in selected element
			modalChild = modalElement.children[0];

			// When we deal with a modal and body-class `has-overlay` is not set
			if (modalChild && modalChild.className.match(/modal-inner/)) {
				if (!htmlClasses.match(/has-overlay/)) {

					// Set an html class to prevent scrolling
					document.documentElement.className += ' has-overlay';
				}

				// Unmark previous active element
				if (modal.activeElement) {
					oldModal = modal.activeElement;
					oldModal.className = oldModal.className.replace(' is-active', '');
				}
				// Mark modal as active
				modalElement.className += ' is-active';
				modal.activeElement = modalElement;

				// Set the focus to the modal
				modal.setFocus(hash);

				// Fire an event
				modal._dispatchEvent('cssmodal:show', modal.activeElement);
			}
		} else {
			document.documentElement.className =
					htmlClasses.replace(' has-overlay', '');

			// If activeElement is already defined, delete it
			if (modal.activeElement) {
				modal.activeElement.className =
						modal.activeElement.className.replace(' is-active', '');

				// Fire an event
				modal._dispatchEvent('cssmodal:hide', modal.activeElement);

				// Reset active element
				modal.activeElement = null;

				// Unfocus
				modal.removeFocus();
			}
		}
	};

	modal._addEventListener(window, 'hashchange', modal.mainHandler);
	modal._addEventListener(window, 'load', modal.mainHandler);

	/*
	 * Accessibility
	 */

	// Focus modal
	modal.setFocus = function () {
		if (modal.activeElement) {

			// Set element with last focus
			modal.lastActive = document.activeElement;

			// New focussing
			modal.activeElement.focus();
		}
	};

	// Unfocus
	modal.removeFocus = function () {
		if (modal.lastActive) {
			modal.lastActive.focus();
		}
	};

	// Export CSSModal into global space
	global.CSSModal = modal;

}(window));

/* End */
;
; /* Start:/bitrix/components/api/main.feedback/js/_fn.js*/
/**
 * Created by Tuning-Soft on 16.02.2014
 */
$(function(){

    // значение по умолчанию
    var defaults = { color:'#FB4D4D' };

    // актуальные настройки, глобальные
    var options;

    $.fn.validateMainFeedback = function(params){
        // при многократном вызове функции настройки будут сохранятся, и замещаться при необходимости
        options = $.extend({}, defaults, options, params);
        //console.log(this); // jQuery
        //console.log(this.length); // число элементов

        var formObj = this;
        var error = false;
        var ts_field = '[class*="ts-field-"]';
        var ts_field_error = '<span class="ts-field-error"></span>';
        var ts_field_saccess = '<span class="ts-field-saccess"></span>';
        var input_required = 'input.required';

        //Проверка отправки формы
        $(formObj).find(':submit').click(function(e){

            //input[type="text"]
            $(formObj).find(input_required).each(function(){

                if( $(this).val() == '')
                {
                    $(this).next(ts_field).remove();
                    $(this).after(ts_field_error);
                    error = true;
                }
                else
                {
                    $(this).next(ts_field).remove();
                    $(this).after(ts_field_saccess);
                    error = false;
                }


                if(error)
                    e.preventDefault();
            });
            //Проверка при изменении полей
            $(formObj).find('input.required').on('keyup change', function(e){
                if($(this).val() != '')
                {
                    $(this).next(ts_field).remove();
                    $(this).after(ts_field_saccess);
                    error = false;
                }
                else
                {
                    $(this).next(ts_field).remove();
                    $(this).after(ts_field_error);
                    error = true;
                }

                if(error)
                    e.preventDefault();
            });
            //\\input[type="text"]

            //textarea
            $(formObj).find('textarea.required').each(function(){
                if($(this).val() == '')
                {
                    //css('border-color', options.color)
                    $(this).parent().find(ts_field).remove();
                    $(this).after(ts_field_error);
                    error = true;
                }
                else
                {
                    $(this).parent().find(ts_field).remove();
                    $(this).after(ts_field_saccess);
                    error = false;
                }

                if(error)
                    e.preventDefault();

            });
            //Проверка при изменении полей
            $(formObj).find('textarea.required').on('keyup click change',function(e){
                if($(this).val() != '')
                {
                    $(this).parent().find(ts_field).remove();
                    $(this).after(ts_field_saccess);
                    error = false;
                }
                else
                {
                    $(this).parent().find(ts_field).remove();
                    $(this).after(ts_field_error);
                    error = true;
                }

                if(error)
                    e.preventDefault();
            });
            //\\textarea

            //select
            $(formObj).find('select.required').each(function(){
                if($(this).find('option:selected').length == 0)
                {
                    //css('border-color', options.color)
                    $(this).parent().find(ts_field).remove();
                    $(this).after(ts_field_error);
                    error = true;
                }
                else
                {
                    $(this).parent().find(ts_field).remove();
                    $(this).after(ts_field_saccess);
                    error = false;
                }

                if(error)
                    e.preventDefault();

            });
            //Проверка при изменении полей
            $(formObj).find('select.required').change(function(e){
                if($(this).find('option:selected').length)
                {
                    $(this).parent().find(ts_field).remove();
                    $(this).after(ts_field_saccess);
                    error = false;
                }
                else
                {
                    $(this).parent().find(ts_field).remove();
                    $(this).after(ts_field_error);
                    error = true;
                }

                if(error)
                    e.preventDefault();
            });
            //\\select


            ////////////////////////////////////////////////////////////
            //                          v1.2.9                       //
            ///////////////////////////////////////////////////////////

            //input[type="checkbox"]
            $(formObj).find('.option-qroup.required').each(function(){

                if( !$(this).find('input:checked').length)
                {
                    $(this).parent().find(ts_field).remove();
                    $(this).after(ts_field_error);
                    error = true;
                }
                else
                {
                    $(this).parent().find(ts_field).remove();
                    $(this).after(ts_field_saccess);
                    error = false;
                }


                if(error)
                    e.preventDefault();
            });
            //Проверка при изменении полей
            $(formObj).find('.option-qroup.required').on('keyup change', function(e){
                if($(this).find('input:checked').length)
                {
                    $(this).parent().find(ts_field).remove();
                    $(this).after(ts_field_saccess);
                    error = false;
                }
                else
                {
                    $(this).parent().find(ts_field).remove();
                    $(this).after(ts_field_error);
                    error = true;
                }

                if(error)
                    e.preventDefault();
            });
            //\\input[type="checkbox"]


        });

        //$(this).click(function(){
          //  $(this).css('color', options.color);
        //});

        return this;
    };

});
/* End */
;
; /* Start:/bitrix/components/api/main.feedback/js/prettyComments.js*/
/* ------------------------------------------------------------------------
	Pretty Comments
	
	Developped By: Stephane Caron (http://www.no-margin-for-errors.com)
	Inspired By: The facebook textarea :)
	Version: 1.4
	
	Copyright: Feel free to redistribute the script/modify it, as
			   long as you leave my infos at the top.
------------------------------------------------------------------------- */

	eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('$.C.D=4(b){b=E.F({8:i,o:\'G\',j:H,5:i,p:q},b);$(\'I\').J(\'<t K="1"></t>\');k c=4(a){$("#1").2({\'L\':\'M\',\'N\':-u,\'O\':-u,\'v\':$(a).v(),\'P-0\':$(a).0(),\'l-w\':$(a).2(\'l-w\'),\'l-x\':$(a).2(\'l-x\'),\'z-0\':$(a).2(\'z-0\')});3($.A.Q&&R($.A.S)<7){$("#1").2(\'0\',$(a).0())}};k d=4(a){m=$(a).T(\'U\')||"";m=m.V(/\\n/g,\'<B />\');$("#1").W(m+\'<B />\');3(!b.p){3($("#1").0()>$(a).0()){3($(\'#1\').0()>b.j){$(a).2(\'9-y\',\'r\')}h{$(a).2(\'9-y\',\'s\');e(a)}}h 3($("#1").0()<$(a).0()){3($(\'#1\').0()>b.j){$(a).2(\'9-y\',\'r\')}h{$(a).2(\'9-y\',\'s\');f(a)}}}};k e=4(a){3(b.8&&!b.5){b.5=q;$(a).8({\'0\':$("#1").0()},b.o,4(){b.5=i})}h 3(!b.8&&!b.5){$(a).0($("#1").0())}};k f=4(a){3(b.8&&!b.5){b.5=q;$(a).8({\'0\':$("#1").0()},b.o,4(){b.5=i})}h{$(a).0($("#1").0())}};$(6).X(4(){$(6).2({\'9\':\'s\'}).Y(\'Z\',4(){d($(6))});c(6);d($(6));3($("#1").0()>b.j){$(6).2({\'9-y\':\'r\',\'0\':b.j})}h{$(6).0($("#1").0())};b.p=i})};',62,62,'height|comment_hidden|css|if|function|alreadyAnimated|this||animate|overflow||||||||else|false|maxHeight|var|font|theValue||animationSpeed|init|true|scroll|hidden|div|10000|width|family|size||line|browser|br|fn|prettyComments|jQuery|extend|fast|500|body|append|id|position|absolute|top|left|min|msie|parseFloat|version|attr|value|replace|html|each|bind|keyup'.split('|'),0,{}))
/* End */
;; /* /bitrix/templates/keyword_8/script.js*/
; /* /bitrix/templates/keyword_8/components/bitrix/menu/hor_top_menu/script.js*/
; /* /bitrix/components/api/main.feedback/js/jquery.modal.js*/
; /* /bitrix/components/api/main.feedback/js/_fn.js*/
; /* /bitrix/components/api/main.feedback/js/prettyComments.js*/
