/**
 * Notyfyre - Laravel Toast Notifications
 * Version 1.0.0
 */
(function(window, document) {
    'use strict';

    const Notyfyre = function() {
        let toastContainer = null;
        let toastId = 0;

        const defaultOptions = {
            closeButton: true,
            debug: false,
            newestOnTop: true,
            progressBar: false,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            showDuration: 1000,
            hideDuration: 1000,
            timeOut: 5000,
            extendedTimeOut: 1000,
            showEasing: 'swing',
            hideEasing: 'linear',
            showMethod: 'fadeIn',
            hideMethod: 'fadeOut'
        };

        let globalOptions = Object.assign({}, defaultOptions);

        function getContainer(options) {
            if (!toastContainer) {
                toastContainer = document.createElement('div');
                toastContainer.id = 'toast-container';
                toastContainer.className = options.positionClass || 'toast-top-right';
                document.body.appendChild(toastContainer);
            } else {
                toastContainer.className = options.positionClass || 'toast-top-right';
            }
            return toastContainer;
        }

        function createToast(type, message, title, options) {
            options = Object.assign({}, globalOptions, options);

            const container = getContainer(options);
            const toastElement = document.createElement('div');
            const toastClass = 'toast toast-' + type;
            const currentToastId = ++toastId;

            toastElement.className = toastClass;
            toastElement.setAttribute('data-toast-id', currentToastId);

            let toastHtml = '';

            if (title) {
                toastHtml += '<div class="toast-title">' + escapeHtml(title) + '</div>';
            }

            toastHtml += '<div class="toast-message">' + escapeHtml(message) + '</div>';

            if (options.closeButton) {
                toastHtml += '<button type="button" class="toast-close-button" aria-label="Close">';
                toastHtml += '<i>×</i>';
                toastHtml += '</button>';
            }

            if (options.progressBar) {
                toastHtml += '<div class="toast-progress"></div>';
            }

            toastElement.innerHTML = toastHtml;

            // Add event listeners
            toastElement.addEventListener('click', function(e) {
                if (e.target.closest('.toast-close-button')) {
                    hideToast(toastElement, options);
                }
            });

            // Show toast
            if (options.newestOnTop) {
                container.insertBefore(toastElement, container.firstChild);
            } else {
                container.appendChild(toastElement);
            }

            // Apply show animation
            setTimeout(() => {
                toastElement.classList.add('toast-fade-in');
            }, 50);

            // Auto hide
            if (options.timeOut > 0) {
                setTimeout(() => {
                    hideToast(toastElement, options);
                }, options.timeOut);
            }

            // Progress bar animation
            if (options.progressBar && options.timeOut > 0) {
                const progressBar = toastElement.querySelector('.toast-progress');
                if (progressBar) {
                    progressBar.style.width = '100%';
                    progressBar.style.transition = `width ${options.timeOut}ms linear`;
                    setTimeout(() => {
                        progressBar.style.width = '0%';
                    }, 50);
                }
            }

            return toastElement;
        }

        function hideToast(toastElement, options) {
            if (!toastElement || toastElement.classList.contains('toast-fade-out')) {
                return;
            }

            toastElement.classList.add('toast-fade-out');

            setTimeout(() => {
                if (toastElement.parentNode) {
                    toastElement.parentNode.removeChild(toastElement);
                }

                // Remove container if empty
                if (toastContainer && toastContainer.children.length === 0) {
                    toastContainer.parentNode.removeChild(toastContainer);
                    toastContainer = null;
                }
            }, options.hideDuration || 300);
        }

        function escapeHtml(unsafe) {
            if (typeof unsafe !== 'string') {
                return unsafe;
            }
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        function clear() {
            if (toastContainer) {
                const toasts = toastContainer.querySelectorAll('.toast');
                toasts.forEach(toast => {
                    hideToast(toast, globalOptions);
                });
            }
        }

        // Public API
        return {
            options: globalOptions,

            success: function(message, title, options) {
                return createToast('success', message, title, options);
            },

            info: function(message, title, options) {
                return createToast('info', message, title, options);
            },

            warning: function(message, title, options) {
                return createToast('warning', message, title, options);
            },

            error: function(message, title, options) {
                return createToast('error', message, title, options);
            },

            clear: clear,

            remove: function(toastElement) {
                if (toastElement) {
                    hideToast(toastElement, globalOptions);
                }
            },

            version: '1.0.0'
        };
    };

    // Make Notyfyre available globally
    window.notyfyre = new Notyfyre();

    // AMD/CommonJS compatibility
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return window.notyfyre;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = window.notyfyre;
    }

})(window, document);
