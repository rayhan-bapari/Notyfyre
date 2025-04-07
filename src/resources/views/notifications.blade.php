@if (isset($notyfyreAutoloadAssets) && $notyfyreAutoloadAssets)
    <link rel="stylesheet" href="{{ asset('vendor/notyfyre/css/notyfyre.css') }}">
    <script src="{{ asset('vendor/notyfyre/js/notyfyre.js') }}"></script>
@endif

@if (isset($notyfyreNotifications))
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var notification = {!! json_encode($notyfyreNotifications) !!};

            var options = notification.options || {};
            options.text = notification.message || '';

            // Convert snake_case keys to camelCase for JavaScript
            var jsOptions = {};
            for (var key in options) {
                var jsKey = key.replace(/_([a-z])/g, function(g) {
                    return g[1].toUpperCase();
                });
                jsOptions[jsKey] = options[key];
            }

            Notyfyre(jsOptions).showToast();
        });
    </script>
@endif
