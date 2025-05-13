@if (isset($notyfyreAutoloadAssets) && $notyfyreAutoloadAssets)
    <link rel="stylesheet" href="{{ asset('vendor/notyfyre/css/notyfyre.css') }}">
    <script src="{{ asset('vendor/notyfyre/js/notyfyre.js') }}"></script>
@endif

@if (isset($notyfyreNotifications))
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize ZephyrToast
            const toast = new Notyfyre();

            var notification = {!! json_encode($notyfyreNotifications) !!};
            var message = notification.message || '';
            var options = notification.options || {};
            var type = options.type || 'info';

            // Call the appropriate method based on notification type
            switch (type) {
                case 'success':
                    toast.success(message, options);
                    break;
                case 'error':
                    toast.error(message, options);
                    break;
                case 'warning':
                    toast.warning(message, options);
                    break;
                case 'info':
                    toast.info(message, options);
                    break;
                case 'zen':
                    toast.zen(message, options);
                    break;
                case 'void':
                    toast.void(message, options);
                    break;
                default:
                    toast.show(message, options);
            }
        });
    </script>
@endif
