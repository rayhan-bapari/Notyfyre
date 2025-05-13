/*!
 * Notyfyre js 1.2.0
 * https://github.com/rayhan-bapari/Notyfyre
 * @license MIT licensed
 *
 * Copyright (C) 2025 Rayhan Bapari
 * Toast functionality inspired by ZephyrToast
 */
(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Notyfyre = factory();
    }
})(this, function () {
    // Notyfyre constructor
    var Notyfyre = function (options) {
        return new Notyfyre.lib.init(options);
    };

    // Library version
    var version = '1.5.0';

    // Default global options
    Notyfyre.defaults = {
        oldestFirst: false,
        text: 'Notyfyre notification!',
        node: undefined,
        duration: 3000,
        selector: undefined,
        callback: function () {},
        destination: undefined,
        newWindow: false,
        close: true,
        gravity: 'top',
        position: 'right',
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
            in: 'fade-in',
            out: 'fade-out',
        },
        // New icon options
        iconEnabled: true,
        icon: null,
        iconPosition: 'left',
        iconSize: '24px',
        title: '',
        allowHtml: false,
        // Animation speed
        animationDuration: 0.75,
    };

    // Toast types with icons and styling
    Notyfyre.types = {
        success: {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>',
            bgColor: "linear-gradient(135deg, #42e695, #3bb2b8)",
            textColor: "#ffffff",
            borderColor: "#b5eace",
        },
        info: {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>',
            bgColor: "linear-gradient(135deg, #73a5ff, #5477f5)",
            textColor: "#ffffff",
            borderColor: "#a9d7f1",
        },
        warning: {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>',
            bgColor: "linear-gradient(135deg, #ffca3a, #ff9a3a)",
            textColor: "#ffffff",
            borderColor: "#ffe59d",
        },
        error: {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>',
            bgColor: "linear-gradient(135deg, #ff5e7a, #ff3c6f)",
            textColor: "#ffffff",
            borderColor: "#f9c1b6",
        },
        zen: {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/></svg>',
            bgColor: "linear-gradient(135deg, #f4f7f9, #e6eaef)",
            textColor: "#2e3a59",
            borderColor: "#d8e1e8",
        },
        void: {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/></svg>',
            bgColor: "#111113",
            textColor: "#f1f1f1",
            borderColor: "#111113",
        },
    };

    // Animation mappings
    Notyfyre.animations = {
        // Fade animations
        'fade-in': 'notyfyre-fade-in',
        'fade-out': 'notyfyre-fade-out',

        // Slide animations
        'slide-in-left': 'notyfyre-slide-in-left',
        'slide-out-left': 'notyfyre-slide-out-left',
        'slide-in-right': 'notyfyre-slide-in-right',
        'slide-out-right': 'notyfyre-slide-out-right',
        'slide-in-down': 'notyfyre-slide-in-down',
        'slide-out-up': 'notyfyre-slide-out-up',
        'slide-in-up': 'notyfyre-slide-in-up',
        'slide-out-down': 'notyfyre-slide-out-down',

        // Bounce animations
        'bounce-in': 'notyfyre-bounce-in',
        'bounce-out': 'notyfyre-bounce-out',

        // Zoom animations
        'zoom-in': 'notyfyre-zoom-in',
        'zoom-out': 'notyfyre-zoom-out',

        // Flip animations
        'flip-in': 'notyfyre-flip-in',
        'flip-out': 'notyfyre-flip-out',

        // Additional attention animations
        'swing': 'notyfyre-swing',
        'tada': 'notyfyre-tada',
        'pulse': 'notyfyre-pulse',
        'rubber-band': 'notyfyre-rubber-band'
    };

    // Common animation pairings
    Notyfyre.animationPairs = {
        'fade': { in: 'fade-in', out: 'fade-out' },
        'slide-left': { in: 'slide-in-left', out: 'slide-out-left' },
        'slide-right': { in: 'slide-in-right', out: 'slide-out-right' },
        'slide-down': { in: 'slide-in-down', out: 'slide-out-up' },
        'slide-up': { in: 'slide-in-up', out: 'slide-out-down' },
        'bounce': { in: 'bounce-in', out: 'bounce-out' },
        'zoom': { in: 'zoom-in', out: 'zoom-out' },
        'flip': { in: 'flip-in', out: 'flip-out' },
    };

    // Helper function to get axis offset
    function getAxisOffsetValue(axis, options) {
        if (options.offset[axis]) {
            if (isNaN(options.offset[axis])) {
                return options.offset[axis];
            } else {
                return options.offset[axis] + 'px';
            }
        }
        return '0px';
    }

    // Helper function to check if element contains a class
    function containsClass(elem, className) {
        if (!elem || typeof className !== 'string') {
            return false;
        } else if (elem.className && elem.className.trim().split(/\s+/gi).indexOf(className) > -1) {
            return true;
        } else {
            return false;
        }
    }

    // Define the prototype
    Notyfyre.lib = Notyfyre.prototype = {
        notyfyre: version,
        constructor: Notyfyre,

        // Initialize the object with required parameters
        init: function (options) {
            // Creating the options object with defaults
            this.options = {};

            // Set options, merging with defaults
            this.options = Object.assign({}, Notyfyre.defaults, options || {});

            this.toastElement = null;

            // Initialize the container
            this.initializeContainer();

            return this;
        },

        // Initialize the container for toast notifications
        initializeContainer: function () {
            // Get or create the container
            this.container = document.getElementById('notyfyre-container');
            if (!this.container) {
                this.container = document.createElement('div');
                this.container.id = 'notyfyre-container';
                document.body.appendChild(this.container);
            }

            // Set position class
            this.container.className = `notyfyre-container notyfyre-position-${this.options.position}-${this.options.gravity}`;
        },

        // Build the toast element
        buildToast: function () {
            if (!this.options) {
                throw 'Notyfyre is not initialized';
            }

            // Create toast element
            var divElement = document.createElement('div');
            divElement.className = `notyfyre notyfyre-animate ${Notyfyre.animations[this.options.animation.in]}`;

            // Set animation duration if specified
            if (this.options.animationDuration) {
                divElement.style.animationDuration = this.options.animationDuration + 's';
            }

            // Add type class if type is specified
            if (this.options.type) {
                divElement.className += ` notyfyre-${this.options.type}`;
            }

            // Add custom class if provided
            if (this.options.className) {
                divElement.className += ` ${this.options.className}`;
            }

            // Apply custom styles if provided
            if (this.options.style && Object.keys(this.options.style).length > 0) {
                for (var property in this.options.style) {
                    divElement.style[property] = this.options.style[property];
                }
            }

            // Announce the toast to screen readers
            if (this.options.ariaLive) {
                divElement.setAttribute('aria-live', this.options.ariaLive);
            }

            // Create toast body
            var toastBody = document.createElement('div');
            toastBody.className = 'notyfyre-body';

            // Add content wrapper
            var contentWrapper = document.createElement('div');
            contentWrapper.className = 'notyfyre-content';

            // Add icon if enabled
            if (this.options.iconEnabled) {
                var iconWrapper = document.createElement('div');
                iconWrapper.className = 'notyfyre-icon';
                iconWrapper.style.width = this.options.iconSize;
                iconWrapper.style.height = this.options.iconSize;

                // Determine icon content
                if (this.options.icon) {
                    // Custom icon handling
                    if (typeof this.options.icon === 'string') {
                        if (this.options.isIcon) {
                            iconWrapper.innerHTML = `<i class="${this.options.icon}"></i>`;
                        } else {
                            if (this.options.icon.match(/\.(jpeg|jpg|gif|png)$/i)) {
                                iconWrapper.innerHTML = `<img src="${this.options.icon}" alt="icon" style="width: 16px; height: 16px;" />`;
                            } else {
                                iconWrapper.innerHTML = this.options.icon;
                            }
                        }
                    } else if (typeof this.options.icon === 'object') {
                        if (this.options.icon.url) {
                            iconWrapper.innerHTML = `<img src="${this.options.icon.url}" alt="icon" style="width: ${this.options.icon.width || '16px'}; height: ${this.options.icon.height || '16px'};" />`;
                        } else if (this.options.icon.fontAwesome) {
                            iconWrapper.innerHTML = `<i class="${this.options.icon.fontAwesome}"></i>`;
                        } else if (this.options.icon.svg) {
                            iconWrapper.innerHTML = this.options.icon.svg;
                        }
                    }
                } else if (this.options.type && Notyfyre.types[this.options.type]) {
                    // Use default icon based on type
                    iconWrapper.innerHTML = Notyfyre.types[this.options.type].icon;
                }

                contentWrapper.appendChild(iconWrapper);
            }

            // Add message content
            var messageElement = document.createElement('div');
            messageElement.className = 'notyfyre-message';

            // Add title if provided
            if (this.options.title) {
                var titleDiv = document.createElement('div');
                titleDiv.className = 'notyfyre-title';
                titleDiv.textContent = this.options.title;
                messageElement.appendChild(titleDiv);
            }

            // Add message
            if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) {
                messageElement.appendChild(this.options.node);
            } else {
                if (this.options.allowHtml) {
                    messageElement.innerHTML = this.options.text;
                } else {
                    messageElement.textContent = this.options.text;
                }
            }

            contentWrapper.appendChild(messageElement);
            toastBody.appendChild(contentWrapper);

            // Add close button if enabled
            if (this.options.close) {
                var closeButton = document.createElement('button');
                closeButton.type = 'button';
                closeButton.className = 'notyfyre-close';
                closeButton.innerHTML = '&times;';
                closeButton.setAttribute('aria-label', 'Close');
                closeButton.addEventListener('click', function (event) {
                    event.stopPropagation();
                    this.removeElement(this.toastElement);
                    window.clearTimeout(this.toastElement.timeOutValue);
                }.bind(this));

                toastBody.appendChild(closeButton);
            }

            divElement.appendChild(toastBody);

            // Add progress bar if enabled
            if (this.options.progressBar && this.options.duration > 0) {
                var progressBar = document.createElement('div');

                if (this.options.type === 'void') {
                    progressBar.className = 'notyfyre-void-progress';
                    var progressBarFill = document.createElement('div');
                    progressBarFill.className = 'notyfyre-void-progress-fill';
                } else {
                    progressBar.className = 'notyfyre-progress';
                    var progressBarFill = document.createElement('div');
                    progressBarFill.className = 'notyfyre-progress-fill';
                }

                if (this.options.progressBarColor) {
                    progressBarFill.style.backgroundColor = this.options.progressBarColor;
                }

                progressBar.appendChild(progressBarFill);
                divElement.appendChild(progressBar);

                setTimeout(function() {
                    progressBarFill.style.width = '0%';
                    progressBarFill.style.transitionDuration = this.options.duration + 'ms';
                }.bind(this), 10);
            }

            // Add click handler
            if (typeof this.options.onClick === 'function') {
                divElement.style.cursor = 'pointer';
                divElement.addEventListener('click', function (e) {
                    if (e.target !== divElement &&
                        e.target.className !== 'notyfyre-message' &&
                        e.target.className !== 'notyfyre-content') return;
                    this.options.onClick();
                }.bind(this));
            }

            // Add destination click handler
            if (typeof this.options.destination !== 'undefined') {
                divElement.addEventListener('click', function (event) {
                    event.stopPropagation();
                    if (this.options.newWindow === true) {
                        window.open(this.options.destination, '_blank');
                    } else {
                        window.location = this.options.destination;
                    }
                }.bind(this));
            }

            // Store options with the toast
            divElement._options = this.options;

            return divElement;
        },

        // Show the toast notification
        showToast: function () {
            // Create toast element
            this.toastElement = this.buildToast();

            // Add to container
            if (this.options.oldestFirst) {
                this.container.appendChild(this.toastElement);
            } else {
                this.container.insertBefore(this.toastElement, this.container.firstChild);
            }

            // Reposition toasts
            Notyfyre.reposition();

            // Make visible
            setTimeout(function() {
                this.toastElement.style.opacity = '1';
            }.bind(this), 10);

            // Auto-remove after duration
            if (this.options.duration > 0) {
                this.toastElement.timeOutValue = setTimeout(function() {
                    this.removeElement(this.toastElement);
                }.bind(this), this.options.duration);
            }

            // Pause on hover
            if (this.options.stopOnFocus && this.options.duration > 0) {
                var self = this;
                var remainingTime = this.options.duration;

                // Pause on mouse enter
                this.toastElement.addEventListener('mouseenter', function() {
                    // Clear timeout
                    if (self.toastElement.timeOutValue) {
                        clearTimeout(self.toastElement.timeOutValue);
                        self.toastElement.timeOutValue = null;
                    }

                    // Pause progress bar
                    if (self.options.progressBar) {
                        var progressBarFill = self.toastElement.querySelector('.notyfyre-progress-fill, .notyfyre-void-progress-fill');
                        if (progressBarFill) {
                            var computedStyle = window.getComputedStyle(progressBarFill);
                            var width = parseFloat(computedStyle.getPropertyValue('width'));
                            var fullWidth = parseFloat(computedStyle.getPropertyValue('width')) +
                                          parseFloat(computedStyle.getPropertyValue('padding-left')) +
                                          parseFloat(computedStyle.getPropertyValue('padding-right'));

                            remainingTime = self.options.duration * (width / fullWidth);
                            progressBarFill.style.transition = 'none';
                            progressBarFill.style.width = (width / fullWidth * 100) + '%';
                        }
                    }
                });

                // Resume on mouse leave
                this.toastElement.addEventListener('mouseleave', function() {
                    if (!self.toastElement.timeOutValue && remainingTime > 0) {
                        self.toastElement.timeOutValue = setTimeout(function() {
                            self.removeElement(self.toastElement);
                        }, remainingTime);

                        // Resume progress bar
                        if (self.options.progressBar) {
                            var progressBarFill = self.toastElement.querySelector('.notyfyre-progress-fill, .notyfyre-void-progress-fill');
                            if (progressBarFill) {
                                setTimeout(function() {
                                    progressBarFill.style.transition = 'width ' + remainingTime + 'ms linear';
                                    progressBarFill.style.width = '0%';
                                }, 10);
                            }
                        }
                    }
                });
            }

            return this;
        },

        // Remove a toast element
        removeElement: function(toastElement) {
            // Clear timeout if exists
            if (toastElement.timeOutValue) {
                clearTimeout(toastElement.timeOutValue);
            }

            // Apply exit animation
            var animationClass = Notyfyre.animations[toastElement._options.animation.in];
            toastElement.classList.remove(animationClass);
            toastElement.classList.add(Notyfyre.animations[toastElement._options.animation.out]);

            // Set animation duration if specified
            if (toastElement._options.animationDuration) {
                toastElement.style.animationDuration = toastElement._options.animationDuration + 's';
            }

            // Remove after animation completes
            setTimeout(function() {
                if (toastElement && toastElement.parentNode) {
                    // Remove node if any
                    if (toastElement._options.node && toastElement._options.node.parentNode) {
                        toastElement._options.node.parentNode.removeChild(toastElement._options.node);
                    }

                    toastElement.parentNode.removeChild(toastElement);

                    // Call callback function
                    if (typeof toastElement._options.callback === 'function') {
                        toastElement._options.callback.call(toastElement);
                    }

                    // Reposition remaining toasts
                    Notyfyre.reposition();
                }
            }, 500);
        },

        // Hide the toast
        hideToast: function() {
            if (this.toastElement && this.toastElement.timeOutValue) {
                clearTimeout(this.toastElement.timeOutValue);
            }
            if (this.toastElement) {
                this.removeElement(this.toastElement);
            }
            return this;
        },

        // Remove all toasts
        removeAll: function() {
            var toasts = document.querySelectorAll('.notyfyre');
            for (var i = 0; i < toasts.length; i++) {
                this.removeElement(toasts[i]);
            }
        },

        // Show toast with type
        success: function(message, options) {
            return this.message(message, Object.assign({}, options, { type: 'success' }));
        },

        error: function(message, options) {
            return this.message(message, Object.assign({}, options, { type: 'error' }));
        },

        warning: function(message, options) {
            return this.message(message, Object.assign({}, options, { type: 'warning' }));
        },

        info: function(message, options) {
            return this.message(message, Object.assign({}, options, { type: 'info' }));
        },

        zen: function(message, options) {
            return this.message(message, Object.assign({}, options, { type: 'zen' }));
        },

        void: function(message, options) {
            return this.message(message, Object.assign({}, options, { type: 'void' }));
        },

        // Generic message method
        message: function(message, options) {
            options = options || {};
            options.text = message;

            var toast = new Notyfyre(options);
            return toast.showToast();
        },

        // Method chaining options
        duration: function(milliseconds) {
            this.options.duration = milliseconds;
            return this;
        },

        position: function(position) {
            this.options.position = position;
            this.updatePosition(position);
            return this;
        },

        gravity: function(gravity) {
            this.options.gravity = gravity;
            this.updatePosition(this.options.position);
            return this;
        },

        close: function(show) {
            this.options.close = show !== false;
            return this;
        },

        progressBar: function(show) {
            this.options.progressBar = show !== false;
            return this;
        },

        progressBarColor: function(color) {
            this.options.progressBarColor = color;
            return this;
        },

        destination: function(url, newWindow) {
            this.options.destination = url;
            this.options.newWindow = !!newWindow;
            return this;
        },

        stopOnFocus: function(stop) {
            this.options.stopOnFocus = stop !== false;
            return this;
        },

        animation: function(inAnimation, outAnimation) {
            this.options.animation.in = inAnimation;
            this.options.animation.out = outAnimation;
            return this;
        },

        // New method for setting animation with pairs
        animationSet: function(pairName) {
            if (Notyfyre.animationPairs[pairName]) {
                this.options.animation.in = Notyfyre.animationPairs[pairName].in;
                this.options.animation.out = Notyfyre.animationPairs[pairName].out;
            }
            return this;
        },

        // Animation duration setter
        animationDuration: function(seconds) {
            this.options.animationDuration = seconds;
            return this;
        },

        style: function(style) {
            this.options.style = style;
            return this;
        },

        className: function(className) {
            this.options.className = className;
            return this;
        },

        onClick: function(callback) {
            this.options.onClick = callback;
            return this;
        },

        offset: function(x, y) {
            this.options.offset = { x: x, y: y };
            return this;
        },

        icon: function(iconHtml) {
            this.options.icon = iconHtml;
            return this;
        },

        iconPosition: function(position) {
            this.options.iconPosition = position;
            return this;
        },

        iconSize: function(size) {
            this.options.iconSize = size;
            return this;
        },

        noIcon: function() {
            this.options.iconEnabled = false;
            return this;
        },

        // Allow HTML in message
        allowHtml: function(allow) {
            this.options.allowHtml = allow !== false;
            return this;
        },

        // Set title
        title: function(title) {
            this.options.title = title;
            return this;
        },

        // Set newest on top
        newestOnTop: function(newest) {
            this.options.oldestFirst = !newest;
            return this;
        },

        // Flash method for Laravel integration
        flash: function() {
            if (typeof window !== 'undefined') {
                this.options.sessionKey = 'notyfyre'; // Use Laravel session key

                // Store the notification in session data
                if (typeof sessionStorage !== 'undefined') {
                    var notification = {
                        message: this.options.text,
                        options: this.options
                    };
                    sessionStorage.setItem('notyfyre', JSON.stringify(notification));
                }
            }
            return this;
        },

        // Utility methods
        toArray: function() {
            return Object.assign({}, this.options);
        },

        toJson: function() {
            return JSON.stringify(this.options);
        },

        toScript: function() {
            var jsonString = JSON.stringify(this.options, null, 2);
            return `Notyfyre(${jsonString}).showToast();`;
        },

        // Update container position
        updatePosition: function(position) {
            if (position) {
                this.options.position = position;
            }
            if (this.container) {
                this.container.className = `notyfyre-container notyfyre-position-${this.options.position}-${this.options.gravity}`;
            }
        }
    };

    // Set up the prototype
    Notyfyre.lib.init.prototype = Notyfyre.lib;

    // Static reposition method
    Notyfyre.reposition = function() {
        // Top margins with gravity
        var topLeftOffsetSize = { top: 15, bottom: 15 };
        var topRightOffsetSize = { top: 15, bottom: 15 };
        var topCenterOffsetSize = { top: 15, bottom: 15 };

        // Get all toast elements
        var allToasts = document.getElementsByClassName('notyfyre');

        // Spacing between toasts
        var offset = 15;

        for (var i = 0; i < allToasts.length; i++) {
            var toast = allToasts[i];
            var height = toast.offsetHeight;
            var position, gravity;

            // Determine position
            if (containsClass(toast, 'notyfyre-position-left-top')) {
                position = 'left';
                gravity = 'top';
            } else if (containsClass(toast, 'notyfyre-position-right-top')) {
                position = 'right';
                gravity = 'top';
            } else if (containsClass(toast, 'notyfyre-position-center-top')) {
                position = 'center';
                gravity = 'top';
            } else if (containsClass(toast, 'notyfyre-position-left-bottom')) {
                position = 'left';
                gravity = 'bottom';
            } else if (containsClass(toast, 'notyfyre-position-right-bottom')) {
                position = 'right';
                gravity = 'bottom';
            } else if (containsClass(toast, 'notyfyre-position-center-bottom')) {
                position = 'center';
                gravity = 'bottom';
            } else {
                // Default to right-top
                position = 'right';
                gravity = 'top';
            }

            // Apply position based on gravity and orientation
            if (position === 'left') {
                toast.style[gravity] = topLeftOffsetSize[gravity] + 'px';
                topLeftOffsetSize[gravity] += height + offset;
            } else if (position === 'center') {
                toast.style[gravity] = topCenterOffsetSize[gravity] + 'px';
                topCenterOffsetSize[gravity] += height + offset;
            } else {
                toast.style[gravity] = topRightOffsetSize[gravity] + 'px';
                topRightOffsetSize[gravity] += height + offset;
            }
        }

        return this;
    };

    return Notyfyre;
});
