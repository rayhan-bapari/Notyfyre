<script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function() {
        @foreach ($notifications as $notification)
            @php
                $options = json_encode($notification['options']);
            @endphp

            if (typeof window.notyfyre !== 'undefined') {
                window.notyfyre.options = {!! $options !!};
                window.notyfyre.{{ $notification['type'] }}(
                    '{!! addslashes($notification['message']) !!}',
                    '{!! addslashes($notification['title']) !!}'
                );
            }
        @endforeach
    });
</script>
