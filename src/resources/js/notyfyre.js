/*!
 * Notyfyre js 1.2.0
 * https://github.com/rayhan-bapari/Notyfyre
 * @license MIT licensed
 *
 * Copyright (C) 2025 Rayhan Bapari
 */
(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Notyfyre = factory();
    }
})(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    // Object initialization
    const Notyfyre = function (options) {
        // Returning a new init object
        return new Notyfyre.lib.init(options);
    };

    // Library version
    const version = '1.2.0';

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
        // Icon options
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
            options = options || {};

            // Creating the options object
            this.options = {};
            this.toastElement = null;

            // Validating the options
            this.options.text = options.text || Notyfyre.defaults.text;
            this.options.node = options.node || Notyfyre.defaults.node;
            this.options.duration = options.duration === 0 ? 0 : options.duration || Notyfyre.defaults.duration;
            this.options.selector = options.selector || Notyfyre.defaults.selector;
            this.options.callback = options.callback || Notyfyre.defaults.callback;
            this.options.destination = options.destination || Notyfyre.defaults.destination;
            this.options.newWindow = options.newWindow || Notyfyre.defaults.newWindow;
            this.options.close = options.close !== undefined ? options.close : Notyfyre.defaults.close;
            this.options.gravity = options.gravity || Notyfyre.defaults.gravity;
            this.options.position = options.position || Notyfyre.defaults.position;
            this.options.backgroundColor = options.backgroundColor || Notyfyre.defaults.backgroundColor;
            this.options.avatar = options.avatar || Notyfyre.defaults.avatar;
            this.options.className = options.className || Notyfyre.defaults.className;
            this.options.stopOnFocus = options.stopOnFocus !== undefined ? options.stopOnFocus : Notyfyre.defaults.stopOnFocus;
            this.options.onClick = options.onClick || Notyfyre.defaults.onClick;
            this.options.offset = options.offset || Notyfyre.defaults.offset;
            this.options.escapeMarkup = options.escapeMarkup !== undefined ? options.escapeMarkup : Notyfyre.defaults.escapeMarkup;
            this.options.ariaLive = options.ariaLive || Notyfyre.defaults.ariaLive;
            this.options.style = options.style || Notyfyre.defaults.style;
            this.options.progressBar = options.progressBar !== undefined ? options.progressBar : Notyfyre.defaults.progressBar;
            this.options.progressBarColor = options.progressBarColor || Notyfyre.defaults.progressBarColor;
            this.options.animation = options.animation || Notyfyre.defaults.animation;

            // Icon options
            this.options.iconEnabled = options.iconEnabled !== undefined ? options.iconEnabled : Notyfyre.defaults.iconEnabled;
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
            const divElement = document.createElement('div');
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

            // Apply styles
            Object.assign(divElement.style, this.options.style);

            // Announce the toast to screen readers
            if (this.options.ariaLive) {
                divElement.setAttribute('aria-live', this.options.ariaLive);
            }

            // Create a wrapper for message content (for better styling with icons)
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'notyfyre-content';

            // Add icon if enabled
            if (this.options.iconEnabled && this.options.icon) {
                const iconWrapper = document.createElement('div');
                iconWrapper.className = 'notyfyre-icon';
                iconWrapper.style.width = this.options.iconSize;
                iconWrapper.style.height = this.options.iconSize;
                iconWrapper.innerHTML = this.options.icon;

                // Always add icon at the beginning of the content wrapper
                contentWrapper.appendChild(iconWrapper);
            }

            // Create message element
            const messageElement = document.createElement('div');
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
                const avatarElement = document.createElement('img');
                avatarElement.src = this.options.avatar;
                avatarElement.className = 'notyfyre-avatar';
                avatarElement.alt = 'Avatar';
                contentWrapper.insertBefore(avatarElement, contentWrapper.firstChild);
            }

            // Adding a close icon to the toast
            if (this.options.close === true) {
                // Create a button for close element
                const closeElement = document.createElement('button');
                closeElement.type = 'button';
                closeElement.setAttribute('aria-label', 'Close');
                closeElement.className = 'notyfyre-close';
                closeElement.innerHTML = '&#10006;';

                // Triggering the removal of toast from DOM on close click
                closeElement.addEventListener('click', (event) => {
                    event.stopPropagation();
                    this.removeElement(this.toastElement);
                    window.clearTimeout(this.toastElement.timeOutValue);
                });

                // Always add close icon to the toast (outside the content wrapper)
                divElement.appendChild(closeElement);
            }

            // Add progress bar
            if (this.options.progressBar && this.options.duration > 0) {
                const progressElement = document.createElement('div');
                progressElement.className = 'notyfyre-progress';

                if (this.options.progressBarColor) {
                    progressElement.style.background = this.options.progressBarColor;
                }

                divElement.appendChild(progressElement);
            }

            // Adding offset
            if (typeof this.options.offset === 'object') {
                const x = this.getAxisOffsetAValue('x');
                const y = this.getAxisOffsetAValue('y');

                const xOffset = this.options.position === 'left' ? x : '-' + x;
                const yOffset = this.options.gravity === 'top' ? y : '-' + y;

                divElement.style.transform = `translate(${xOffset},${yOffset})`;
            }

            // Returning the generated element
            return divElement;
        },

        // Helper function to get offset
        getAxisOffsetAValue: function(axis) {
            if (this.options.offset[axis]) {
                return isNaN(this.options.offset[axis]) ?
                    this.options.offset[axis] :
                    this.options.offset[axis] + 'px';
            }
            return '0px';
        },

        // Displaying the toast
        showToast: function () {
            // Creating the DOM object for the toast
            this.toastElement = this.buildToast();

            // Getting the root element to with the toast needs to be added
            let rootElement;
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
            const elementToInsert = Notyfyre.defaults.oldestFirst ? rootElement.firstChild : rootElement.lastChild;
            rootElement.insertBefore(this.toastElement, elementToInsert);

            // Repositioning the toasts in case multiple toasts are present
            Notyfyre.reposition();

            // Animate the progress bar
            if (this.options.progressBar && this.options.duration > 0) {
                const progressElement = this.toastElement.querySelector('.notyfyre-progress');
                if (progressElement) {
                    setTimeout(() => {
                        progressElement.style.transition = `width ${this.options.duration}ms linear`;
                        progressElement.style.width = '0%';
                    }, 10);
                }
            }

            // Clear timeout while toast is focused
            if (this.options.stopOnFocus && this.options.duration > 0) {
                // stop countdown
                this.toastElement.addEventListener('mouseover', () => {
                    window.clearTimeout(this.toastElement.timeOutValue);

                    // Pause progress bar animation
                    if (this.options.progressBar) {
                        const progressElement = this.toastElement.querySelector('.notyfyre-progress');
                        if (progressElement) {
                            const computedStyle = window.getComputedStyle(progressElement);
                            const width = computedStyle.getPropertyValue('width');
                            progressElement.style.transition = 'none';
                            progressElement.style.width = width;
                        }
                    }
                });

                // add back the timeout
                this.toastElement.addEventListener('mouseleave', () => {
                    // Get remaining time
                    let remainingTime = this.options.duration;

                    if (this.options.progressBar) {
                        const progressElement = this.toastElement.querySelector('.notyfyre-progress');
                        if (progressElement) {
                            const computedStyle = window.getComputedStyle(progressElement);
                            const width = parseFloat(computedStyle.getPropertyValue('width'));
                            const totalWidth =
                                parseFloat(computedStyle.getPropertyValue('width')) +
                                parseFloat(computedStyle.getPropertyValue('padding-left')) +
                                parseFloat(computedStyle.getPropertyValue('padding-right'));

                            const percentage = width / totalWidth;
                            remainingTime = this.options.duration * percentage;

                            progressElement.style.transition = `width ${remainingTime}ms linear`;
                            progressElement.style.width = '0%';
                        }
                    }

                    this.toastElement.timeOutValue = window.setTimeout(() => {
                        // Remove the toast from DOM
                        this.removeElement(this.toastElement);
                    }, remainingTime);
                });
            }

            if (this.options.duration > 0) {
                this.toastElement.timeOutValue = window.setTimeout(() => {
                    // Remove the toast from DOM
                    this.removeElement(this.toastElement);
                }, this.options.duration);
            }

            // Adding an on-click destination path
            if (typeof this.options.destination !== 'undefined') {
                this.toastElement.addEventListener('click', (event) => {
                    event.stopPropagation();
                    if (this.options.newWindow === true) {
                        window.open(this.options.destination, '_blank');
                    } else {
                        window.location = this.options.destination;
                    }
                });
            }

            if (typeof this.options.onClick === 'function' && typeof this.options.destination === 'undefined') {
                this.toastElement.addEventListener('click', (event) => {
                    event.stopPropagation();
                    this.options.onClick();
                });
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
                this.options.animation.out
            );

            // Removing the element from DOM after transition end
            window.setTimeout(() => {
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
            }, 400);
        },
    };

    // Utility function to check if an element contains a class
    function containsClass(elem, yourClass) {
        if (!elem || typeof yourClass !== 'string') {
            return false;
        } else if (elem.className && elem.className.trim().split(/\s+/gi).indexOf(yourClass) > -1) {
            return true;
        } else {
            return false;
        }
    }

    // Positioning the toasts on the DOM
    Notyfyre.reposition = function () {
        // Top margins with gravity
        const offsets = {
            top: {
                top: 15,
                bottom: 15
            },
            right: {
                top: 15,
                bottom: 15
            },
            center: {
                top: 15,
                bottom: 15
            }
        };

        // Get all toast messages on the DOM
        const allToasts = document.getElementsByClassName('notyfyre');

        // Modifying the position of each toast element
        for (let i = 0; i < allToasts.length; i++) {
            // Getting the applied gravity
            const classUsed = containsClass(allToasts[i], 'notyfyre-top') ? 'top' : 'bottom';
            const height = allToasts[i].offsetHeight;
            // Spacing between toasts
            const offset = 15;

            // Show toast in position
            if (containsClass(allToasts[i], 'notyfyre-left')) {
                // Setting the position for left
                allToasts[i].style[classUsed] = offsets.top[classUsed] + 'px';
                offsets.top[classUsed] += height + offset;
            } else if (containsClass(allToasts[i], 'notyfyre-center')) {
                // Setting the position for center (need to center horizontally as well)
                allToasts[i].style[classUsed] = offsets.center[classUsed] + 'px';
                allToasts[i].style.left = '50%';
                allToasts[i].style.transform = 'translateX(-50%)';
                offsets.center[classUsed] += height + offset;
            } else {
                // Default is right position
                allToasts[i].style[classUsed] = offsets.right[classUsed] + 'px';
                offsets.right[classUsed] += height + offset;
            }
        }

        // Supporting function chaining
        return this;
    };

    // Setting up the prototype for the init object
    Notyfyre.lib.init.prototype = Notyfyre.lib;

    // Returning the Notyfyre function to be assigned to the window object/module
    return Notyfyre;
});
