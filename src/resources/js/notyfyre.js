/**
 * Notyfyre JS 2.0.0
 * ZephyrToast implementation for Laravel
 *
 * Copyright (C) 2025 Rayhan Bapari
 * MIT Licensed
 */

class Notyfyre {
	constructor(options = {}) {
		// Default configuration
		this.defaults = {
			position: 'top-right',
			newestOnTop: true,
			type: 'info',
			duration: 5000,
			pauseOnHover: true,
			showProgress: true,
			animation: {
				in: 'fadeIn',
				out: 'fadeOut',
			},
			message: '',
			title: '',
			allowHtml: false,
			enableIcon: true,
			icon: null,
			isIcon: false,
			showClose: true,
			onClose: null,
			onClick: null,
		};

		// Merge options with defaults
		this.options = { ...this.defaults, ...options };

		// Initialize the container
		this.initializeContainer();

		// Animation classes
		this.animations = {
			fadeIn: 'notyfyre_animate_fadeIn',
			fadeOut: 'notyfyre_animate_fadeOut',
			slideInLeft: 'notyfyre_animate_slideInLeft',
			slideOutLeft: 'notyfyre_animate_slideOutLeft',
			slideInRight: 'notyfyre_animate_slideInRight',
			slideOutRight: 'notyfyre_animate_slideOutRight',
			slideInDown: 'notyfyre_animate_slideInDown',
			slideOutUp: 'notyfyre_animate_slideOutUp',
			slideInUp: 'notyfyre_animate_slideInUp',
			slideOutDown: 'notyfyre_animate_slideOutDown',
			bounceIn: 'notyfyre_animate_bounceIn',
			bounceOut: 'notyfyre_animate_bounceOut',
			zoomIn: 'notyfyre_animate_zoomIn',
			zoomOut: 'notyfyre_animate_zoomOut',
		};

		// Toast class types
		this.types = {
			success: {
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>',
				bgColor: '#e3f7ed',
				textColor: '#3bad71',
				borderColor: '#b5eace',
			},
			info: {
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>',
				bgColor: '#dff0fa',
				textColor: '#2385ba',
				borderColor: '#a9d7f1',
			},
			warning: {
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>',
				bgColor: '#fff5da',
				textColor: '#d9a209',
				borderColor: '#ffe59d',
			},
			error: {
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>',
				bgColor: '#fde8e4',
				textColor: '#cc563d',
				borderColor: '#f9c1b6',
			},
			zen: {
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/></svg>',
				bgColor: '#f4f7f9',
				textColor: '#2e3a59',
				borderColor: '#d8e1e8',
			},
			void: {
				icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/></svg>',
				bgColor: '#111113',
				textColor: '#f1f1f1',
				borderColor: '#111113',
			},
		};
	}

	/**
	 * Initialize the container for toast notifications
	 */
	initializeContainer() {
		// Get or create the container
		this.container = document.getElementById('notyfyre-container');
		if (!this.container) {
			this.container = document.createElement('div');
			this.container.id = 'notyfyre-container';
			document.body.appendChild(this.container);
		}

		// Set position class
		this.container.className = `notyfyre-container notyfyre-position-${this.options.position}`;
	}

	/**
	 * Create a new toast notification
	 * @param {string} message - The message to display
	 * @param {object} options - Custom options for this notification
	 * @returns {HTMLElement} The created toast notification element
	 */
	createToast(message, options = {}) {
		// Merge options with defaults, including theme properties
		const toastOptions = {
			...this.options,
			...options,
			message,
			theme: {
				// Merge theme options (allow user override)
				bgColor: options.theme?.bgColor || this.types[options.type]?.bgColor,
				textColor: options.theme?.textColor || this.types[options.type]?.textColor,
				borderColor: options.theme?.borderColor || this.types[options.type]?.borderColor,
				progressTrackColor: options.theme?.progressTrackColor,
				progressBarColor: options.theme?.progressBarColor,
			},
		};

		// Update position if provided in options
		if (options.position && options.position !== this.options.position) {
			this.updatePosition(options.position);
		}

		// Create toast element
		const toast = document.createElement('div');
		toast.className = `notyfyre-notification notyfyre_animate ${this.animations[toastOptions.animation.in]}`;
		toast.style.backgroundColor = toastOptions.theme.bgColor;
		toast.style.color = toastOptions.theme.textColor;
		toast.style.borderColor = toastOptions.theme.borderColor;

		// Add class if provided
		if (toastOptions.className) {
			toast.classList.add(toastOptions.className);
		}

		// Create toast body
		const toastBody = document.createElement('div');
		toastBody.className = 'notyfyre-notification-body';

		//Adds an icon to the toast notification if `enableIcon` is not explicitly set to false.
		if (toastOptions.enableIcon !== false) {
			const iconDiv = document.createElement('div');
			iconDiv.className = 'notyfyre-notification-icon';

			// Check if a custom icon is provided
			if (toastOptions.icon) {
				if (typeof toastOptions.icon === 'string') {
					if (toastOptions.isIcon) {
						if (toastOptions.icon.match(/\.(jpeg|jpg|gif|png)$/i)) {
							throw new Error('isIcon is true, but an image URL was provided for the icon.');
						}
						iconDiv.innerHTML = `<i class="${toastOptions.icon}"></i>`;
					} else {
						if (toastOptions.icon.match(/\.(jpeg|jpg|gif|png)$/i)) {
							iconDiv.innerHTML = `<img src="${toastOptions.icon}" alt="icon" style="width: 16px; height: 16px;" />`;
						} else {
							iconDiv.innerHTML = toastOptions.icon;
						}
					}
				}
				// If it's an object with specific properties
				else if (typeof toastOptions.icon === 'object') {
					if (toastOptions.icon.url) {
						// Image URL
						iconDiv.innerHTML = `<img src="${toastOptions.icon.url}" alt="icon" style="width: ${
							toastOptions.icon.width || '16px'
						}; height: ${toastOptions.icon.height || '16px'};" />`;
					} else if (toastOptions.icon.fontAwesome) {
						// FontAwesome with specific class
						iconDiv.innerHTML = `<i class="${toastOptions.icon.fontAwesome}"></i>`;
					} else if (toastOptions.icon.svg) {
						// SVG content
						iconDiv.innerHTML = toastOptions.icon.svg;
					}
				}
			} else {
				// Use default icon based on type
				iconDiv.innerHTML = this.types[toastOptions.type].icon;
			}
			toastBody.appendChild(iconDiv);
		}

		// Add content
		const contentDiv = document.createElement('div');
		contentDiv.className = 'notyfyre-notification-content';

		// Add title if provided
		if (toastOptions.title) {
			const titleDiv = document.createElement('div');
			titleDiv.className = 'notyfyre-notification-title';
			titleDiv.textContent = toastOptions.title;
			contentDiv.appendChild(titleDiv);
		}

		// Add message (supports HTML if allowHtml is true)
		const messageDiv = document.createElement('div');
		messageDiv.className = 'notyfyre-notification-message';
		if (toastOptions.allowHtml) {
			messageDiv.innerHTML = toastOptions.message;
		} else {
			messageDiv.textContent = toastOptions.message;
		}
		contentDiv.appendChild(messageDiv);

		toastBody.appendChild(contentDiv);
		toast.appendChild(toastBody);

		// Add close button if enabled
		if (toastOptions.showClose) {
			const closeButton = document.createElement('button');
			closeButton.type = 'button';
			closeButton.className = 'notyfyre-notification-close';
			closeButton.innerHTML = '&times;';
			closeButton.style.color = toastOptions.theme.textColor;
			closeButton.addEventListener('click', () => this.removeToast(toast));
			toastBody.appendChild(closeButton);
		}

		// Add progress bar if enabled
		if (toastOptions.showProgress && toastOptions.duration > 0) {
			const progressBar = document.createElement('div');
			progressBar.className =
				toastOptions.type === 'void' ? 'notyfyre-progress-bar-void' : 'notyfyre-progress-bar';

			// Apply user/default background (track)
			if (toastOptions.theme.progressTrackColor) {
				progressBar.style.backgroundColor = toastOptions.theme.progressTrackColor;
			}

			const progressBarFill = document.createElement('div');
			progressBarFill.className =
				toastOptions.type === 'void' ? 'notyfyre-progress-bar-void-fill' : 'notyfyre-progress-bar-fill';

			// Apply user/default fill color
			if (toastOptions.theme.progressBarColor) {
				progressBarFill.style.backgroundColor = toastOptions.theme.progressBarColor;
			}

			progressBar.appendChild(progressBarFill);
			toast.appendChild(progressBar);

			setTimeout(() => {
				progressBarFill.style.width = '0%';
				progressBarFill.style.transitionDuration = `${toastOptions.duration}ms`;
			}, 10);
		}

		// Add click handler if provided
		if (typeof toastOptions.onClick === 'function') {
			toast.style.cursor = 'pointer';
			toast.addEventListener('click', e => {
				if (
					e.target !== toast &&
					e.target.className !== 'notyfyre-notification-message' &&
					e.target.className !== 'notyfyre-notification-content'
				)
					return;
				toastOptions.onClick();
			});
		}

		// Store options with the toast
		toast._options = toastOptions;

		// Add to container
		if (toastOptions.newestOnTop) {
			this.container.prepend(toast);
		} else {
			this.container.appendChild(toast);
		}

		// Make toast visible
		setTimeout(() => {
			toast.style.opacity = '1';
		}, 10);

		// Auto-remove after duration
		if (toastOptions.duration > 0) {
			toast._timeoutId = setTimeout(() => {
				this.removeToast(toast);
			}, toastOptions.duration);
		}

		// Add pause-on-hover functionality
		if (toastOptions.pauseOnHover && toastOptions.duration > 0) {
			let remainingTime = toastOptions.duration;

			// Pause progress and timer when user hovers over the toast
			toast.addEventListener('mouseenter', () => {
				// Clear the timeout to prevent auto-removal
				if (toast._timeoutId) {
					clearTimeout(toast._timeoutId);
					toast._timeoutId = null;
				}

				// Stop the progress bar animation
				if (toastOptions.showProgress) {
					const progressBarFill = toast.querySelector(
						'.notyfyre-progress-bar-fill, .notyfyre-progress-bar-void-fill',
					);
					if (progressBarFill) {
						// Calculate remaining time based on current width
						const currentWidth = parseFloat(getComputedStyle(progressBarFill).width);
						const fullWidth = parseFloat(getComputedStyle(progressBarFill.parentElement).width);
						remainingTime = toastOptions.duration * (currentWidth / fullWidth);

						// Pause animation by removing transition and keeping current width
						progressBarFill.style.transition = 'none';
						progressBarFill.style.width = `${(currentWidth / fullWidth) * 100}%`;
					}
				}
			});

			// Resume progress and timer when user's mouse leaves the toast
			toast.addEventListener('mouseleave', () => {
				// Restart the timeout with remaining time
				if (!toast._timeoutId && remainingTime > 0) {
					toast._timeoutId = setTimeout(() => {
						this.removeToast(toast);
					}, remainingTime);

					// Restart the progress bar animation
					if (toastOptions.showProgress) {
						const progressBarFill = toast.querySelector(
							'.notyfyre-progress-bar-fill, .notyfyre-progress-bar-void-fill',
						);
						if (progressBarFill) {
							// Resume animation
							setTimeout(() => {
								progressBarFill.style.transition = `width ${remainingTime}ms linear`;
								progressBarFill.style.width = '0%';
							}, 10);
						}
					}
				}
			});
		}

		return toast;
	}

	/**
	 * Remove a toast notification
	 * @param {HTMLElement} toast - The toast element to remove
	 */
	removeToast(toast) {
		// Clear timeout if exists
		if (toast._timeoutId) {
			clearTimeout(toast._timeoutId);
		}

		// Apply exit animation
		toast.classList.remove(this.animations[toast._options.animation.in]);
		toast.classList.add(this.animations[toast._options.animation.out]);

		// Remove after animation completes
		setTimeout(() => {
			if (toast && toast.parentNode) {
				toast.parentNode.removeChild(toast);
				// Call onClose callback if provided
				if (typeof toast._options.onClose === 'function') {
					toast._options.onClose();
				}
			}
		}, 500);
	}

	/**
	 * Remove all toast notifications
	 */
	removeAll() {
		const toasts = this.container.querySelectorAll('.notyfyre-notification');
		toasts.forEach(toast => this.removeToast(toast));
	}

	/**
	 * Show a toast notification with specified type
	 * @param {string} message - The message to display
	 * @param {object} options - Custom options for this notification
	 * @returns {HTMLElement} The created toast notification element
	 */
	show(message, options = {}) {
		return this.createToast(message, options);
	}

	/**
	 * Show a success toast notification
	 * @param {string} message - The message to display
	 * @param {object} options - Custom options for this notification
	 * @returns {HTMLElement} The created toast notification element
	 */
	success(message, options = {}) {
		return this.createToast(message, { ...options, type: 'success' });
	}

	/**
	 * Show an info toast notification
	 * @param {string} message - The message to display
	 * @param {object} options - Custom options for this notification
	 * @returns {HTMLElement} The created toast notification element
	 */
	info(message, options = {}) {
		return this.createToast(message, { ...options, type: 'info' });
	}

	/**
	 * Show a warning toast notification
	 * @param {string} message - The message to display
	 * @param {object} options - Custom options for this notification
	 * @returns {HTMLElement} The created toast notification element
	 */
	warning(message, options = {}) {
		return this.createToast(message, { ...options, type: 'warning' });
	}

	/**
	 * Show an error toast notification
	 * @param {string} message - The message to display
	 * @param {object} options - Custom options for this notification
	 * @returns {HTMLElement} The created toast notification element
	 */
	error(message, options = {}) {
		return this.createToast(message, { ...options, type: 'error' });
	}

	/**
	 * Show a zen toast notification (light theme)
	 * @param {string} message - The message to display
	 * @param {object} options - Custom options for this notification
	 * @returns {HTMLElement} The created toast notification element
	 */
	zen(message, options = {}) {
		return this.createToast(message, { ...options, type: 'zen' });
	}

	/**
	 * Show a void toast notification (dark theme)
	 * @param {string} message - The message to display
	 * @param {object} options - Custom options for this notification
	 * @returns {HTMLElement} The created toast notification element
	 */
	void(message, options = {}) {
		return this.createToast(message, { ...options, type: 'void' });
	}

	/**
	 * Update container position
	 * @param {string} position - New position ('top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center')
	 */
	updatePosition(position) {
		this.options.position = position;
		this.container.className = `notyfyre-container notyfyre-position-${position}`;
	}
}
