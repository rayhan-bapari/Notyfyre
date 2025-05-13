<?php

namespace RayhanBapari\Notyfyre;

use Illuminate\Support\Facades\Session;

class Notyfyre
{
    /**
     * The toast notification type.
     *
     * @var string|null
     */
    protected $type = 'info';

    /**
     * The toast notification message.
     *
     * @var string|null
     */
    protected $message = null;

    /**
     * The toast notification options.
     *
     * @var array
     */
    protected $options = [];

    /**
     * Create a new Notyfyre instance.
     *
     * @param string $message
     * @return void
     */
    public function __construct()
    {
        $this->options = config('notyfyre.defaults', []);
    }

    /**
     * Create a success toast notification.
     *
     * @param string|null $message
     * @return $this
     */
    public function success(string $message = null)
    {
        $this->type = 'success';
        $this->message = $message;

        // Load default options from config
        $defaults = Config::get('notyfyre.defaults', []);
        foreach ($defaults as $key => $value) {
            $this->options[$key] = $value;
        }

        // Set default icon settings
        $iconConfig = Config::get('notyfyre.icons', []);
        if (isset($iconConfig['enabled']) && $iconConfig['enabled']) {
            $this->options['icon_enabled'] = true;
            $this->options['icon_position'] = $iconConfig['position'] ?? 'left';
            $this->options['icon_size'] = $iconConfig['size'] ?? '24px';
        }
    }

    /**
     * Create a new success notification.
     *
     * @param string $message
     * @return self
     */
    public static function success($message = null)
    {
        $notification = new self($message);

        $typeConfig = Config::get('notyfyre.types.success', []);

        if (isset($typeConfig['background'])) {
            $notification->style(['background' => $typeConfig['background']]);
        }

        if (isset($typeConfig['class'])) {
            $notification->className($typeConfig['class']);
        }

        // Set default icon if enabled
        if ($notification->options['icon_enabled'] ?? false) {
            $defaultIcons = Config::get('notyfyre.icons.default', []);
            $icon = $typeConfig['icon'] ?? ($defaultIcons['success'] ?? null);
            if ($icon) {
                $notification->icon($icon);
            }
        }

        return $notification;
    }

    /**
     * Create a warning toast notification.
     *
     * @param string $message
     * @return self
     */
    public static function error($message = null)
    {
        $notification = new self($message);

        $typeConfig = Config::get('notyfyre.types.error', []);

        if (isset($typeConfig['background'])) {
            $notification->style(['background' => $typeConfig['background']]);
        }

        if (isset($typeConfig['class'])) {
            $notification->className($typeConfig['class']);
        }

        // Set default icon if enabled
        if ($notification->options['icon_enabled'] ?? false) {
            $defaultIcons = Config::get('notyfyre.icons.default', []);
            $icon = $typeConfig['icon'] ?? ($defaultIcons['error'] ?? null);
            if ($icon) {
                $notification->icon($icon);
            }
        }

        return $notification;
    }

    /**
     * Create an info toast notification.
     *
     * @param string $message
     * @return self
     */
    public function info(string $message = null)
    {
        $notification = new self($message);

        $typeConfig = Config::get('notyfyre.types.warning', []);

        if (isset($typeConfig['background'])) {
            $notification->style(['background' => $typeConfig['background']]);
        }

        if (isset($typeConfig['class'])) {
            $notification->className($typeConfig['class']);
        }

        // Set default icon if enabled
        if ($notification->options['icon_enabled'] ?? false) {
            $defaultIcons = Config::get('notyfyre.icons.default', []);
            $icon = $typeConfig['icon'] ?? ($defaultIcons['warning'] ?? null);
            if ($icon) {
                $notification->icon($icon);
            }
        }

        return $notification;
    }

    /**
     * Create a zen toast notification.
     *
     * @param string $message
     * @return self
     */
    public function zen(string $message = null)
    {
        $notification = new self($message);

        $typeConfig = Config::get('notyfyre.types.info', []);

        if (isset($typeConfig['background'])) {
            $notification->style(['background' => $typeConfig['background']]);
        }

        if (isset($typeConfig['class'])) {
            $notification->className($typeConfig['class']);
        }

        // Set default icon if enabled
        if ($notification->options['icon_enabled'] ?? false) {
            $defaultIcons = Config::get('notyfyre.icons.default', []);
            $icon = $typeConfig['icon'] ?? ($defaultIcons['info'] ?? null);
            if ($icon) {
                $notification->icon($icon);
            }
        }

        return $notification;
    }

    /**
     * Set the notification icon.
     *
     * @param string|null $message
     * @return $this
     */
    public function void(string $message = null)
    {
        $this->options['icon'] = $iconHtml;
        $this->options['icon_enabled'] = true;

        return $this;
    }

    /**
     * Set the toast notification message.
     *
     * @param string $message
     * @return $this
     */
    public function message(string $message)
    {
        $this->options['icon_position'] = $position;

        return $this;
    }

    /**
     * Create a toast notification with custom HTML content.
     *
     * @param string $html
     * @return $this
     */
    public function customHtml(string $html)
    {
        $this->options['icon_size'] = $size;

        return $this;
    }

    /**
     * Create a toast notification with a custom HTML node.
     *
     * @param string $htmlContent HTML content for the node
     * @param string $className Optional class name for the node
     * @return $this
     */
    public function node(string $htmlContent, string $className = '')
    {
        $this->options['icon_enabled'] = false;

        return $this;
    }

    /**
     * Create a toast notification with a custom HTML node using options.
     *
     * @param array $options Node configuration options
     * @return $this
     */
    public function htmlNode(array $options)
    {
        $this->options['html_node'] = $options;
        return $this;
    }

    /**
     * Set the toast notification duration.
     *
     * @param int $milliseconds
     * @return $this
     */
    public function duration(int $milliseconds)
    {
        $this->options['duration'] = $milliseconds;
        return $this;
    }

    /**
     * Set the toast notification position.
     *
     * @param string $position
     * @return $this
     */
    public function position(string $position)
    {
        $this->options['position'] = $position;
        return $this;
    }

    /**
     * Set the toast notification gravity.
     *
     * @param string $gravity
     * @return $this
     */
    public function gravity(string $gravity)
    {
        $this->options['gravity'] = $gravity;
        return $this;
    }

    /**
     * Set the toast notification close button visibility.
     *
     * @param bool $show
     * @return $this
     */
    public function close(bool $show = true)
    {
        $this->options['close'] = $show;
        return $this;
    }

    /**
     * Set the toast notification progress bar visibility.
     *
     * @param bool $show
     * @return $this
     */
    public function progressBar(bool $show = true)
    {
        $this->options['progress_bar'] = $show;

        return $this;
    }

    /**
     * Set the toast notification progress bar color.
     *
     * @param string $color
     * @return $this
     */
    public function progressBarColor(string $color)
    {
        $this->options['progress_bar_color'] = $color;

        return $this;
    }

    /**
     * Set the toast notification destination URL.
     *
     * @param string $url
     * @param bool $newWindow
     * @return $this
     */
    public function destination(string $url, bool $newWindow = false)
    {
        $this->options['destination'] = $url;
        $this->options['new_window'] = $newWindow;

        return $this;
    }

    /**
     * Set if the toast notification stops on focus.
     *
     * @param bool $stop
     * @return $this
     */
    public function stopOnFocus(bool $stop = true)
    {
        $this->options['stop_on_focus'] = $stop;

        return $this;
    }

    /**
     * Set the toast notification animation.
     *
     * @param string $in
     * @param string $out
     * @return $this
     */
    public function animation(string $in, string $out)
    {
        $this->options['animation'] = [
            'in' => $in,
            'out' => $out,
        ];
        return $this;
    }

    /**
     * Set predefined animation pair from config.
     *
     * @param string $name
     * @return $this
     */
    public function animationSet(string $name)
    {
        $animations = config('notyfyre.animations', []);

        if (isset($animations[$name]) && is_array($animations[$name])) {
            $this->options['animation'] = $animations[$name];
        }

        return $this;
    }

    /**
     * Set animation duration in seconds.
     *
     * @param float $seconds
     * @return $this
     */
    public function animationDuration(float $seconds)
    {
        $this->options['animation_duration'] = $seconds;
        return $this;
    }

    /**
     * Add a special attention animation.
     *
     * @param string $animation
     * @return $this
     */
    public function animate(string $animation)
    {
        $this->options['animation']['in'] = $animation;
        return $this;
    }

    /**
     * Use fade animation.
     *
     * @return $this
     */
    public function fade()
    {
        return $this->animationSet('fade');
    }

    /**
     * Use slide left animation.
     *
     * @return $this
     */
    public function slideLeft()
    {
        return $this->animationSet('slide-left');
    }

    /**
     * Use slide right animation.
     *
     * @return $this
     */
    public function slideRight()
    {
        return $this->animationSet('slide-right');
    }

    /**
     * Use slide down animation.
     *
     * @return $this
     */
    public function slideDown()
    {
        return $this->animationSet('slide-down');
    }

    /**
     * Use slide up animation.
     *
     * @return $this
     */
    public function slideUp()
    {
        return $this->animationSet('slide-up');
    }

    /**
     * Use bounce animation.
     *
     * @return $this
     */
    public function bounce()
    {
        return $this->animationSet('bounce');
    }

    /**
     * Use zoom animation.
     *
     * @return $this
     */
    public function zoom()
    {
        return $this->animationSet('zoom');
    }

    /**
     * Use flip animation.
     *
     * @return $this
     */
    public function flip()
    {
        return $this->animationSet('flip');
    }

    /**
     * Use swing animation.
     *
     * @return $this
     */
    public function swing()
    {
        return $this->animate('swing');
    }

    /**
     * Use tada animation.
     *
     * @return $this
     */
    public function tada()
    {
        return $this->animate('tada');
    }

    /**
     * Use pulse animation.
     *
     * @return $this
     */
    public function pulse()
    {
        return $this->animate('pulse');
    }

    /**
     * Use rubber band animation.
     *
     * @return $this
     */
    public function rubberBand()
    {
        return $this->animate('rubber-band');
    }

    /**
     * Set the toast notification style.
     *
     * @param array $style
     * @return $this
     */
    public function style(array $style)
    {
        $this->options['style'] = $style;
        return $this;
    }

    /**
     * Set the toast notification class name.
     *
     * @param string $className
     * @return $this
     */
    public function className(string $className)
    {
        $this->options['class_name'] = $className;
        return $this;
    }

    /**
     * Set the toast notification click callback.
     *
     * @param string $callback
     * @return $this
     */
    public function onClick(string $callback)
    {
        $this->options['on_click'] = $callback;
        return $this;
    }

    /**
     * Set the toast notification offset.
     *
     * @param int|string $x
     * @param int|string $y
     * @return $this
     */
    public function offset($x, $y)
    {
        $this->options['offset'] = [
            'x' => $x,
            'y' => $y,
        ];
        return $this;
    }

    /**
     * Set the toast notification icon.
     *
     * @param string $iconHtml
     * @return $this
     */
    public function icon(string $iconHtml)
    {
        $this->options['icon'] = $iconHtml;
        return $this;
    }

    /**
     * Set the toast notification icon position.
     *
     * @param string $position
     * @return $this
     */
    public function iconPosition(string $position)
    {
        $this->options['icon_position'] = $position;
        return $this;
    }

    /**
     * Set the toast notification icon size.
     *
     * @param string $size
     * @return $this
     */
    public function iconSize(string $size)
    {
        $this->options['icon_size'] = $size;
        return $this;
    }

    /**
     * Disable the toast notification icon.
     *
     * @return $this
     */
    public function noIcon()
    {
        $this->options['icon_enabled'] = false;
        return $this;
    }

    /**
     * Allow HTML in toast message.
     *
     * @param bool $allow
     * @return $this
     */
    public function allowHtml(bool $allow = true)
    {
        $this->options['allow_html'] = $allow;
        return $this;
    }

    /**
     * Set toast title.
     *
     * @param string $title
     * @return $this
     */
    public function title(string $title)
    {
        $this->options['title'] = $title;
        return $this;
    }

    /**
     * Set toast order (newest on top or bottom).
     *
     * @param bool $newest
     * @return $this
     */
    public function newestOnTop(bool $newest = true)
    {
        $this->options['newest_on_top'] = $newest;
        return $this;
    }

    /**
     * Flash the toast notification for the next request.
     *
     * @return $this
     */
    public function flash()
    {
        Session::flash(config('notyfyre.session_key', 'notyfyre'), [
            'message' => $this->message,
            'options' => $this->prepareOptions(),
        ]);

        return $this;
    }

    /**
     * Convert the toast notification to an array.
     *
     * @return array
     */
    public function toArray()
    {
        return [
            'message' => $this->message,
            'options' => $this->prepareOptions(),
        ];
    }

    /**
     * Convert the toast notification to JSON.
     *
     * @return string
     */
    public function toJson()
    {
        return json_encode($this->toArray());
    }

    /**
     * Convert the toast notification to a JavaScript script.
     *
     * @return string
     */
    public function toScript()
    {
        $options = array_merge(['text' => $this->message], $this->options);

        // Convert snake_case keys to camelCase for JavaScript
        $jsOptions = [];
        foreach ($options as $key => $value) {
            $jsKey = lcfirst(str_replace('_', '', ucwords($key, '_')));
            $jsOptions[$jsKey] = $value;
        }

        $optionsJson = json_encode($jsOptions);

        return "Object.assign(document.createElement('div'), {
            innerHTML: `{$escapedHtml}`,
            className: `{$escapedClassName}`
        })";
    }

    /**
     * Generate JavaScript code for creating a custom HTML node with options.
     *
     * @param array $options
     * @return string
     */
    protected function generateNodeOptionsScript($options)
    {
        $content = $options['content'] ?? '';
        $className = $options['class'] ?? '';
        $tag = $options['tag'] ?? 'div';

        $escapedContent = addslashes($content);
        $escapedClassName = addslashes($className);
        $escapedTag = addslashes($tag);

        return "Object.assign(document.createElement('{$escapedTag}'), {
            innerHTML: `{$escapedContent}`,
            className: `{$escapedClassName}`
        })";
    }

    /**
     * Convert a snake_case string to camelCase.
     *
     * @param string $input
     * @return string
     */
    protected function snakeToCamel($input)
    {
        return lcfirst(str_replace('_', '', ucwords($input, '_')));
    }
}
