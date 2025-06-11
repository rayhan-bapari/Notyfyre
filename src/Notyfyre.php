<?php

namespace RayhanBapari\Notyfyre;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\View;

class Notyfyre
{
    /**
     * Current notification options.
     *
     * @var array
     */
    protected $options = [];

    /**
     * Global default options.
     *
     * @var array
     */
    protected static $globalDefaults = [];

    /**
     * Create a new notification instance.
     *
     * @param array $options
     */
    public function __construct(array $options = [])
    {
        $this->reset();
        $this->options = array_merge($this->options, $options);
    }

    /**
     * Reset options to defaults.
     *
     * @return void
     */
    protected function reset()
    {
        $defaults = Config::get('notyfyre.defaults', []);
        $this->options = array_merge($defaults, static::$globalDefaults);
    }

    /**
     * Create a success notification.
     *
     * @param string $message
     * @param array $options
     * @return self
     */
    public static function success(string $message, array $options = []): self
    {
        $typeConfig = Config::get('notyfyre.types.success', []);

        return (new static($options))
            ->message($message)
            ->type('success')
            ->mergeTypeConfig($typeConfig);
    }

    /**
     * Create an error notification.
     *
     * @param string $message
     * @param array $options
     * @return self
     */
    public static function error(string $message, array $options = []): self
    {
        $typeConfig = Config::get('notyfyre.types.error', []);

        return (new static($options))
            ->message($message)
            ->type('error')
            ->mergeTypeConfig($typeConfig);
    }

    /**
     * Create a warning notification.
     *
     * @param string $message
     * @param array $options
     * @return self
     */
    public static function warning(string $message, array $options = []): self
    {
        $typeConfig = Config::get('notyfyre.types.warning', []);

        return (new static($options))
            ->message($message)
            ->type('warning')
            ->mergeTypeConfig($typeConfig);
    }

    /**
     * Create an info notification.
     *
     * @param string $message
     * @param array $options
     * @return self
     */
    public static function info(string $message, array $options = []): self
    {
        $typeConfig = Config::get('notyfyre.types.info', []);

        return (new static($options))
            ->message($message)
            ->type('info')
            ->mergeTypeConfig($typeConfig);
    }

    /**
     * Create a custom notification.
     *
     * @param array $options
     * @return self
     */
    public static function custom(array $options = []): self
    {
        return new static($options);
    }

    /**
     * Set the notification message.
     *
     * @param string $message
     * @return self
     */
    public function message(string $message): self
    {
        $this->options['message'] = $message;
        return $this;
    }

    /**
     * Set the notification title.
     *
     * @param string $title
     * @return self
     */
    public function title(string $title): self
    {
        $this->options['title'] = $title;
        return $this;
    }

    /**
     * Set the notification type.
     *
     * @param string $type
     * @return self
     */
    public function type(string $type): self
    {
        $this->options['type'] = $type;
        return $this;
    }

    /**
     * Set the notification position.
     *
     * @param string $position
     * @return self
     */
    public function position(string $position): self
    {
        $this->options['position'] = $position;
        return $this;
    }

    /**
     * Set the notification duration.
     *
     * @param int $milliseconds
     * @return self
     */
    public function duration(int $milliseconds): self
    {
        $this->options['duration'] = $milliseconds;
        return $this;
    }

    /**
     * Set the notification theme.
     *
     * @param string $theme
     * @return self
     */
    public function theme(string $theme): self
    {
        $availableThemes = Config::get('notyfyre.themes', []);

        if (in_array($theme, $availableThemes)) {
            $this->options['theme'] = $theme;
        }

        return $this;
    }

    /**
     * Set the notification icon.
     *
     * @param string|bool $icon
     * @return self
     */
    public function icon($icon): self
    {
        $this->options['icon'] = $icon;
        return $this;
    }

    /**
     * Set whether the notification is closable.
     *
     * @param bool $closable
     * @return self
     */
    public function closable(bool $closable = true): self
    {
        $this->options['closable'] = $closable;
        return $this;
    }

    /**
     * Set whether to show progress bar.
     *
     * @param bool $progress
     * @return self
     */
    public function progress(bool $progress = true): self
    {
        $this->options['progress'] = $progress;
        return $this;
    }

    /**
     * Set whether to pause on hover.
     *
     * @param bool $pause
     * @return self
     */
    public function pauseOnHover(bool $pause = true): self
    {
        $this->options['pauseOnHover'] = $pause;
        return $this;
    }

    /**
     * Set whether to pause on focus loss.
     *
     * @param bool $pause
     * @return self
     */
    public function pauseOnFocusLoss(bool $pause = true): self
    {
        $this->options['pauseOnFocusLoss'] = $pause;
        return $this;
    }

    /**
     * Set whether to prevent duplicates.
     *
     * @param bool $prevent
     * @return self
     */
    public function preventDuplicates(bool $prevent = true): self
    {
        $this->options['preventDuplicates'] = $prevent;
        return $this;
    }

    /**
     * Set whether to escape HTML.
     *
     * @param bool $escape
     * @return self
     */
    public function escapeHtml(bool $escape = true): self
    {
        $this->options['escapeHtml'] = $escape;
        return $this;
    }

    /**
     * Set whether to close on click.
     *
     * @param bool $close
     * @return self
     */
    public function closeOnClick(bool $close = true): self
    {
        $this->options['closeOnClick'] = $close;
        return $this;
    }

    /**
     * Set action buttons.
     *
     * @param array $actions
     * @return self
     */
    public function actions(array $actions): self
    {
        $this->options['actions'] = $actions;
        return $this;
    }

    /**
     * Set progress bar color.
     *
     * @param string $color
     * @return self
     */
    public function progressColor(string $color): self
    {
        $this->options['progressColor'] = $color;
        return $this;
    }

    /**
     * Set animation type and duration.
     *
     * @param string $type
     * @param int|null $duration
     * @return self
     */
    public function animation(string $type, int $duration = null): self
    {
        $this->options['animation'] = [
            'type' => $type,
            'duration' => $duration ?? Config::get('notyfyre.defaults.animation.duration', 300)
        ];
        return $this;
    }

    /**
     * Set onShow callback.
     *
     * @param string $callback
     * @return self
     */
    public function onShow(string $callback): self
    {
        $this->options['onShow'] = $callback;
        return $this;
    }

    /**
     * Set onClose callback.
     *
     * @param string $callback
     * @return self
     */
    public function onClose(string $callback): self
    {
        $this->options['onClose'] = $callback;
        return $this;
    }

    /**
     * Set onClick callback.
     *
     * @param string $callback
     * @return self
     */
    public function onClick(string $callback): self
    {
        $this->options['onClick'] = $callback;
        return $this;
    }

    /**
     * Merge type-specific configuration.
     *
     * @param array $typeConfig
     * @return self
     */
    protected function mergeTypeConfig(array $typeConfig): self
    {
        foreach ($typeConfig as $key => $value) {
            if (!isset($this->options[$key])) {
                $this->options[$key] = $value;
            }
        }

        return $this;
    }

    /**
     * Flash notification for the next request.
     *
     * @return void
     */
    public function flash(): void
    {
        $flashKey = Config::get('notyfyre.session.flash_key', 'notyfyre_flash');
        Session::flash($flashKey, $this->toArray());
    }

    /**
     * Show notification immediately (store in session for current request).
     *
     * @return void
     */
    public function now(): void
    {
        $sessionKey = Config::get('notyfyre.session.key', 'notyfyre_notifications');
        $notifications = Session::get($sessionKey, []);
        $notifications[] = $this->toArray();
        Session::put($sessionKey, $notifications);
    }

    /**
     * Get notification as array.
     *
     * @return array
     */
    public function toArray(): array
    {
        return $this->options;
    }

    /**
     * Get notification as JSON.
     *
     * @return string
     */
    public function toJson(): string
    {
        return json_encode($this->toArray());
    }

    /**
     * Get JavaScript code to show the notification.
     *
     * @return string
     */
    public function toScript(): string
    {
        $options = $this->toArray();
        $message = $options['message'] ?? '';
        $type = $options['type'] ?? 'info';

        // Remove message from options to avoid duplication
        unset($options['message']);

        $jsonOptions = json_encode($options);

        return "notify.{$type}('{$message}', {$jsonOptions});";
    }

    /**
     * Get global default options.
     *
     * @return array
     */
    public static function getGlobalDefaults(): array
    {
        return static::$globalDefaults;
    }

    /**
     * Set global default options.
     *
     * @param array $defaults
     * @return void
     */
    public static function setGlobalDefaults(array $defaults): void
    {
        static::$globalDefaults = array_merge(static::$globalDefaults, $defaults);
    }
}
