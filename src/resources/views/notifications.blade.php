@if (isset($notyfyreAutoloadAssets) && $notyfyreAutoloadAssets)
    <link rel="stylesheet" href="{{ asset('vendor/notyfyre/css/notyfyre.css') }}">
    <script src="{{ asset('vendor/notyfyre/js/notyfyre.js') }}"></script>
@endif

@if (isset($notyfyreNotifications))
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var notification = {!! json_encode($notyfyreNotifications) !!};

            // Set the message
            var options = notification.options || {};
            options.text = notification.message || '';

            // Direct pass-through of options to JS
            // This maintains camelCase in PHP which matches JS expectations
            Notyfyre(options).showToast();
        });
    </script>
@endif
