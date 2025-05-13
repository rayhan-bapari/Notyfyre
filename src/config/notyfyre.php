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
        'newest_on_top' => true, // Show newest toast on top
        'animation' => [
            'in' => 'fade-in',
            'out' => 'fade-out',
        ],
        'animation_duration' => 0.75, // Animation duration in seconds
        'allow_html' => false, // Allow HTML in message
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
            'success' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>',
            'error' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>',
            'warning' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>',
            'info' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>',
            'zen' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/></svg>',
            'void' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/></svg>',
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
        'zen' => [
            'background' => 'linear-gradient(135deg, #f4f7f9, #e6eaef)',
            'class' => 'notyfyre-zen',
            'icon' => null,
        ],
        'void' => [
            'background' => '#111113',
            'class' => 'notyfyre-void',
            'icon' => null,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Animation Options
    |--------------------------------------------------------------------------
    |
    | Available animations for toast entry and exit.
    |
    */

    'animations' => [
        // Standard animations
        'fade' => [
            'in' => 'fade-in',
            'out' => 'fade-out',
        ],
        'slide-left' => [
            'in' => 'slide-in-left',
            'out' => 'slide-out-left',
        ],
        'slide-right' => [
            'in' => 'slide-in-right',
            'out' => 'slide-out-right',
        ],
        'slide-down' => [
            'in' => 'slide-in-down',
            'out' => 'slide-out-up',
        ],
        'slide-up' => [
            'in' => 'slide-in-up',
            'out' => 'slide-out-down',
        ],
        'bounce' => [
            'in' => 'bounce-in',
            'out' => 'bounce-out',
        ],
        'zoom' => [
            'in' => 'zoom-in',
            'out' => 'zoom-out',
        ],
        'flip' => [
            'in' => 'flip-in',
            'out' => 'flip-out',
        ],

        // Individual animations
        'in' => [
            'fade-in',
            'slide-in-left',
            'slide-in-right',
            'slide-in-down',
            'slide-in-up',
            'bounce-in',
            'zoom-in',
            'flip-in',
            'swing',
            'tada',
            'pulse',
            'rubber-band',
        ],
        'out' => [
            'fade-out',
            'slide-out-left',
            'slide-out-right',
            'slide-out-up',
            'slide-out-down',
            'bounce-out',
            'zoom-out',
            'flip-out',
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
