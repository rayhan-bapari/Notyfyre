<?php

namespace RayhanBapari\Notyfyre\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static \RayhanBapari\Notyfyre\Notyfyre success(string $message = null)
 * @method static \RayhanBapari\Notyfyre\Notyfyre error(string $message = null)
 * @method static \RayhanBapari\Notyfyre\Notyfyre warning(string $message = null)
 * @method static \RayhanBapari\Notyfyre\Notyfyre info(string $message = null)
 * @method static \RayhanBapari\Notyfyre\Notyfyre message(string $message)
 * @method static \RayhanBapari\Notyfyre\Notyfyre duration(int $milliseconds)
 * @method static \RayhanBapari\Notyfyre\Notyfyre position(string $position)
 * @method static \RayhanBapari\Notyfyre\Notyfyre gravity(string $gravity)
 * @method static \RayhanBapari\Notyfyre\Notyfyre close(bool $show = true)
 * @method static \RayhanBapari\Notyfyre\Notyfyre progressBar(bool $show = true)
 * @method static \RayhanBapari\Notyfyre\Notyfyre progressBarColor(string $color)
 * @method static \RayhanBapari\Notyfyre\Notyfyre destination(string $url, bool $newWindow = false)
 * @method static \RayhanBapari\Notyfyre\Notyfyre stopOnFocus(bool $stop = true)
 * @method static \RayhanBapari\Notyfyre\Notyfyre animation(string $in, string $out)
 * @method static \RayhanBapari\Notyfyre\Notyfyre style(array $style)
 * @method static \RayhanBapari\Notyfyre\Notyfyre className(string $className)
 * @method static \RayhanBapari\Notyfyre\Notyfyre onClick(string $callback)
 * @method static \RayhanBapari\Notyfyre\Notyfyre offset(int|string $x, int|string $y)
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
