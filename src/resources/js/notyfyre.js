/**
 * Notyfyre - Modern Toast Notification Library
 * Version: 2.0.0
 * Author: Rayhan Bapari
 * License: MIT
 */

class NotyfyreManager {
    constructor(config = {}) {
        this.config = {
            position: 'top-right',
            duration: 5000,
            closable: true,
            pauseOnHover: true,
            pauseOnFocusLoss: true,
            progress: true,
            theme: 'default',
            maxVisible: 5,
            preventDuplicates: false,
            escapeHtml: true,
            closeOnClick: false,
            animation: {
                type: 'slide',
                duration: 300
            },
            accessibility: {
                role: 'alert',
                ariaLive: 'polite',
                ariaRelevant: 'additions text',
                closeAriaLabel: 'Close notification'
            },
            ...config
        };

        this.containers = new Map();
        this.activeNotifications = new Map();
        this.queue = new Map();
        this.idCounter = 0;

        this.icons = {
            success: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
            error: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
            warning: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
            info: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
        };

        this.init();
    }

    init() {
        this.injectStyles();
        this.setupGlobalEventListeners();
        this.processLaravelNotifications();
    }

    injectStyles() {
        if (document.querySelector('[data-notyfyre-styles]')) return;

        // Check if external CSS is loaded
        const existingLink = document.querySelector('link[href*="notyfyre"]');
        if (existingLink) return;

        // Inject minimal required styles
        const style = document.createElement('style');
        style.setAttribute('data-notyfyre-styles', '');
        style.textContent = this.getMinimalCSS();
        document.head.appendChild(style);
    }

    getMinimalCSS() {
        return `
            .notyfyre-container {
                position: fixed;
                z-index: 9999;
                pointer-events: none;
                display: flex;
                flex-direction: column;
                gap: 8px;
                max-width: 100%;
            }
            .notyfyre-container.top-right { top: 16px; right: 16px; align-items: flex-end; }
            .notyfyre-container.top-left { top: 16px; left: 16px; align-items: flex-start; }
            .notyfyre-container.bottom-right { bottom: 16px; right: 16px; align-items: flex-end; }
            .notyfyre-container.bottom-left { bottom: 16px; left: 16px; align-items: flex-start; }
            .notyfyre-container.top-center { top: 16px; left: 50%; transform: translateX(-50%); align-items: center; }
            .notyfyre-container.bottom-center { bottom: 16px; left: 50%; transform: translateX(-50%); align-items: center; }
            .notyfyre-container.center { top: 50%; left: 50%; transform: translate(-50%, -50%); align-items: center; }

            .notyfyre-notification {
                display: flex;
                align-items: flex-start;
                padding: 12px 16px;
                border-radius: 8px;
                background: white;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                max-width: 400px;
                min-width: 300px;
                pointer-events: auto;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                position: relative;
                overflow: hidden;
                transition: all 0.3s ease;
            }

            .notyfyre-notification.success { border-left: 4px solid #10b981; background: #f0fdf4; color: #065f46; }
            .notyfyre-notification.error { border-left: 4px solid #ef4444; background: #fef2f2; color: #991b1b; }
            .notyfyre-notification.warning { border-left: 4px solid #f59e0b; background: #fffbeb; color: #92400e; }
            .notyfyre-notification.info { border-left: 4px solid #3b82f6; background: #eff6ff; color: #1e40af; }

            .notyfyre-icon { margin-right: 12px; flex-shrink: 0; width: 20px; height: 20px; }
            .notyfyre-content { flex: 1; min-width: 0; }
            .notyfyre-title { font-weight: 600; margin: 0 0 4px 0; font-size: 14px; }
            .notyfyre-message { margin: 0; font-size: 14px; line-height: 1.4; }
            .notyfyre-close {
                background: none; border: none; cursor: pointer; padding: 4px; margin-left: 8px;
                opacity: 0.5; font-size: 18px; line-height: 1; flex-shrink: 0;
            }
            .notyfyre-close:hover { opacity: 1; }

            .notyfyre-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 4px;
                background: currentColor;
                opacity: 0.3;
                transform-origin: left;
                transform: scaleX(0);
                transition: transform linear;
            }

            .notyfyre-actions {
                display: flex;
                gap: 8px;
                margin-top: 8px;
            }

            .notyfyre-action {
                background: rgba(0, 0, 0, 0.1);
                border: none;
                border-radius: 4px;
                padding: 4px 8px;
                font-size: 12px;
                cursor: pointer;
                transition: background 0.2s;
            }
            .notyfyre-action:hover { background: rgba(0, 0, 0, 0.2); }

            .notyfyre-enter { opacity: 0; transform: translateY(-20px); }
            .notyfyre-exit { opacity: 0; transform: translateY(-20px); pointer-events: none; }

            @media (max-width: 480px) {
                .notyfyre-container { left: 8px !important; right: 8px !important; transform: none !important; }
                .notyfyre-notification { min-width: auto; max-width: none; }
            }
        `;
    }

    setupGlobalEventListeners() {
        // ESC key to close all notifications
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearAll();
            }
        });

        // Window focus/blur for pauseOnFocusLoss
        let wasBlurred = false;
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                wasBlurred = true;
                this.pauseAll();
            } else if (wasBlurred) {
                this.resumeAll();
                wasBlurred = false;
            }
        });
    }

    processLaravelNotifications() {
        // Process notifications from Laravel
        if (window.notyfyreNotifications) {
            const notifications = Array.isArray(window.notyfyreNotifications)
                ? window.notyfyreNotifications
                : [window.notyfyreNotifications];

            notifications.forEach(notification => {
                if (notification.message) {
                    this.show(notification.message, notification);
                }
            });

            // Clear the global variable
            delete window.notyfyreNotifications;
        }
    }

    generateId() {
        return `notyfyre-${++this.idCounter}`;
    }

    getContainer(position) {
        if (this.containers.has(position)) {
            return this.containers.get(position);
        }

        const container = document.createElement('div');
        container.className = `notyfyre-container ${position}`;
        container.setAttribute('role', 'region');
        container.setAttribute('aria-label', 'Notifications');

        document.body.appendChild(container);
        this.containers.set(position, container);

        return container;
    }

    escapeHtml(unsafe) {
        if (typeof unsafe !== 'string') return unsafe;

        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    hasDuplicate(message, type, position) {
        for (const [id, notification] of this.activeNotifications) {
            const opts = notification.options;
            if (opts.message === message && opts.type === type && opts.position === position) {
                return true;
            }
        }
        return false;
    }

    createNotificationElement(options) {
        const notification = document.createElement('div');
        notification.className = `notyfyre-notification ${options.type || ''}`;
        notification.id = options.id;
        notification.setAttribute('role', options.accessibility?.role || this.config.accessibility.role);
        notification.setAttribute('aria-live', options.accessibility?.ariaLive || this.config.accessibility.ariaLive);
        notification.tabIndex = 0;

        // Apply theme
        if (options.theme && options.theme !== 'default') {
            notification.classList.add(`theme-${options.theme}`);
        }

        let html = '';

        // Icon
        if (options.icon !== false) {
            const iconContent = options.icon || this.icons[options.type] || '';
            html += `<div class="notyfyre-icon">${iconContent}</div>`;
        }

        // Content
        html += '<div class="notyfyre-content">';

        if (options.title) {
            html += `<div class="notyfyre-title">${options.escapeHtml ? this.escapeHtml(options.title) : options.title}</div>`;
        }

        html += `<div class="notyfyre-message">${options.escapeHtml ? this.escapeHtml(options.message) : options.message}</div>`;

        // Actions
        if (options.actions && options.actions.length) {
            html += '<div class="notyfyre-actions">';
            options.actions.forEach((action, index) => {
                html += `<button class="notyfyre-action" data-action="${index}">${action.text}</button>`;
            });
            html += '</div>';
        }

        html += '</div>';

        // Close button
        if (options.closable) {
            html += `<button class="notyfyre-close" aria-label="${options.accessibility?.closeAriaLabel || this.config.accessibility.closeAriaLabel}">×</button>`;
        }

        notification.innerHTML = html;

        // Progress bar
        if (options.progress && options.duration > 0) {
            const progress = document.createElement('div');
            progress.className = 'notyfyre-progress';
            if (options.progressColor) {
                progress.style.background = options.progressColor;
            }
            notification.appendChild(progress);
        }

        return notification;
    }

    setupNotificationEvents(element, options) {
        const { id } = options;

        // Close button
        const closeBtn = element.querySelector('.notyfyre-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.remove(id);
            });
        }

        // Action buttons
        const actionBtns = element.querySelectorAll('.notyfyre-action');
        actionBtns.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = options.actions[index];
                if (action.callback) {
                    action.callback(element, this);
                }
                if (action.close !== false) {
                    this.remove(id);
                }
            });
        });

        // Click to close
        if (options.closeOnClick) {
            element.addEventListener('click', () => {
                this.remove(id);
            });
        }

        // Custom onClick
        if (options.onClick) {
            element.addEventListener('click', () => {
                if (typeof options.onClick === 'function') {
                    options.onClick(element, this);
                } else if (typeof options.onClick === 'string') {
                    // Support for string callbacks (useful for Laravel)
                    try {
                        new Function('element', 'notyfyre', options.onClick)(element, this);
                    } catch (e) {
                        console.warn('Notyfyre: Invalid onClick callback', e);
                    }
                }
            });
        }

        // Pause on hover
        if (options.pauseOnHover) {
            element.addEventListener('mouseenter', () => this.pause(id));
            element.addEventListener('mouseleave', () => this.resume(id));
        }
    }

    startProgress(element, duration) {
        const progress = element.querySelector('.notyfyre-progress');
        if (progress) {
            setTimeout(() => {
                progress.style.transition = `transform ${duration}ms linear`;
                progress.style.transform = 'scaleX(1)';
            }, 10);
        }
    }

    animate(element, type, isExit = false) {
        const animationType = type || this.config.animation.type;

        if (isExit) {
            element.classList.add('notyfyre-exit');
        } else {
            element.classList.add('notyfyre-enter');
            // Remove enter class after a short delay
            setTimeout(() => {
                element.classList.remove('notyfyre-enter');
            }, 10);
        }
    }

    show(message, options = {}) {
        const finalOptions = { ...this.config, ...options, message, id: this.generateId() };

        // Check for duplicates
        if (finalOptions.preventDuplicates && this.hasDuplicate(message, finalOptions.type, finalOptions.position)) {
            return null;
        }

        const container = this.getContainer(finalOptions.position);
        const visibleCount = container.children.length;

        // Check if we need to queue
        if (visibleCount >= finalOptions.maxVisible) {
            this.addToQueue(finalOptions);
            return null;
        }

        return this.createAndShowNotification(finalOptions);
    }

    createAndShowNotification(options) {
        const element = this.createNotificationElement(options);
        const container = this.getContainer(options.position);

        // Store notification data
        let timeoutId = null;
        const notificationData = {
            element,
            options,
            timeoutId,
            startTime: Date.now(),
            remainingTime: options.duration,
            isPaused: false
        };

        this.activeNotifications.set(options.id, notificationData);

        // Setup events
        this.setupNotificationEvents(element, options);

        // Add to DOM with animation
        this.animate(element, options.animation?.type);
        container.appendChild(element);

        // Start auto-close timer
        if (options.duration > 0) {
            timeoutId = setTimeout(() => {
                this.remove(options.id);
            }, options.duration);
            notificationData.timeoutId = timeoutId;
        }

        // Start progress animation
        if (options.progress && options.duration > 0) {
            this.startProgress(element, options.duration);
        }

        // Call onShow callback
        if (options.onShow) {
            if (typeof options.onShow === 'function') {
                options.onShow(element, this);
            } else if (typeof options.onShow === 'string') {
                try {
                    new Function('element', 'notyfyre', options.onShow)(element, this);
                } catch (e) {
                    console.warn('Notyfyre: Invalid onShow callback', e);
                }
            }
        }

        return options.id;
    }

    addToQueue(options) {
        const position = options.position;
        if (!this.queue.has(position)) {
            this.queue.set(position, []);
        }
        this.queue.get(position).push(options);
    }

    processQueue(position) {
        if (!this.queue.has(position) || this.queue.get(position).length === 0) {
            return;
        }

        const container = this.getContainer(position);
        const visibleCount = container.children.length;
        const maxVisible = this.config.maxVisible;

        if (visibleCount < maxVisible) {
            const queuedOptions = this.queue.get(position).shift();
            this.createAndShowNotification(queuedOptions);

            // Remove empty queue
            if (this.queue.get(position).length === 0) {
                this.queue.delete(position);
            }
        }
    }

    remove(id) {
        const notificationData = this.activeNotifications.get(id);
        if (!notificationData) return false;

        const { element, options, timeoutId } = notificationData;

        // Clear timeout
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Call onClose callback
        if (options.onClose) {
            if (typeof options.onClose === 'function') {
                options.onClose(element, this);
            } else if (typeof options.onClose === 'string') {
                try {
                    new Function('element', 'notyfyre', options.onClose)(element, this);
                } catch (e) {
                    console.warn('Notyfyre: Invalid onClose callback', e);
                }
            }
        }

        // Animate out
        this.animate(element, options.animation?.type, true);

        // Remove from DOM after animation
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
            this.activeNotifications.delete(id);
            this.processQueue(options.position);
        }, options.animation?.duration || this.config.animation.duration);

        return true;
    }

    pause(id) {
        const notificationData = this.activeNotifications.get(id);
        if (!notificationData || notificationData.isPaused) return;

        notificationData.isPaused = true;
        const elapsed = Date.now() - notificationData.startTime;
        notificationData.remainingTime = Math.max(0, notificationData.options.duration - elapsed);

        // Clear timeout
        if (notificationData.timeoutId) {
            clearTimeout(notificationData.timeoutId);
            notificationData.timeoutId = null;
        }

        // Pause progress bar
        const progress = notificationData.element.querySelector('.notyfyre-progress');
        if (progress) {
            progress.style.transition = 'none';
            const currentScale = elapsed / notificationData.options.duration;
            progress.style.transform = `scaleX(${Math.min(currentScale, 1)})`;
        }
    }

    resume(id) {
        const notificationData = this.activeNotifications.get(id);
        if (!notificationData || !notificationData.isPaused) return;

        notificationData.isPaused = false;
        notificationData.startTime = Date.now();

        // Restart timeout
        if (notificationData.remainingTime > 0) {
            notificationData.timeoutId = setTimeout(() => {
                this.remove(id);
            }, notificationData.remainingTime);
        }

        // Resume progress bar
        const progress = notificationData.element.querySelector('.notyfyre-progress');
        if (progress && notificationData.remainingTime > 0) {
            setTimeout(() => {
                progress.style.transition = `transform ${notificationData.remainingTime}ms linear`;
                progress.style.transform = 'scaleX(1)';
            }, 10);
        }
    }

    pauseAll() {
        for (const [id] of this.activeNotifications) {
            this.pause(id);
        }
    }

    resumeAll() {
        for (const [id] of this.activeNotifications) {
            this.resume(id);
        }
    }

    update(id, newOptions) {
        const notificationData = this.activeNotifications.get(id);
        if (!notificationData) return false;

        const { element, options } = notificationData;

        // Update message
        if (newOptions.message !== undefined) {
            const messageEl = element.querySelector('.notyfyre-message');
            if (messageEl) {
                messageEl.innerHTML = newOptions.escapeHtml !== false ?
                    this.escapeHtml(newOptions.message) : newOptions.message;
            }
        }

        // Update title
        if (newOptions.title !== undefined) {
            const titleEl = element.querySelector('.notyfyre-title');
            if (titleEl) {
                titleEl.innerHTML = newOptions.escapeHtml !== false ?
                    this.escapeHtml(newOptions.title) : newOptions.title;
            } else if (newOptions.title) {
                const contentEl = element.querySelector('.notyfyre-content');
                const messageEl = contentEl.querySelector('.notyfyre-message');
                const titleEl = document.createElement('div');
                titleEl.className = 'notyfyre-title';
                titleEl.innerHTML = newOptions.escapeHtml !== false ?
                    this.escapeHtml(newOptions.title) : newOptions.title;
                contentEl.insertBefore(titleEl, messageEl);
            }
        }

        // Update type
        if (newOptions.type && newOptions.type !== options.type) {
            element.classList.remove(options.type);
            element.classList.add(newOptions.type);

            // Update icon
            const iconEl = element.querySelector('.notyfyre-icon');
            if (iconEl && newOptions.icon !== false) {
                iconEl.innerHTML = newOptions.icon || this.icons[newOptions.type] || '';
            }
        }

        // Update stored options
        Object.assign(notificationData.options, newOptions);

        return true;
    }

    clearAll() {
        const ids = Array.from(this.activeNotifications.keys());
        ids.forEach(id => this.remove(id));
        this.queue.clear();
        return ids.length;
    }

    clearByPosition(position) {
        const ids = [];
        for (const [id, data] of this.activeNotifications) {
            if (data.options.position === position) {
                ids.push(id);
            }
        }
        ids.forEach(id => this.remove(id));
        this.queue.delete(position);
        return ids.length;
    }

    configure(newConfig) {
        Object.assign(this.config, newConfig);
        return this.config;
    }

    getActive() {
        const result = [];
        for (const [id, data] of this.activeNotifications) {
            result.push({
                id,
                type: data.options.type,
                message: data.options.message,
                position: data.options.position,
                theme: data.options.theme,
                duration: data.options.duration
            });
        }
        return result;
    }

    getQueueLength(position) {
        if (position) {
            return this.queue.has(position) ? this.queue.get(position).length : 0;
        }

        let total = 0;
        for (const queue of this.queue.values()) {
            total += queue.length;
        }
        return total;
    }

    // Convenience methods
    success(message, options = {}) {
        return this.show(message, { ...options, type: 'success' });
    }

    error(message, options = {}) {
        return this.show(message, { ...options, type: 'error' });
    }

    warning(message, options = {}) {
        return this.show(message, { ...options, type: 'warning' });
    }

    info(message, options = {}) {
        return this.show(message, { ...options, type: 'info' });
    }

    custom(options = {}) {
        return this.show(options.message || '', options);
    }
}

// Create global instance
const notify = new NotyfyreManager();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        notify.processLaravelNotifications();
    });
} else {
    notify.processLaravelNotifications();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NotyfyreManager, notify };
}

if (typeof window !== 'undefined') {
    window.notify = notify;
    window.NotyfyreManager = NotyfyreManager;
}
