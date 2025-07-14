<?php

namespace RayhanBapari\Notyfyre\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static \RayhanBapari\Notyfyre\NotyfyreManager success(string $message, string $title = 'Success', array $options = [])
 * @method static \RayhanBapari\Notyfyre\NotyfyreManager error(string $message, string $title = 'Error', array $options = [])
 * @method static \RayhanBapari\Notyfyre\NotyfyreManager warning(string $message, string $title = 'Warning', array $options = [])
 * @method static \RayhanBapari\Notyfyre\NotyfyreManager info(string $message, string $title = 'Info', array $options = [])
 * @method static \RayhanBapari\Notyfyre\NotyfyreManager addNotification(string $type, string $message, string $title = '', array $options = [])
 * @method static \Illuminate\Support\Collection getNotifications()
 * @method static bool hasNotifications()
 * @method static string render()
 * @method static \RayhanBapari\Notyfyre\NotyfyreManager config(array $options)
 */
class Notyfyre extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'notyfyre';
    }
}
