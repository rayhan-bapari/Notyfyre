@if (isset($notyfyreAutoInject) && $notyfyreAutoInject)
    @notyfyre
@endif

@if (isset($notyfyreNotifications) && !empty($notyfyreNotifications))
    <script>
        (function() {
            // Store notifications for JavaScript to process
            window.notyfyreNotifications = @json($notyfyreNotifications);

            // Auto-initialize if notify is available
            document.addEventListener('DOMContentLoaded', function() {
                if (typeof window.notify !== 'undefined') {
                    // Process Laravel notifications
                    if (window.notyfyreNotifications) {
                        const notifications = Array.isArray(window.notyfyreNotifications) ?
                            window.notyfyreNotifications :
                            [window.notyfyreNotifications];

                        notifications.forEach(function(notification) {
                            if (notification.message) {
                                const type = notification.type || 'info';
                                const message = notification.message;

                                // Remove message and type from options to avoid duplication
                                const options = {
                                    ...notification
                                };
                                delete options.message;
                                delete options.type;

                                // Show notification
                                if (typeof window.notify[type] === 'function') {
                                    window.notify[type](message, options);
                                } else {
                                    window.notify.show(message, {
                                        ...options,
                                        type: type
                                    });
                                }
                            }
                        });

                        // Clear notifications
                        delete window.notyfyreNotifications;
                    }
                }
            });
        })();
    </script>
@endif
