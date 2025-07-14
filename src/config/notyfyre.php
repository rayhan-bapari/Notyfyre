<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default Toast Options
    |--------------------------------------------------------------------------
    |
    | Default configuration options for toast notifications
    |
    */
    'default_options' => [
        'closeButton' => true,
        'debug' => false,
        'newestOnTop' => true,
        'progressBar' => false,
        'positionClass' => 'toast-top-right',
        'preventDuplicates' => false,
        'showDuration' => 1000,
        'hideDuration' => 1000,
        'timeOut' => 5000,
        'extendedTimeOut' => 1000,
        'showEasing' => 'swing',
        'hideEasing' => 'linear',
        'showMethod' => 'fadeIn',
        'hideMethod' => 'fadeOut'
    ],

    /*
    |--------------------------------------------------------------------------
    | Asset Configuration
    |--------------------------------------------------------------------------
    |
    | Configure how assets are loaded
    |
    */
    'include_jquery' => false,
    'jquery_version' => '3.6.0',
    'cdn_fallback' => true,

    /*
    |--------------------------------------------------------------------------
    | Position Classes
    |--------------------------------------------------------------------------
    |
    | Available position classes for toast notifications
    |
    */
    'positions' => [
        'toast-top-right',
        'toast-bottom-right',
        'toast-bottom-left',
        'toast-top-left',
        'toast-top-full-width',
        'toast-bottom-full-width',
        'toast-top-center',
        'toast-bottom-center'
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom CSS Classes
    |--------------------------------------------------------------------------
    |
    | Add custom CSS classes for different notification types
    |
    */
    'custom_classes' => [
        'success' => 'toast-success',
        'error' => 'toast-error',
        'warning' => 'toast-warning',
        'info' => 'toast-info'
    ]
];
