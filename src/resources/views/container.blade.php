@if ($includeAssets)
    @if ($includeJquery)
        <script src="https://code.jquery.com/jquery-{{ config('notyfyre.jquery_version', '3.6.0') }}.min.js"></script>
    @endif

    <link rel="stylesheet" href="{{ asset('vendor/notyfyre/css/notyfyre.css') }}">
    <script src="{{ asset('vendor/notyfyre/js/notyfyre.js') }}"></script>
@endif

<div id="notyfyre-container"></div>

@if (app('notyfyre')->hasNotifications())
    {!! app('notyfyre')->render() !!}
@endif
