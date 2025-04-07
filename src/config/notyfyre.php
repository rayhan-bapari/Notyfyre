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
        ],
        'error' => [
            'background' => 'linear-gradient(135deg, #FF7676, #F54EA2)',
            'class' => 'notyfyre-error',
        ],
        'warning' => [
            'background' => 'linear-gradient(135deg, #FFD166, #F0A500)',
            'class' => 'notyfyre-warning',
        ],
        'info' => [
            'background' => 'linear-gradient(135deg, #73a5ff, #5477f5)',
            'class' => 'notyfyre-info',
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
