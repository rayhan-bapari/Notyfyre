# Notyfyre: Toaster for Laravel

Notyfyre is a Laravel package that provides beautiful toast notifications with ZephyrToast's rich functionality. It allows you to create notifications from both PHP controllers and JavaScript with consistent styling and behavior.

## Features

- **Multiple Toast Types**: Success, Info, Warning, Error, Zen (light theme), and Void (dark theme)
- **Flexible Positioning**: 6 positions - top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
- **Rich Animation Options**: Fade, slide, bounce, zoom effects with customizable in/out animations
- **Progress Bars**: Visual indication of notification duration
- **Pause on Hover**: Stop timeouts when users hover over notifications
- **Highly Customizable**: Control colors, timing, icons, and more
- **Backend Integration**: Easily trigger toasts from Laravel controllers
- **JavaScript API**: Use directly in frontend code

## Installation

```bash
composer require rayhan-bapari/notyfyre
```

After installation, publish the assets:

```bash
php artisan vendor:publish --provider="RayhanBapari\Notyfyre\NotyfyreServiceProvider"
```

## Configuration

Configure default options in `config/notyfyre.php`:

```php
return [
    'defaults' => [
        'duration' => 5000,
        'position' => 'top-right',
        'newestOnTop' => true,
        'showProgress' => true,
        // More options...
    ],
    // Additional configuration...
];
```

## Basic Usage

### In Controllers (PHP)

```php
// Basic usage
Notyfyre::success('Operation completed successfully!')->flash();

// With options
Notyfyre::error('Something went wrong!')
    ->duration(10000)
    ->position('bottom-right')
    ->flash();

// Additional notification types
Notyfyre::info('Information message');
Notyfyre::warning('Warning message');
Notyfyre::zen('Light theme notification');
Notyfyre::void('Dark theme notification');
```

### In Frontend (JavaScript)

Include the assets in your Blade template:

```html
@notyfyreStyles
@notyfyreScripts
```

Then use the JavaScript API:

```javascript
// Initialize (once in your application)
const toast = new Notyfyre();

// Basic usage
toast.success('Operation completed successfully!');

// With options
toast.error('Something went wrong!', {
    position: 'bottom-right',
    duration: 10000,
    title: 'Error',
    showProgress: true
});

// Additional notification types
toast.info('Information message');
toast.warning('Warning message');
toast.zen('Light theme notification');
toast.void('Dark theme notification');
```

## Advanced Options

### Controller Customization

```php
Notyfyre::success('Success message')
    ->title('Congratulations')          // Add a title
    ->position('top-right')             // Position: top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
    ->duration(5000)                    // Duration in milliseconds (0 for persistent)
    ->newestOnTop(true)                 // Show newest notifications on top
    ->showProgress(true)                // Show progress bar
    ->progressBarColor('#00ff00')       // Custom progress bar color
    ->progressTrackColor('#cccccc')     // Custom progress track color
    ->showClose(true)                   // Show close button
    ->pauseOnHover(true)                // Pause timer on hover
    ->allowHtml(false)                  // Allow HTML in message
    ->animation('zoomIn', 'zoomOut')    // Set animation in/out effects
    ->enableIcon(true)                  // Show icon
    ->icon('<svg>...</svg>')            // Custom icon HTML or URL
    ->iconIsClass(false)                // Treat icon as CSS class
    ->theme([                           // Custom theme
        'bgColor' => '#f0f4f8',
        'textColor' => '#2b3d49',
        'borderColor' => '#a5b0b6',
        'progressTrackColor' => '#00000026',
        'progressBarColor' => '#00000013'
    ])
    ->className('my-custom-class')      // Add custom CSS class
    ->onClick('function() { console.log("Clicked!"); }')  // Click callback
    ->onClose('function() { console.log("Closed!"); }')   // Close callback
    ->flash();                          // For session flash
```

### JavaScript Customization

```javascript
toast.success('Success message', {
    title: 'Congratulations',           // Add a title
    position: 'top-right',              // Position: top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
    duration: 5000,                     // Duration in milliseconds (0 for persistent)
    newestOnTop: true,                  // Show newest notifications on top
    showProgress: true,                 // Show progress bar
    showClose: true,                    // Show close button
    pauseOnHover: true,                 // Pause timer on hover
    allowHtml: false,                   // Allow HTML in message
    animation: {                        // Animation effects
        in: 'zoomIn',
        out: 'zoomOut'
    },
    enableIcon: true,                   // Show icon
    icon: '<svg>...</svg>',             // Custom icon HTML
    isIcon: false,                      // Treat icon as CSS class
    theme: {                            // Custom theme
        bgColor: '#f0f4f8',
        textColor: '#2b3d49',
        borderColor: '#a5b0b6',
        progressTrackColor: '#00000026',
        progressBarColor: '#00000013'
    },
    className: 'my-custom-class',       // Add custom CSS class
    onClick: function() {               // Click callback
        console.log('Clicked!');
    },
    onClose: function() {               // Close callback
        console.log('Closed!');
    }
});
```

## Animation Types

Available animations:
- `fadeIn`/`fadeOut` (default)
- `slideInLeft`/`slideOutLeft`
- `slideInRight`/`slideOutRight`
- `slideInDown`/`slideOutUp`
- `slideInUp`/`slideOutDown`
- `bounceIn`/`bounceOut`
- `zoomIn`/`zoomOut`

```php
// In PHP
Notyfyre::info('Message')->animation('bounceIn', 'bounceOut')->flash();

// In JavaScript
toast.info('Message', {
    animation: {
        in: 'bounceIn',
        out: 'bounceOut'
    }
});
```

## Custom Icons

```php
// In PHP
Notyfyre::success('Message')
    ->icon('<i class="fa fa-check"></i>')  // Custom HTML icon
    ->flash();

// or using a CSS class
Notyfyre::success('Message')
    ->icon('fa fa-check')
    ->iconIsClass(true)
    ->flash();

// In JavaScript
toast.success('Message', {
    icon: '<i class="fa fa-check"></i>',  // Custom HTML icon
    isIcon: false
});

// or using a CSS class
toast.success('Message', {
    icon: 'fa fa-check',
    isIcon: true
});
```

## Advanced Theme Customization

```php
// In PHP
Notyfyre::info('Message')
    ->theme([
        'bgColor' => '#ffffff',
        'textColor' => '#333333',
        'borderColor' => '#dddddd',
        'progressTrackColor' => '#eeeeee',
        'progressBarColor' => '#aaaaaa'
    ])
    ->flash();

// In JavaScript
toast.info('Message', {
    theme: {
        bgColor: '#ffffff',
        textColor: '#333333',
        borderColor: '#dddddd',
        progressTrackColor: '#eeeeee',
        progressBarColor: '#aaaaaa'
    }
});
```

## License

Released under the MIT License.
