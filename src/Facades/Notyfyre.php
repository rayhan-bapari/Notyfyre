<?php

namespace RayhanBapari\Notyfyre\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static \RayhanBapari\Notyfyre\Notyfyre success(string $message = null)
 * @method static \RayhanBapari\Notyfyre\Notyfyre error(string $message = null)
 * @method static \RayhanBapari\Notyfyre\Notyfyre warning(string $message = null)
 * @method static \RayhanBapari\Notyfyre\Notyfyre info(string $message = null)
 * @method static \RayhanBapari\Notyfyre\Notyfyre zen(string $message = null)
 * @method static \RayhanBapari\Notyfyre\Notyfyre void(string $message = null)
 * @method static \RayhanBapari\Notyfyre\Notyfyre message(string $message)
 * @method static \RayhanBapari\Notyfyre\Notyfyre title(string $title)
 * @method static \RayhanBapari\Notyfyre\Notyfyre duration(int $milliseconds)
 * @method static \RayhanBapari\Notyfyre\Notyfyre position(string $position)
 * @method static \RayhanBapari\Notyfyre\Notyfyre newestOnTop(bool $value = true)
 * @method static \RayhanBapari\Notyfyre\Notyfyre showProgress(bool $show = true)
 * @method static \RayhanBapari\Notyfyre\Notyfyre progressBarColor(string $color)
 * @method static \RayhanBapari\Notyfyre\Notyfyre progressTrackColor(string $color)
 * @method static \RayhanBapari\Notyfyre\Notyfyre showClose(bool $show = true)
 * @method static \RayhanBapari\Notyfyre\Notyfyre pauseOnHover(bool $pause = true)
 * @method static \RayhanBapari\Notyfyre\Notyfyre allowHtml(bool $allow = true)
 * @method static \RayhanBapari\Notyfyre\Notyfyre animation(string $in, string $out)
 * @method static \RayhanBapari\Notyfyre\Notyfyre style(array $style)
 * @method static \RayhanBapari\Notyfyre\Notyfyre className(string $className)
 * @method static \RayhanBapari\Notyfyre\Notyfyre onClick(string $callback)
 * @method static \RayhanBapari\Notyfyre\Notyfyre onClose(string $callback)
 * @method static \RayhanBapari\Notyfyre\Notyfyre enableIcon(bool $enable = true)
 * @method static \RayhanBapari\Notyfyre\Notyfyre icon(string $iconHtml)
 * @method static \RayhanBapari\Notyfyre\Notyfyre iconIsClass(bool $isClass = true)
 * @method static \RayhanBapari\Notyfyre\Notyfyre theme(array $theme)
 * @method static \RayhanBapari\Notyfyre\Notyfyre flash()
 * @method static array toArray()
 * @method static string toJson()
 * @method static string toScript()
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
