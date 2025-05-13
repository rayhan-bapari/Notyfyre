/*!
 * Notyfyre js 1.2.0
 * https://github.com/rayhan-bapari/Notyfyre
 * @license MIT licensed
 *
 * Copyright (C) 2025 Rayhan Bapari
 * Based on Toastify JS
 */
(function (root, factory) {
	if (typeof module === 'object' && module.exports) {
		module.exports = factory();
	} else {
		root.Notyfyre = factory();
	}
})(this, function (global) {
	// Object initialization
	var Notyfyre = function (options) {
			// Returning a new init object
			return new Notyfyre.lib.init(options);
		},
		// Library version
		version = '1.1.0';

	// Set the default global options
	Notyfyre.defaults = {
		oldestFirst: true,
		text: 'Notyfyre notification!',
		node: undefined,
		duration: 3000,
		selector: undefined,
		callback: function () {},
		destination: undefined,
		newWindow: false,
		close: false,
		gravity: 'top', // top or bottom
		position: 'right', // left, right, or center
		backgroundColor: '',
		avatar: '',
		className: '',
		stopOnFocus: true,
		onClick: function () {},
		offset: { x: 0, y: 0 },
		escapeMarkup: true,
		ariaLive: 'polite',
		style: { background: '' },
		progressBar: true,
		progressBarColor: '',
		animation: {
			in: 'fadeIn',
			out: 'fadeOut',
		},
		// New icon options
		iconEnabled: false,
		icon: null,
		iconPosition: 'left', // left or right
		iconSize: '24px',
	};

	// Defining the prototype of the object
	Notyfyre.lib = Notyfyre.prototype = {
		notyfyre: version,

		constructor: Notyfyre,

		// Initializing the object with required parameters
		init: function (options) {
			// Verifying and validating the input object
			if (!options) {
				options = {};
			}

			// Creating the options object
			this.options = {};

			this.toastElement = null;

			// Validating the options
			this.options.text = options.text || Notyfyre.defaults.text; // Display message
			this.options.node = options.node || Notyfyre.defaults.node; // Display content as node
			this.options.duration = options.duration === 0 ? 0 : options.duration || Notyfyre.defaults.duration; // Display duration
			this.options.selector = options.selector || Notyfyre.defaults.selector; // Parent selector
			this.options.callback = options.callback || Notyfyre.defaults.callback; // Callback after display
			this.options.destination = options.destination || Notyfyre.defaults.destination; // On-click destination
			this.options.newWindow = options.newWindow || Notyfyre.defaults.newWindow; // Open destination in new window
			this.options.close = options.close || Notyfyre.defaults.close; // Show toast close icon
			this.options.gravity = options.gravity || Notyfyre.defaults.gravity; // toast position - top or bottom
			this.options.position = options.position || Notyfyre.defaults.position; // toast position - left, right, center
			this.options.backgroundColor = options.backgroundColor || Notyfyre.defaults.backgroundColor; // toast background color
			this.options.avatar = options.avatar || Notyfyre.defaults.avatar; // img element src - url or a path
			this.options.className = options.className || Notyfyre.defaults.className; // additional class names for the toast
			this.options.stopOnFocus =
				options.stopOnFocus === undefined ? Notyfyre.defaults.stopOnFocus : options.stopOnFocus; // stop timeout on focus
			this.options.onClick = options.onClick || Notyfyre.defaults.onClick; // Callback after click
			this.options.offset = options.offset || Notyfyre.defaults.offset; // toast offset
			this.options.escapeMarkup =
				options.escapeMarkup !== undefined ? options.escapeMarkup : Notyfyre.defaults.escapeMarkup;
			this.options.ariaLive = options.ariaLive || Notyfyre.defaults.ariaLive;
			this.options.style = options.style || Notyfyre.defaults.style;

			// New options
			this.options.progressBar =
				options.progressBar !== undefined ? options.progressBar : Notyfyre.defaults.progressBar;
			this.options.progressBarColor = options.progressBarColor || Notyfyre.defaults.progressBarColor;
			this.options.animation = options.animation || Notyfyre.defaults.animation;

			// Icon options
			this.options.iconEnabled =
				options.iconEnabled !== undefined ? options.iconEnabled : Notyfyre.defaults.iconEnabled;
			this.options.icon = options.icon || Notyfyre.defaults.icon;
			this.options.iconPosition = options.iconPosition || Notyfyre.defaults.iconPosition;
			this.options.iconSize = options.iconSize || Notyfyre.defaults.iconSize;

			if (options.backgroundColor) {
				this.options.style.background = options.backgroundColor;
			}

			// Returning the current object for chaining functions
			return this;
		},

		// Building the DOM element
		buildToast: function () {
			// Validating if the options are defined
			if (!this.options) {
				throw 'Notyfyre is not initialized';
			}

			// Creating the DOM object
			var divElement = document.createElement('div');
			divElement.className = 'notyfyre';

			// Add animation class
			divElement.className += ' ' + this.options.animation.in;

			if (this.options.className) {
				divElement.className += ' ' + this.options.className;
			}

			// Positioning toast to left or right or center
			divElement.className += ' notyfyre-' + this.options.position;

			// Assigning gravity of element
			divElement.className += ' notyfyre-' + this.options.gravity;

			if (this.options.backgroundColor) {
				console.warn(
					'DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.',
				);
			}

			// Loop through our style object and apply styles to divElement
			for (var property in this.options.style) {
				divElement.style[property] = this.options.style[property];
			}

            // Announce the toast to screen readers
            if (this.options.ariaLive) {
                divElement.setAttribute('aria-live', this.options.ariaLive);
            }

			// Create a wrapper for message content (for better styling with icons)
			var contentWrapper = document.createElement('div');
			contentWrapper.className = 'notyfyre-content';

			// Add icon if enabled
			if (this.options.iconEnabled && this.options.icon) {
				var iconWrapper = document.createElement('div');
				iconWrapper.className = 'notyfyre-icon';
				iconWrapper.style.width = this.options.iconSize;
				iconWrapper.style.height = this.options.iconSize;
				iconWrapper.innerHTML = this.options.icon;

				// Always add icon at the beginning of the content wrapper
				contentWrapper.appendChild(iconWrapper);
			}

			// Create message element
			var messageElement = document.createElement('div');
			messageElement.className = 'notyfyre-message';

			// Adding the toast message/node
			if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) {
				// If we have a valid node, we insert it
				messageElement.appendChild(this.options.node);
			} else {
				if (this.options.escapeMarkup) {
					messageElement.innerText = this.options.text;
				} else {
					messageElement.innerHTML = this.options.text;
				}
			}

			// Add message after icon
			contentWrapper.appendChild(messageElement);

			// Add the content wrapper to the main element
			divElement.appendChild(contentWrapper);

			if (this.options.avatar !== '') {
				var avatarElement = document.createElement('img');
				avatarElement.src = this.options.avatar;
				avatarElement.className = 'notyfyre-avatar';
				contentWrapper.insertBefore(avatarElement, contentWrapper.firstChild);
			}

			// Adding a close icon to the toast
			if (this.options.close === true) {
				// Create a button for close element
				var closeElement = document.createElement('button');
				closeElement.type = 'button';
				closeElement.setAttribute('aria-label', 'Close');
				closeElement.className = 'notyfyre-close';
				closeElement.innerHTML = '&#10006;';

				// Triggering the removal of toast from DOM on close click
				closeElement.addEventListener(
					'click',
					function (event) {
						event.stopPropagation();
						this.removeElement(this.toastElement);
						window.clearTimeout(this.toastElement.timeOutValue);
					}.bind(this),
				);

				// Always add close icon to the toast (outside the content wrapper)
				divElement.appendChild(closeElement);
			}

			// Add progress bar
			if (this.options.progressBar && this.options.duration > 0) {
				var progressElement = document.createElement('div');
				progressElement.className = 'notyfyre-progress';

				if (this.options.progressBarColor) {
					progressElement.style.background = this.options.progressBarColor;
				}

				divElement.appendChild(progressElement);
			}

			// Adding offset
			if (typeof this.options.offset === 'object') {
				var x = getAxisOffsetAValue('x', this.options);
				var y = getAxisOffsetAValue('y', this.options);

				var xOffset = this.options.position === 'left' ? x : '-' + x;
				var yOffset = this.options.gravity === 'top' ? y : '-' + y;

				divElement.style.transform = 'translate(' + xOffset + ',' + yOffset + ')';
			}

			// Returning the generated element
			return divElement;
		},

		// Displaying the toast
		showToast: function () {
			// Creating the DOM object for the toast
			this.toastElement = this.buildToast();

			// Getting the root element to with the toast needs to be added
			var rootElement;
			if (typeof this.options.selector === 'string') {
				rootElement = document.getElementById(this.options.selector);
			} else if (
				this.options.selector instanceof HTMLElement ||
				(typeof ShadowRoot !== 'undefined' && this.options.selector instanceof ShadowRoot)
			) {
				rootElement = this.options.selector;
			} else {
				rootElement = document.body;
			}

			// Validating if root element is present in DOM
			if (!rootElement) {
				throw 'Root element is not defined';
			}

			// Adding the DOM element
			var elementToInsert = Notyfyre.defaults.oldestFirst ? rootElement.firstChild : rootElement.lastChild;
			rootElement.insertBefore(this.toastElement, elementToInsert);

			// Repositioning the toasts in case multiple toasts are present
			Notyfyre.reposition();

			// Animate the progress bar
			if (this.options.progressBar && this.options.duration > 0) {
				var progressElement = this.toastElement.querySelector('.notyfyre-progress');
				if (progressElement) {
					setTimeout(
						function () {
							progressElement.style.transition = 'width ' + this.options.duration + 'ms linear';
							progressElement.style.width = '0%';
						}.bind(this),
						10,
					);
				}
			}

			// Clear timeout while toast is focused
			if (this.options.stopOnFocus && this.options.duration > 0) {
				var self = this;
				// stop countdown
				this.toastElement.addEventListener('mouseover', function (event) {
					window.clearTimeout(self.toastElement.timeOutValue);

					// Pause progress bar animation
					if (self.options.progressBar) {
						var progressElement = self.toastElement.querySelector('.notyfyre-progress');
						if (progressElement) {
							var computedStyle = window.getComputedStyle(progressElement);
							var width = computedStyle.getPropertyValue('width');
							progressElement.style.transition = 'none';
							progressElement.style.width = width;
						}
					}
				});

				// add back the timeout
				this.toastElement.addEventListener('mouseleave', function () {
					// Get remaining time
					var remainingTime = self.options.duration;

					if (self.options.progressBar) {
						var progressElement = self.toastElement.querySelector('.notyfyre-progress');
						if (progressElement) {
							var computedStyle = window.getComputedStyle(progressElement);
							var width = parseFloat(computedStyle.getPropertyValue('width'));
							var totalWidth =
								parseFloat(computedStyle.getPropertyValue('width')) +
								parseFloat(computedStyle.getPropertyValue('padding-left')) +
								parseFloat(computedStyle.getPropertyValue('padding-right'));

							var percentage = width / totalWidth;
							remainingTime = self.options.duration * percentage;

							progressElement.style.transition = 'width ' + remainingTime + 'ms linear';
							progressElement.style.width = '0%';
						}
					}

					self.toastElement.timeOutValue = window.setTimeout(function () {
						// Remove the toast from DOM
						self.removeElement(self.toastElement);
					}, remainingTime);
				});
			}

			if (this.options.duration > 0) {
				this.toastElement.timeOutValue = window.setTimeout(
					function () {
						// Remove the toast from DOM
						this.removeElement(this.toastElement);
					}.bind(this),
					this.options.duration,
				); // Binding `this` for function invocation
			}

			// Adding an on-click destination path
			if (typeof this.options.destination !== 'undefined') {
				this.toastElement.addEventListener(
					'click',
					function (event) {
						event.stopPropagation();
						if (this.options.newWindow === true) {
							window.open(this.options.destination, '_blank');
						} else {
							window.location = this.options.destination;
						}
					}.bind(this),
				);
			}

			if (typeof this.options.onClick === 'function' && typeof this.options.destination === 'undefined') {
				this.toastElement.addEventListener(
					'click',
					function (event) {
						event.stopPropagation();
						this.options.onClick();
					}.bind(this),
				);
			}

			// Supporting function chaining
			return this;
		},

		hideToast: function () {
			if (this.toastElement && this.toastElement.timeOutValue) {
				clearTimeout(this.toastElement.timeOutValue);
			}
			if (this.toastElement) {
				this.removeElement(this.toastElement);
			}
			return this;
		},

		// Removing the element from the DOM
		removeElement: function (toastElement) {
			// Hiding the element with animation
			toastElement.className = toastElement.className.replace(
				this.options.animation.in,
				this.options.animation.out,
			);

			// Removing the element from DOM after transition end
			window.setTimeout(
				function () {
					// remove options node if any
					if (this.options.node && this.options.node.parentNode) {
						this.options.node.parentNode.removeChild(this.options.node);
					}

					// Remove the element from the DOM, only when the parent node was not removed before.
					if (toastElement.parentNode) {
						toastElement.parentNode.removeChild(toastElement);
					}

					// Calling the callback function
					this.options.callback.call(toastElement);

					// Repositioning the toasts again
					Notyfyre.reposition();
				}.bind(this),
				400,
			); // Binding `this` for function invocation
		},
	};

	// Positioning the toasts on the DOM
	Notyfyre.reposition = function () {
		// Top margins with gravity
		var topLeftOffsetSize = {
			top: 15,
			bottom: 15,
		};
		var topRightOffsetSize = {
			top: 15,
			bottom: 15,
		};
		var topCenterOffsetSize = {
			top: 15,
			bottom: 15,
		};

		// Get all toast messages on the DOM
		var allToasts = document.getElementsByClassName('notyfyre');

		var classUsed;

		// Modifying the position of each toast element
		for (var i = 0; i < allToasts.length; i++) {
			// Getting the applied gravity
			if (containsClass(allToasts[i], 'notyfyre-top')) {
				classUsed = 'top';
			} else {
				classUsed = 'bottom';
			}

			var height = allToasts[i].offsetHeight;
			// Spacing between toasts
			var offset = 15;

			// Show toast in position
			if (containsClass(allToasts[i], 'notyfyre-left')) {
				// Setting the position for left
				allToasts[i].style[classUsed] = topLeftOffsetSize[classUsed] + 'px';
				topLeftOffsetSize[classUsed] += height + offset;
			} else if (containsClass(allToasts[i], 'notyfyre-center')) {
				// Setting the position for center (need to center horizontally as well)
				allToasts[i].style[classUsed] = topCenterOffsetSize[classUsed] + 'px';
				allToasts[i].style.left = '50%';
				allToasts[i].style.transform = 'translateX(-50%)';
				topCenterOffsetSize[classUsed] += height + offset;
			} else {
				// Default is right position
				allToasts[i].style[classUsed] = topRightOffsetSize[classUsed] + 'px';
				topRightOffsetSize[classUsed] += height + offset;
			}
		}

		// Supporting function chaining
		return this;
	};

	// Helper function to get offset.
	function getAxisOffsetAValue(axis, options) {
		if (options.offset[axis]) {
			if (isNaN(options.offset[axis])) {
				return options.offset[axis];
			} else {
				return options.offset[axis] + 'px';
			}
		}

		return '0px';
	}

	function containsClass(elem, yourClass) {
		if (!elem || typeof yourClass !== 'string') {
			return false;
		} else if (elem.className && elem.className.trim().split(/\s+/gi).indexOf(yourClass) > -1) {
			return true;
		} else {
			return false;
		}
	}

	// Setting up the prototype for the init object
	Notyfyre.lib.init.prototype = Notyfyre.lib;

	// Returning the Notyfyre function to be assigned to the window object/module
	return Notyfyre;
});
