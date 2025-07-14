# 🔥 Notyfyre - Laravel Toast Notifications

[![Latest Version on Packagist](https://img.shields.io/packagist/v/rayhan-bapari/notyfyre.svg?style=flat-square)](https://packagist.org/packages/rayhan-bapari/notyfyre)
[![Total Downloads](https://img.shields.io/packagist/dt/rayhan-bapari/notyfyre.svg?style=flat-square)](https://packagist.org/packages/rayhan-bapari/notyfyre)
[![License](https://img.shields.io/packagist/l/rayhan-bapari/notyfyre.svg?style=flat-square)](https://packagist.org/packages/rayhan-bapari/notyfyre)

A beautiful, customizable toast notification package for Laravel applications. Inspired by Toastr with enhanced features and Laravel integration.

## ✨ Features

- 🎨 Beautiful, customizable toast notifications
- 🚀 Easy integration with Laravel
- 💻 Works from both PHP (Controllers) and JavaScript
- 📱 Responsive design
- 🎯 Multiple notification types (Success, Error, Warning, Info)
- ⚙️ Highly configurable
- 🔄 Auto-handle Laravel validation errors
- 🎪 Multiple positioning options
- 📦 No external dependencies (except Laravel)

## 📋 Requirements

- PHP 8.0+
- Laravel 9.0+

## 🚀 Installation

1. **Install via Composer:**
```bash
composer require rayhan-bapari/notyfyre
```

2. **Publish Assets:**
```bash
# Publish CSS/JS assets
php artisan vendor:publish --tag="notyfyre-assets"

# Publish configuration (optional)
php artisan vendor:publish --tag="notyfyre-config"

# Publish views for customization (optional)
php artisan vendor:publish --tag="notyfyre-views"
```

3. **Add to your layout:**
```blade
<!DOCTYPE html>
<html>
<head>
    <title>Your App</title>
    <!-- Your other CSS -->
</head>
<body>
    <!-- Your content here -->

    <!-- Add before closing body tag -->
    <x-notyfyre-container />
</body>
</html>
```

## 📖 Basic Usage

### From Controllers (PHP)

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Controller;
use RayhanBapari\Notyfyre\Facades\Notyfyre;

class UserController extends Controller
{
    public function store()
    {
        // Basic notifications
        Notyfyre::success('User created successfully!');
        Notyfyre::error('Something went wrong!');
        Notyfyre::warning('Please check your input!');
        Notyfyre::info('Information updated!');

        // With custom titles
        Notyfyre::success('User created successfully!', 'Great!');

        // With custom options
        Notyfyre::success('Saved!', 'Success', [
            'timeOut' => 3000,
            'positionClass' => 'toast-top-center'
        ]);

        return redirect()->back();
    }
}
```

### Using the Trait

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Controller;
use RayhanBapari\Notyfyre\Traits\HasNotifications;

class UserController extends Controller
{
    use HasNotifications;

    public function store()
    {
        // Use trait methods
        $this->notifySuccess('User created successfully!')
             ->notifyInfo('Check your email for confirmation');

        return redirect()->back();
    }
}
```

### Using Helper Functions

```php
// Global helper functions
notify_success('Operation completed!');
notify_error('Something went wrong!');
notify_warning('Please be careful!');
notify_info('Just so you know...');

// Or use the main helper
notyfyre('success', 'User created!', 'Success');
```

### From JavaScript

```javascript
// Basic usage
notyfyre.success('Operation completed!');
notyfyre.error('Something went wrong!');
notyfyre.warning('Please be careful!');
notyfyre.info('Just so you know...');

// With titles
notyfyre.success('Operation completed!', 'Success');

// With custom options
notyfyre.success('Saved!', 'Success', {
    timeOut: 3000,
    positionClass: 'toast-bottom-right'
});

// Clear all notifications
notyfyre.clear();

// Global configuration
notyfyre.options.timeOut = 7000;
notyfyre.options.positionClass = 'toast-top-center';
```

## ⚙️ Configuration

### Position Classes

```php
'toast-top-right'        // Default
'toast-bottom-right'
'toast-bottom-left'
'toast-top-left'
'toast-top-center'
'toast-bottom-center'
'toast-top-full-width'
'toast-bottom-full-width'
```

### Timing Options

```php
'timeOut' => 5000,        // Auto-hide delay (ms)
'extendedTimeOut' => 1000, // Extended delay on hover (ms)
'showDuration' => 1000,    // Show animation duration (ms)
'hideDuration' => 1000,    // Hide animation duration (ms)
```

### Display Options

```php
'closeButton' => true,         // Show close button
'progressBar' => false,        // Show progress bar
'newestOnTop' => true,         // Stack order
'preventDuplicates' => false,  // Prevent duplicate messages
```

## 🔧 Advanced Usage

### Auto-handle Laravel Flash Messages

Add the middleware to automatically convert Laravel flash messages:

```php
// In app/Http/Kernel.php
protected $middlewareGroups = [
    'web' => [
        // ... other middleware
        \RayhanBapari\Notyfyre\Http\Middleware\NotyfyreMiddleware::class,
    ],
];
```

Now you can use Laravel's standard flash messages:

```php
return redirect()->back()->with('success', 'User created!');
return redirect()->back()->with('error', 'Something went wrong!');
```

### Custom Styling

Publish the views and customize:

```bash
php artisan vendor:publish --tag="notyfyre-views"
```

Then edit `resources/views/vendor/notyfyre/` files.

### AJAX Integration

```javascript
// In your AJAX success handler
$.post('/api/users', data)
  .done(function(response) {
    notyfyre.success(response.message, 'Success');
  })
  .fail(function(xhr) {
    notyfyre.error('Something went wrong!', 'Error');
  });
```

## 🎨 Customization

### Custom CSS Classes

Update `config/notyfyre.php`:

```php
'custom_classes' => [
    'success' => 'my-custom-success-class',
    'error' => 'my-custom-error-class',
    // ...
],
```

### Custom Icons

The package uses base64 encoded icons by default. You can override them in your CSS:

```css
.toast-success {
    background-image: url('/path/to/your/success-icon.svg') !important;
}
```

## 🧪 Testing

```bash
composer test
```

## 📝 Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## 🤝 Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## 🔒 Security

If you discover any security related issues, please email rayhan.bapari@example.com instead of using the issue tracker.

## 📄 License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

## 🙏 Credits

- [Rayhan Bapari](https://github.com/rayhan-bapari)
- Inspired by [Toastr](https://github.com/CodeSeven/toastr)
- All Contributors

## 📚 Documentation

For more detailed documentation, visit our [Documentation Site](https://github.com/rayhan-bapari/Notyfyre/wiki).
