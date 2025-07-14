<?php

if (!function_exists('notyfyre')) {
    /**
     * Get the Notyfyre manager instance
     */
    function notyfyre(?string $type = null, ?string $message = null, ?string $title = null, array $options = [])
    {
        $notyfyre = app('notyfyre');

        if ($type && $message) {
            return $notyfyre->{$type}($message, $title ?: ucfirst($type), $options);
        }

        return $notyfyre;
    }
}

if (!function_exists('notify_success')) {
    /**
     * Add a success notification
     */
    function notify_success(string $message, string $title = 'Success', array $options = [])
    {
        return app('notyfyre')->success($message, $title, $options);
    }
}

if (!function_exists('notify_error')) {
    /**
     * Add an error notification
     */
    function notify_error(string $message, string $title = 'Error', array $options = [])
    {
        return app('notyfyre')->error($message, $title, $options);
    }
}

if (!function_exists('notify_warning')) {
    /**
     * Add a warning notification
     */
    function notify_warning(string $message, string $title = 'Warning', array $options = [])
    {
        return app('notyfyre')->warning($message, $title, $options);
    }
}

if (!function_exists('notify_info')) {
    /**
     * Add an info notification
     */
    function notify_info(string $message, string $title = 'Info', array $options = [])
    {
        return app('notyfyre')->info($message, $title, $options);
    }
}
