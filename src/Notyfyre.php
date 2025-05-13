<?php

namespace RayhanBapari\Notyfyre;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Session;

class Notyfyre
{
    /**
     * Notification message.
     *
     * @var string
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
     * @param string $message
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
            $this->options['enableIcon'] = $iconConfig['enabled'];
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
        $notification->options['type'] = 'success';

        $typeConfig = Config::get('notyfyre.types.success', []);
        $notification->setTypeOptions($typeConfig);

        return $notification;
    }

    /**
     * Create a new error notification.
     *
     * @param string $message
     * @return self
     */
    public static function error($message = null)
    {
        $notification = new self($message);
        $notification->options['type'] = 'error';

        $typeConfig = Config::get('notyfyre.types.error', []);
        $notification->setTypeOptions($typeConfig);

        return $notification;
    }

    /**
     * Create a new warning notification.
     *
     * @param string $message
     * @return self
     */
    public static function warning($message = null)
    {
        $notification = new self($message);
        $notification->options['type'] = 'warning';

        $typeConfig = Config::get('notyfyre.types.warning', []);
        $notification->setTypeOptions($typeConfig);

        return $notification;
    }

    /**
     * Create a new info notification.
     *
     * @param string $message
     * @return self
     */
    public static function info($message = null)
    {
        $notification = new self($message);
        $notification->options['type'] = 'info';

        $typeConfig = Config::get('notyfyre.types.info', []);
        $notification->setTypeOptions($typeConfig);

        return $notification;
    }

    /**
     * Create a new zen notification (light theme).
     *
     * @param string $message
     * @return self
     */
    public static function zen($message = null)
    {
        $notification = new self($message);
        $notification->options['type'] = 'zen';

        $typeConfig = Config::get('notyfyre.types.zen', []);
        $notification->setTypeOptions($typeConfig);

        return $notification;
    }

    /**
     * Create a new void notification (dark theme).
     *
     * @param string $message
     * @return self
     */
    public static function void($message = null)
    {
        $notification = new self($message);
        $notification->options['type'] = 'void';

        $typeConfig = Config::get('notyfyre.types.void', []);
        $notification->setTypeOptions($typeConfig);

        return $notification;
    }

    /**
     * Set type specific options from config.
     *
     * @param array $typeConfig
     * @return void
     */
    protected function setTypeOptions($typeConfig)
    {
        // Set theme options
        $theme = [];
        if (isset($typeConfig['bgColor'])) {
            $theme['bgColor'] = $typeConfig['bgColor'];
        }
        if (isset($typeConfig['textColor'])) {
            $theme['textColor'] = $typeConfig['textColor'];
        }
        if (isset($typeConfig['borderColor'])) {
            $theme['borderColor'] = $typeConfig['borderColor'];
        }
        if (isset($typeConfig['progressTrackColor'])) {
            $theme['progressTrackColor'] = $typeConfig['progressTrackColor'];
        }
        if (isset($typeConfig['progressBarColor'])) {
            $theme['progressBarColor'] = $typeConfig['progressBarColor'];
        }

        if (!empty($theme)) {
            $this->options['theme'] = $theme;
        }

        // Set class if any
        if (isset($typeConfig['class'])) {
            $this->options['className'] = $typeConfig['class'];
        }

        // Set icon if provided or use default icons
        if (isset($typeConfig['icon']) && $typeConfig['icon']) {
            $this->options['icon'] = $typeConfig['icon'];
        } else {
            $defaultIcons = Config::get('notyfyre.icons.default', []);
            $type = $this->options['type'];
            if (isset($defaultIcons[$type])) {
                $this->options['icon'] = $defaultIcons[$type];
            }
        }
    }

    /**
     * Set the notification title.
     *
     * @param string $title
     * @return self
     */
    public function title($title)
    {
        $this->options['title'] = $title;
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
     * @param string $position
     * @return self
     */
    public function position($position)
    {
        $this->options['position'] = $position;
        return $this;
    }

    /**
     * Set whether newest notifications should appear on top.
     *
     * @param bool $value
     * @return self
     */
    public function newestOnTop($value = true)
    {
        $this->options['newestOnTop'] = $value;
        return $this;
    }

    /**
     * Set the notification progress bar visibility.
     *
     * @param bool $show
     * @return self
     */
    public function showProgress($show = true)
    {
        $this->options['showProgress'] = $show;
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
        if (!isset($this->options['theme'])) {
            $this->options['theme'] = [];
        }
        $this->options['theme']['progressBarColor'] = $color;
        return $this;
    }

    /**
     * Set the notification progress track color.
     *
     * @param string $color
     * @return self
     */
    public function progressTrackColor($color)
    {
        if (!isset($this->options['theme'])) {
            $this->options['theme'] = [];
        }
        $this->options['theme']['progressTrackColor'] = $color;
        return $this;
    }

    /**
     * Set the notification close button visibility.
     *
     * @param bool $show
     * @return self
     */
    public function showClose($show = true)
    {
        $this->options['showClose'] = $show;
        return $this;
    }

    /**
     * Set whether to pause notification timeout on hover.
     *
     * @param bool $pause
     * @return self
     */
    public function pauseOnHover($pause = true)
    {
        $this->options['pauseOnHover'] = $pause;
        return $this;
    }

    /**
     * Set whether to allow HTML in the message.
     *
     * @param bool $allow
     * @return self
     */
    public function allowHtml($allow = true)
    {
        $this->options['allowHtml'] = $allow;
        return $this;
    }

    /**
     * Set the notification animations.
     *
     * @param string $in
     * @param string $out
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
     * Set the notification theme/style.
     *
     * @param array $style
     * @return self
     */
    public function style($style)
    {
        if (!isset($this->options['theme'])) {
            $this->options['theme'] = [];
        }

        // Map style properties to theme properties
        if (isset($style['background'])) {
            $this->options['theme']['bgColor'] = $style['background'];
        }
        if (isset($style['color'])) {
            $this->options['theme']['textColor'] = $style['color'];
        }
        if (isset($style['borderColor'])) {
            $this->options['theme']['borderColor'] = $style['borderColor'];
        }

        return $this;
    }

    /**
     * Set the complete theme.
     *
     * @param array $theme
     * @return self
     */
    public function theme($theme)
    {
        $this->options['theme'] = $theme;
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
     * Set the notification close callback.
     *
     * @param string $callback JavaScript callback function
     * @return self
     */
    public function onClose($callback)
    {
        $this->options['onClose'] = $callback;
        return $this;
    }

    /**
     * Set the notification icon visibility.
     *
     * @param bool $enable
     * @return self
     */
    public function enableIcon($enable = true)
    {
        $this->options['enableIcon'] = $enable;
        return $this;
    }

    /**
     * Set the notification icon.
     *
     * @param string $iconHtml HTML, URL, or CSS class for the icon
     * @return self
     */
    public function icon($iconHtml)
    {
        $this->options['icon'] = $iconHtml;
        $this->options['enableIcon'] = true;
        return $this;
    }

    /**
     * Set whether the icon is a CSS class.
     *
     * @param bool $isClass
     * @return self
     */
    public function iconIsClass($isClass = true)
    {
        $this->options['isIcon'] = $isClass;
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
        $options = $this->options;
        $message = $this->message;
        $type = $options['type'] ?? 'info';

        // Create JavaScript representation of options
        $jsOptions = json_encode($options);

        // Based on the type, use the appropriate method
        if (in_array($type, ['success', 'info', 'warning', 'error', 'zen', 'void'])) {
            return "const toast = new Notyfyre(); toast.{$type}('{$message}', {$jsOptions});";
        }

        // For custom notifications
        return "const toast = new Notyfyre(); toast.show('{$message}', {$jsOptions});";
    }
}
