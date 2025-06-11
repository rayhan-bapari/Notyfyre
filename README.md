# Notyfyre 🔥

[![Latest Stable Version](https://img.shields.io/packagist/v/rayhan-bapari/notyfyre.svg)](https://packagist.org/packages/rayhan-bapari/notyfyre)
[![Total Downloads](https://img.shields.io/packagist/dt/rayhan-bapari/notyfyre.svg)](https://packagist.org/packages/rayhan-bapari/notyfyre)
[![License](https://img.shields.io/github/license/rayhan-bapari/notyfyre.svg)](https://github.com/rayhan-bapari/notyfyre/blob/main/LICENSE)
[![PHP Version](https://img.shields.io/packagist/php-v/rayhan-bapari/notyfyre.svg)](https://packagist.org/packages/rayhan-bapari/notyfyre)

A modern, beautiful, and highly customizable toast notification system for Laravel applications. Features both powerful Laravel backend integration and a comprehensive JavaScript API for maximum flexibility.

## ✨ Features

- 🎨 **40+ Beautiful Themes** - From minimal to neon, glassmorphism to retro
- 🚀 **Modern JavaScript API** - ES6+ with full customization
- 💫 **Smooth Animations** - Multiple animation types (slide, fade, bounce)
- 📱 **Fully Responsive** - Mobile-first design
- ♿ **Accessibility Ready** - ARIA labels, keyboard navigation
- 🎛️ **Highly Configurable** - Every aspect can be customized
- 📦 **Laravel Integration** - Seamless backend/frontend workflow
- 🔄 **Queue Management** - Smart notification queuing
- ⏸️ **Pause/Resume** - Hover and focus loss handling
- 🎯 **Action Buttons** - Add interactive buttons to notifications
- 🎪 **Progress Bars** - Visual countdown indicators
- 🔒 **XSS Protection** - Built-in HTML escaping
- 📍 **7 Positions** - Place notifications anywhere on screen

## 🚀 Quick Start

### Installation

```bash
composer require rayhan-bapari/notyfyre
```

### Publish Assets

```bash
php artisan vendor:publish --tag=notyfyre
```

### Basic Setup

**1. In your layout (e.g., `app.blade.php`):**

```html
<!DOCTYPE html>
<html>
<head>
    @notyfyreStyles
</head>
<body>
    <!-- Your content -->

    @notyfyreScripts
    @notyfyreRender
</body>
</html>
```

**2. In your controller:**

```php
use RayhanBapari\Notyfyre\Facades\Notyfyre;

class UserController extends Controller
{
    public function store()
    {
        // Your logic here...

        Notyfyre::success('User created successfully!')->flash();

        return redirect()->back();
    }
}
```

**3. In your JavaScript:**

```javascript
// Show notifications directly
notify.success('Hello World!');
notify.error('Something went wrong!');
notify.warning('Please check your input');
notify.info('Information message');

// With options
notify.success('Success message', {
    duration: 7000,
    position: 'top-center',
    theme: 'glassmorphism',
    actions: [
        {
            text: 'Undo',
            callback: () => console.log('Undo clicked!')
        }
    ]
});
```

## 📖 Documentation

### Laravel Backend Usage

#### Basic Methods

```php
// Simple notifications
Notyfyre::success('Operation completed!')->flash();
Notyfyre::error('Something went wrong!')->flash();
Notyfyre::warning('Please check your input')->flash();
Notyfyre::info('New updates available')->flash();

// Show immediately (current request)
Notyfyre::success('Saved!')->now();
```

#### Advanced Configuration

```php
Notyfyre::success('User created successfully!')
    ->title('Success!')
    ->position('top-center')
    ->duration(7000)
    ->theme('material')
    ->icon('<i class="fas fa-check"></i>')
    ->progress(true)
    ->pauseOnHover(true)
    ->actions([
        [
            'text' => 'View',
            'callback' => 'window.location.href = "/users"'
        ],
        [
            'text' => 'Undo',
            'callback' => 'undoUserCreation()'
        ]
    ])
    ->flash();
```

#### Method Chaining

```php
Notyfyre::custom()
    ->message('Custom notification')
    ->type('success')
    ->position('bottom-right')
    ->duration(5000)
    ->theme('neon')
    ->closable(true)
    ->progress(true)
    ->pauseOnHover(true)
    ->pauseOnFocusLoss(true)
    ->preventDuplicates(true)
    ->escapeHtml(true)
    ->closeOnClick(false)
    ->progressColor('#ff6b6b')
    ->animation('bounce', 400)
    ->onShow('console.log("Notification shown")')
    ->onClose('console.log("Notification closed")')
    ->onClick('console.log("Notification clicked")')
    ->flash();
```

### JavaScript API

#### Basic Usage

```javascript
// Simple notifications
notify.success('Success message');
notify.error('Error message');
notify.warning('Warning message');
notify.info('Info message');

// Custom notification
notify.custom({
    message: 'Custom message',
    type: 'success',
    duration: 5000
});
```

#### Advanced Options

```javascript
notify.success('Order processed successfully!', {
    title: 'Order Complete',
    position: 'top-center',
    duration: 7000,
    theme: 'glassmorphism',
    closable: true,
    progress: true,
    progressColor: '#10b981',
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    preventDuplicates: true,
    closeOnClick: false,
    animation: {
        type: 'bounce',
        duration: 400
    },
    actions: [
        {
            text: 'View Order',
            callback: (element, notifier) => {
                window.location.href = '/orders/123';
            }
        },
        {
            text: 'Continue Shopping',
            callback: () => {
                console.log('Continue shopping clicked');
            },
            close: false // Don't close notification after click
        }
    ],
    onShow: (element, notifier) => {
        console.log('Notification shown');
    },
    onClose: (element, notifier) => {
        console.log('Notification closed');
    },
    onClick: (element, notifier) => {
        console.log('Notification clicked');
    }
});
```

#### Management Methods

```javascript
// Get notification ID for later reference
const id = notify.success('Message');

// Update existing notification
notify.update(id, {
    message: 'Updated message',
    type: 'warning'
});

// Remove specific notification
notify.remove(id);

// Clear all notifications
notify.clearAll();

// Clear notifications by position
notify.clearByPosition('top-right');

// Pause/resume specific notification
notify.pause(id);
notify.resume(id);

// Pause/resume all notifications
notify.pauseAll();
notify.resumeAll();

// Get active notifications
const active = notify.getActive();

// Get queue length
const queueLength = notify.getQueueLength('top-right');

// Configure global defaults
notify.configure({
    duration: 6000,
    theme: 'dark',
    position: 'bottom-center'
});
```

## 🎨 Themes

Choose from 40+ built-in themes:

**Basic Themes:**
- `default` - Clean and simple
- `minimal` - Subtle and understated
- `dark` - Dark mode friendly
- `light` - Bright and airy

**Modern Themes:**
- `glassmorphism` - Frosted glass effect
- `neumorphism` - Soft 3D appearance
- `material` - Google Material Design
- `gradient` - Beautiful gradients

**Special Effects:**
- `neon` - Glowing neon effects
- `holographic` - Iridescent colors
- `aurora` - Northern lights inspired
- `cyberpunk` - Futuristic sci-fi

**Creative Themes:**
- `retro` - Vintage 80s style
- `comic` - Comic book aesthetic
- `pixel` - 8-bit pixel art
- `handwritten` - Casual handwritten look

**Professional Themes:**
- `corporate` - Business-appropriate
- `elegant` - Sophisticated serif
- `zen` - Calm and peaceful
- `nordic` - Scandinavian minimalism

**And many more!** See the full list in the [Theme Gallery](docs/themes.md).

## 🔧 Configuration

### Laravel Configuration

Publish and edit the config file:

```bash
php artisan vendor:publish --tag=notyfyre-config
```

```php
// config/notyfyre.php
return [
    'defaults' => [
        'position' => 'top-right',
        'duration' => 5000,
        'theme' => 'default',
        'maxVisible' => 5,
        // ... more options
    ],

    'themes' => [
        'default', 'minimal', 'dark', 'glassmorphism',
        // ... all available themes
    ],

    'assets' => [
        'auto_inject' => false,
        'cdn' => [
            'enabled' => false,
            'css_url' => '...',
            'js_url' => '...'
        ]
    ]
];
```

### JavaScript Configuration

```javascript
// Configure global defaults
notify.configure({
    position: 'bottom-right',
    duration: 6000,
    theme: 'dark',
    maxVisible: 3,
    preventDuplicates: true,
    animation: {
        type: 'slide',
        duration: 300
    }
});
```

## 📍 Positions

Available positions:
- `top-left`
- `top-center`
- `top-right`
- `center`
- `bottom-left`
- `bottom-center`
- `bottom-right`

## 🎭 Animations

Animation types:
- `slide` - Slide in/out (default)
- `fade` - Fade in/out
- `bounce` - Bounce effect

## 🎪 Action Buttons

Add interactive buttons to notifications:

**Laravel:**
```php
Notyfyre::success('File uploaded!')
    ->actions([
        [
            'text' => 'View',
            'callback' => 'window.open("/files/123")'
        ],
        [
            'text' => 'Share',
            'callback' => 'shareFile(123)'
        ]
    ])
    ->flash();
```

**JavaScript:**
```javascript
notify.info('New message received', {
    actions: [
        {
            text: 'Read',
            callback: (element, notifier) => {
                window.location.href = '/messages/new';
            }
        },
        {
            text: 'Mark as Read',
            callback: () => {
                markAsRead();
            },
            close: false // Keep notification open
        }
    ]
});
```

## ♿ Accessibility

Notyfyre is built with accessibility in mind:

- **ARIA Labels** - Proper screen reader support
- **Keyboard Navigation** - Tab through interactive elements
- **High Contrast** - Supports high contrast mode
- **Reduced Motion** - Respects `prefers-reduced-motion`
- **Focus Management** - Proper focus handling

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Breakpoint Responsive** - Adapts to different screen sizes
- **Touch Friendly** - Proper touch targets
- **Safe Areas** - Respects device safe areas

## 🔒 Security

- **XSS Protection** - HTML escaping by default
- **Content Security Policy** - CSP compatible
- **Input Sanitization** - Safe handling of user input

## 🧪 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Chrome Android 60+

## 📚 Advanced Examples

### Laravel Examples

**Form Validation:**
```php
public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'email' => 'required|email|unique:users'
    ]);

    if ($validator->fails()) {
        Notyfyre::error('Please check your input')
            ->title('Validation Error')
            ->theme('material')
            ->flash();

        return back()->withErrors($validator);
    }

    // Create user...

    Notyfyre::success('Welcome! Your account has been created.')
        ->title('Account Created')
        ->duration(8000)
        ->theme('gradient')
        ->actions([
            [
                'text' => 'Complete Profile',
                'callback' => 'window.location.href = "/profile/edit"'
            ]
        ])
        ->flash();

    return redirect('/dashboard');
}
```

**File Upload Progress:**
```php
public function uploadFile(Request $request)
{
    // Upload logic...

    Notyfyre::success('File uploaded successfully!')
        ->title('Upload Complete')
        ->theme('glassmorphism')
        ->progress(true)
        ->actions([
            [
                'text' => 'View File',
                'callback' => "window.open('/files/{$file->id}')"
            ],
            [
                'text' => 'Share',
                'callback' => "shareFile({$file->id})"
            ]
        ])
        ->flash();
}
```

### JavaScript Examples

**Real-time Notifications:**
```javascript
// WebSocket or Server-Sent Events
socket.on('notification', function(data) {
    notify[data.type](data.message, {
        title: data.title,
        theme: 'aurora',
        duration: data.duration || 5000,
        actions: data.actions || []
    });
});

// API Success/Error Handling
fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        notify.success('Data loaded successfully!', {
            theme: 'material',
            duration: 3000
        });
    })
    .catch(error => {
        notify.error('Failed to load data', {
            title: 'Network Error',
            theme: 'neon',
            actions: [
                {
                    text: 'Retry',
                    callback: () => location.reload()
                }
            ]
        });
    });
```

**Progress Tracking:**
```javascript
// Simulate progress
function uploadFile() {
    const id = notify.info('Uploading file...', {
        duration: 0, // Don't auto-close
        progress: false,
        theme: 'minimal'
    });

    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;

        notify.update(id, {
            message: `Uploading file... ${progress}%`
        });

        if (progress >= 100) {
            clearInterval(interval);
            notify.update(id, {
                message: 'File uploaded successfully!',
                type: 'success',
                duration: 3000
            });
        }
    }, 200);
}
```

**Shopping Cart Example:**
```javascript
function addToCart(productId) {
    // Add to cart logic...

    notify.success('Product added to cart!', {
        theme: 'bubble',
        duration: 4000,
        actions: [
            {
                text: 'View Cart',
                callback: () => {
                    window.location.href = '/cart';
                }
            },
            {
                text: 'Continue Shopping',
                callback: () => {
                    // Do nothing, just close
                }
            }
        ]
    });
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern notification libraries
- Built with ❤️ for the Laravel community
- Icons by [Lucide](https://lucide.dev/)

## 📞 Support

- 📧 Email: mdrayhanbapari02@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/rayhan-bapari/notyfyre/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/rayhan-bapari/notyfyre/discussions)

---

<p align="center">Made with ❤️ by <a href="https://github.com/rayhan-bapari">Rayhan Bapari</a></p>
