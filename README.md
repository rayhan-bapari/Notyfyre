# Notyfyre

[![Latest Version on Packagist](https://img.shields.io/packagist/v/rayhan-bapari/notyfyre.svg?style=flat-square)](https://packagist.org/packages/rayhan-bapari/notyfyre)
[![Total Downloads](https://img.shields.io/packagist/dt/rayhan-bapari/notyfyre.svg?style=flat-square)](https://packagist.org/packages/rayhan-bapari/notyfyre)
[![License](https://img.shields.io/packagist/l/rayhan-bapari/notyfyre.svg?style=flat-square)](https://packagist.org/packages/rayhan-bapari/notyfyre)

A beautiful toast notification system for Laravel applications with animated transitions and progress bars.

## Features

- 🚀 **Fast and lightweight** - No dependencies except Laravel
- 🎨 **Customizable** - Change colors, positions, animations, and more
- ⏱️ **Progress bar** - Visual indicator of toast lifetime
- 🔄 **Animated transitions** - Smooth entrance and exit animations
- 🪟 **Multiple positions** - Top, bottom, left, right, or center
- 👆 **Click handlers** - Add callbacks on toast click
- 🧪 **Type-based styling** - Success, error, info, and warning styles

## Installation

You can install the package via composer:

```bash
composer require rayhan-bapari/notyfyre
```

## Publishing Assets

```bash
php artisan vendor:publish --provider="RayhanBapari\Notyfyre\NotyfyreServiceProvider" --tag="assets"
```

You can also publish the config file:

```bash
php artisan vendor:publish --provider="RayhanBapari\Notyfyre\NotyfyreServiceProvider" --tag="config"
```

## Usage

### Include Assets in Layout

Add the following Blade directives to your layout file:

```html
<head>
    <!-- ... -->
    @notyfyreStyles
</head>
<body>
    <!-- ... -->
    @notyfyreScripts
</body>
```

### Creating Notifications

#### Flash Method for Controller Redirects

```php
use RayhanBapari\Notyfyre\Facades\Notyfyre;

// In your controller
public function store()
{
    // ... your logic

    Notyfyre::success('Record created successfully!')->flash();

    return redirect()->route('home');
}
```

#### Direct JavaScript

```javascript
Notyfyre({
  text: "This is a toast",
  duration: 3000,
  destination: "https://github.com/rayhan-bapari/notyfyre",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "left", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  progressBar: true, // Show progress bar
  animation: {
    in: 'fadeIn',
    out: 'fadeOut'
  },
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
```

### Available Notification Types

```php
Notyfyre::success('Success message');
Notyfyre::error('Error message');
Notyfyre::info('Information message');
Notyfyre::warning('Warning message');
```

### Customizing Notifications

```php
Notyfyre::success('Record created successfully!')
    ->duration(5000)
    ->position('center')
    ->progressBar(true)
    ->progressBarColor('#4caf50')
    ->animation('slideInRight', 'slideOutRight')
    ->flash();
```

## Available Animation Types

- `fadeIn` / `fadeOut`
- `slideInRight` / `slideOutRight`
- `slideInLeft` / `slideOutLeft`
- `bounceIn` / `bounceOut`

## Available Position Options

- `top-right` (default)
- `top-left`
- `top-center`
- `bottom-right`
- `bottom-left`
- `bottom-center`

## Testing

```bash
composer test
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Credits

- [Rayhan Bapari](https://github.com/rayhan-bapari)
- [All Contributors](../../contributors)
- Based on [Toastify JS](https://github.com/apvarun/toastify-js)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
# Notyfyre
