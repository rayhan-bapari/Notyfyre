<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default Toast Configuration
    |--------------------------------------------------------------------------
    |
    | These are the default options that will be used for all toasts unless
    | they are overridden when the toast is created.
    |
    */

    'defaults' => [
        'duration' => 3000, // Display duration in ms
        'position' => 'right', // left, right, center
        'gravity' => 'top', // top, bottom
        'close' => true, // Show close button
        'progress_bar' => true, // Show progress bar
        'stop_on_focus' => true, // Stop timeout on hover
        'animation' => [
            'in' => 'fadeIn',
            'out' => 'fadeOut',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Icon Configuration
    |--------------------------------------------------------------------------
    |
    | Configure the default behavior for notification icons.
    |
    */

    'icons' => [
        'enabled' => true, // Enable icons by default
        'position' => 'left', // left, right
        'size' => '24px', // Icon size
        'default' => [
            'success' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
            'error' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>',
            'warning' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4M12 16h.01"/><path d="M12 2L2 19h20L12 2z"/></svg>',
            'info' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Toast Types
    |--------------------------------------------------------------------------
    |
    | Here you can define different toast types with their styles.
    | These are applied automatically when using Notyfyre::success(),
    | Notyfyre::error(), etc.
    |
    */

    'types' => [
        'success' => [
            'background' => 'linear-gradient(135deg, #42E695, #3BB2B8)',
            'class' => 'notyfyre-success',
            'icon' => null, // Uses default if null
        ],
        'error' => [
            'background' => 'linear-gradient(135deg, #ff5e7a, #ff3c6f)',
            'class' => 'notyfyre-error',
            'icon' => null,
        ],
        'warning' => [
            'background' => 'linear-gradient(135deg, #ffca3a, #ff9a3a)',
            'class' => 'notyfyre-warning',
            'icon' => null,
        ],
        'info' => [
            'background' => 'linear-gradient(135deg, #73a5ff, #5477f5)',
            'class' => 'notyfyre-info',
            'icon' => null,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Auto-load Assets
    |--------------------------------------------------------------------------
    |
    | If set to true, the CSS and JS assets will be auto-loaded without
    | needing to use the Blade directives @notyfyreStyles and @notyfyreScripts
    |
    */

    'auto_load_assets' => false,

    /*
    |--------------------------------------------------------------------------
    | Session Key
    |--------------------------------------------------------------------------
    |
    | The key used in the session to store flashed notifications.
    |
    */

    'session_key' => 'notyfyre',
];
