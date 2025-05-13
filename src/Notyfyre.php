<?php

namespace RayhanBapari\Notyfyre;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Session;

class Notyfyre
{
    /**
     * Notification message.
     *
     * @var string|null
     */
    protected $message;

    /**
     * Notification options.
     *
     * @var array
     */
    protected $options = [];

    /**
     * Create a new notification instance.
     *
     * @param string|null $message
     * @return void
     */
    public function __construct($message = null)
    {
        $this->message = $message;

        // Load default options from config
        $defaults = Config::get('notyfyre.defaults', []);
        foreach ($defaults as $key => $value) {
            $this->options[$key] = $value;
        }

        // Set default icon settings
        $iconConfig = Config::get('notyfyre.icons', []);
        if (isset($iconConfig['enabled']) && $iconConfig['enabled']) {
            $this->options['iconEnabled'] = true;
            $this->options['iconPosition'] = $iconConfig['position'] ?? 'left';
            $this->options['iconSize'] = $iconConfig['size'] ?? '24px';
        }
    }

    /**
     * Create a new success notification.
     *
     * @param string|null $message
     * @return self
     */
    public static function success($message = null)
    {
        $notification = new self($message);
        return $notification->applyType('success');
    }

    /**
     * Create a new error notification.
     *
     * @param string|null $message
     * @return self
     */
    public static function error($message = null)
    {
        $notification = new self($message);
        return $notification->applyType('error');
    }

    /**
     * Create a new warning notification.
     *
     * @param string|null $message
     * @return self
     */
    public static function warning($message = null)
    {
        $notification = new self($message);
        return $notification->applyType('warning');
    }

    /**
     * Create a new info notification.
     *
     * @param string|null $message
     * @return self
     */
    public static function info($message = null)
    {
        $notification = new self($message);
        return $notification->applyType('info');
    }

    /**
     * Apply notification type configuration.
     *
     * @param string $type
     * @return self
     */
    protected function applyType($type)
    {
        $typeConfig = Config::get("notyfyre.types.{$type}", []);

        // Apply background if configured
        if (isset($typeConfig['background'])) {
            $this->style(['background' => $typeConfig['background']]);
        }

        // Apply CSS class if configured
        if (isset($typeConfig['class'])) {
            $this->className($typeConfig['class']);
        }

        // Apply icon if enabled
        if ($this->options['iconEnabled'] ?? false) {
            $defaultIcons = Config::get('notyfyre.icons.default', []);
            $icon = $typeConfig['icon'] ?? ($defaultIcons[$type] ?? null);

            if ($icon) {
                $this->icon($icon);
            }
        }

        return $this;
    }

    /**
     * Set the notification icon.
     *
     * @param string $iconHtml HTML or SVG for the icon
     * @return self
     */
    public function icon($iconHtml)
    {
        $this->options['icon'] = $iconHtml;
        $this->options['iconEnabled'] = true;

        return $this;
    }

    /**
     * Set the notification icon position.
     *
     * @param string $position left|right
     * @return self
     */
    public function iconPosition($position)
    {
        $this->options['iconPosition'] = $position;

        return $this;
    }

    /**
     * Set the notification icon size.
     *
     * @param string $size CSS size value (e.g., '24px', '1.5rem')
     * @return self
     */
    public function iconSize($size)
    {
        $this->options['iconSize'] = $size;

        return $this;
    }

    /**
     * Disable the notification icon.
     *
     * @return self
     */
    public function noIcon()
    {
        $this->options['iconEnabled'] = false;

        return $this;
    }

    /**
     * Set the notification message.
     *
     * @param string $message
     * @return self
     */
    public function message($message)
    {
        $this->message = $message;

        return $this;
    }

    /**
     * Set the notification duration.
     *
     * @param int $milliseconds
     * @return self
     */
    public function duration($milliseconds)
    {
        $this->options['duration'] = $milliseconds;

        return $this;
    }

    /**
     * Set the notification position.
     *
     * @param string $position left|right|center
     * @return self
     */
    public function position($position)
    {
        $this->options['position'] = $position;

        return $this;
    }

    /**
     * Set the notification gravity.
     *
     * @param string $gravity top|bottom
     * @return self
     */
    public function gravity($gravity)
    {
        $this->options['gravity'] = $gravity;

        return $this;
    }

    /**
     * Set the notification close button visibility.
     *
     * @param bool $show
     * @return self
     */
    public function close($show = true)
    {
        $this->options['close'] = $show;

        return $this;
    }

    /**
     * Set the notification progress bar visibility.
     *
     * @param bool $show
     * @return self
     */
    public function progressBar($show = true)
    {
        $this->options['progressBar'] = $show;

        return $this;
    }

    /**
     * Set the notification progress bar color.
     *
     * @param string $color
     * @return self
     */
    public function progressBarColor($color)
    {
        $this->options['progressBarColor'] = $color;

        return $this;
    }

    /**
     * Set the notification destination URL.
     *
     * @param string $url
     * @param bool $newWindow
     * @return self
     */
    public function destination($url, $newWindow = false)
    {
        $this->options['destination'] = $url;
        $this->options['newWindow'] = $newWindow;

        return $this;
    }

    /**
     * Set whether to stop notification timeout on hover.
     *
     * @param bool $stop
     * @return self
     */
    public function stopOnFocus($stop = true)
    {
        $this->options['stopOnFocus'] = $stop;

        return $this;
    }

    /**
     * Set the notification animations.
     *
     * @param string $in fadeIn|slideInLeft|slideInRight|bounceIn
     * @param string $out fadeOut|slideOutLeft|slideOutRight|bounceOut
     * @return self
     */
    public function animation($in, $out)
    {
        $this->options['animation'] = [
            'in' => $in,
            'out' => $out
        ];

        return $this;
    }

    /**
     * Set the notification style.
     *
     * @param array $style
     * @return self
     */
    public function style($style)
    {
        $this->options['style'] = $style;

        return $this;
    }

    /**
     * Set the notification class name.
     *
     * @param string $className
     * @return self
     */
    public function className($className)
    {
        $this->options['className'] = $className;

        return $this;
    }

    /**
     * Set the notification click callback.
     *
     * @param string $callback JavaScript callback function
     * @return self
     */
    public function onClick($callback)
    {
        $this->options['onClick'] = $callback;

        return $this;
    }

    /**
     * Set the notification offset.
     *
     * @param int|string $x
     * @param int|string $y
     * @return self
     */
    public function offset($x, $y)
    {
        $this->options['offset'] = [
            'x' => $x,
            'y' => $y
        ];

        return $this;
    }

    /**
     * Flash the notification for the next request.
     *
     * @return self
     */
    public function flash()
    {
        $notification = [
            'message' => $this->message,
            'options' => $this->options
        ];

        Session::flash(Config::get('notyfyre.session_key', 'notyfyre'), $notification);

        return $this;
    }

    /**
     * Get the notification as an array.
     *
     * @return array
     */
    public function toArray()
    {
        return [
            'message' => $this->message,
            'options' => $this->options
        ];
    }

    /**
     * Get the notification as JSON.
     *
     * @return string
     */
    public function toJson()
    {
        return json_encode($this->toArray());
    }

    /**
     * Get the JavaScript code to display the notification.
     *
     * @return string
     */
    public function toScript()
    {
        $options = array_merge(['text' => $this->message], $this->options);
        $optionsJson = json_encode($options);

        return "Notyfyre({$optionsJson}).showToast();";
    }
}
