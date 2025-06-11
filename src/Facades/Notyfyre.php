<?php

namespace RayhanBapari\Notyfyre\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static \RayhanBapari\Notyfyre\Notyfyre success(string $message, array $options = [])
 * @method static \RayhanBapari\Notyfyre\Notyfyre error(string $message, array $options = [])
 * @method static \RayhanBapari\Notyfyre\Notyfyre warning(string $message, array $options = [])
 * @method static \RayhanBapari\Notyfyre\Notyfyre info(string $message, array $options = [])
 * @method static \RayhanBapari\Notyfyre\Notyfyre custom(array $options = [])
 * @method static \RayhanBapari\Notyfyre\Notyfyre message(string $message)
 * @method static \RayhanBapari\Notyfyre\Notyfyre title(string $title)
 * @method static \RayhanBapari\Notyfyre\Notyfyre type(string $type)
 * @method static \RayhanBapari\Notyfyre\Notyfyre position(string $position)
 * @method static \RayhanBapari\Notyfyre\Notyfyre duration(int $milliseconds)
 * @method static \RayhanBapari\Notyfyre\Notyfyre theme(string $theme)
 * @method static \RayhanBapari\Notyfyre\Notyfyre icon(string|bool $icon)
 * @method static \RayhanBapari\Notyfyre\Notyfyre closable(bool $closable = true)
 * @method static \RayhanBapari\Notyfyre\Notyfyre progress(bool $progress = true)
 * @method static \RayhanBapari\Notyfyre\Notyfyre pauseOnHover(bool $pause = true)
 * @method static \RayhanBapari\Notyfyre\Notyfyre pauseOnFocusLoss(bool $pause = true)
 * @method static \RayhanBapari\Notyfyre\Notyfyre preventDuplicates(bool $prevent = true)
 * @method static \RayhanBapari\Notyfyre\Notyfyre escapeHtml(bool $escape = true)
 * @method static \RayhanBapari\Notyfyre\Notyfyre closeOnClick(bool $close = true)
 * @method static \RayhanBapari\Notyfyre\Notyfyre actions(array $actions)
 * @method static \RayhanBapari\Notyfyre\Notyfyre progressColor(string $color)
 * @method static \RayhanBapari\Notyfyre\Notyfyre animation(string $type, int $duration = null)
 * @method static \RayhanBapari\Notyfyre\Notyfyre onShow(string $callback)
 * @method static \RayhanBapari\Notyfyre\Notyfyre onClose(string $callback)
 * @method static \RayhanBapari\Notyfyre\Notyfyre onClick(string $callback)
 * @method static void flash()
 * @method static void now()
 * @method static array toArray()
 * @method static string toJson()
 * @method static string toScript()
 * @method static array getGlobalDefaults()
 * @method static void setGlobalDefaults(array $defaults)
 *
 * @see \RayhanBapari\Notyfyre\Notyfyre
 */
class Notyfyre extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'notyfyre';
    }
}
