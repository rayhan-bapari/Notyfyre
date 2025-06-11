<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default Configuration
    |--------------------------------------------------------------------------
    |
    | Default settings for notifications that will be applied unless
    | overridden when creating individual notifications.
    |
    */

    'defaults' => [
        'position' => 'top-right',        // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center, center
        'duration' => 5000,               // Duration in milliseconds (0 = permanent)
        'closable' => true,               // Show close button
        'pauseOnHover' => true,           // Pause timer on hover
        'pauseOnFocusLoss' => true,       // Pause when window loses focus
        'progress' => true,               // Show progress bar
        'theme' => 'default',             // Theme name
        'maxVisible' => 5,                // Maximum visible notifications
        'preventDuplicates' => false,     // Prevent duplicate messages
        'escapeHtml' => true,             // Escape HTML in messages
        'closeOnClick' => false,          // Close on click
        'icon' => true,                   // Show icon
        'animation' => [
            'type' => 'slide',            // slide, fade, bounce
            'duration' => 300,            // Animation duration in ms
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Notification Types
    |--------------------------------------------------------------------------
    |
    | Configure different notification types with their default styling
    | and behavior. You can add custom types here.
    |
    */

    'types' => [
        'success' => [
            'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
            'theme' => 'success',
            'duration' => 5000,
        ],
        'error' => [
            'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
            'theme' => 'error',
            'duration' => 7000,
        ],
        'warning' => [
            'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
            'theme' => 'warning',
            'duration' => 6000,
        ],
        'info' => [
            'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
            'theme' => 'info',
            'duration' => 5000,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Themes
    |--------------------------------------------------------------------------
    |
    | Available themes for notifications. You can create custom themes
    | by adding CSS classes and referencing them here.
    |
    */

    'themes' => [
        'default',
        'minimal',
        'dark',
        'light',
        'glassmorphism',
        'neon',
        'material',
        'gradient',
        'rounded',
        'neumorphism',
        'retro',
        'cyberpunk',
        'pastel',
        'terminal',
        'elegant',
        'bubble',
        'forest',
        'futuristic',
        'comic',
        'luxury',
        'neon-brutalism',
        'monochrome',
        'candy',
        'aqua',
        'nordic',
        'blueprint',
        'paper',
        'origami',
        'sunset',
        'holographic',
        'chalk',
        'aurora',
        'corporate',
        'zen',
        'frost',
        'velvet',
        'quantum',
        'neon-glow',
        'watercolor',
        'vintage',
        'pixel',
        'handwritten'
    ],

    /*
    |--------------------------------------------------------------------------
    | Session Configuration
    |--------------------------------------------------------------------------
    |
    | Settings for Laravel session integration
    |
    */

    'session' => [
        'key' => 'notyfyre_notifications',   // Session key for storing notifications
        'flash_key' => 'notyfyre_flash',     // Flash key for single-request notifications
    ],

    /*
    |--------------------------------------------------------------------------
    | Asset Configuration
    |--------------------------------------------------------------------------
    |
    | Settings for CSS and JavaScript assets
    |
    */

    'assets' => [
        'auto_inject' => false,              // Automatically inject CSS/JS
        'css_path' => 'vendor/notyfyre/css/notyfyre.css',
        'js_path' => 'vendor/notyfyre/js/notyfyre.js',
        'cdn' => [
            'enabled' => false,
            'css_url' => 'https://cdn.jsdelivr.net/npm/notyfyre@latest/dist/notyfyre.min.css',
            'js_url' => 'https://cdn.jsdelivr.net/npm/notyfyre@latest/dist/notyfyre.min.js',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Accessibility Configuration
    |--------------------------------------------------------------------------
    |
    | Settings for accessibility features
    |
    */

    'accessibility' => [
        'role' => 'alert',
        'aria_live' => 'polite',
        'aria_relevant' => 'additions text',
        'close_aria_label' => 'Close notification',
    ],
];
