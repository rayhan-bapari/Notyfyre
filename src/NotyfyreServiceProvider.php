<?php

namespace RayhanBapari\Notyfyre;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use RayhanBapari\Notyfyre\View\Components\NotyfyreContainer;

class NotyfyreServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton('notyfyre', function ($app) {
            return new NotyfyreManager($app['session.store']);
        });
    }

    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'notyfyre');

        $this->publishes([
            __DIR__ . '/config/notyfyre.php' => config_path('notyfyre.php'),
        ], 'notyfyre-config');

        $this->publishes([
            __DIR__ . '/../resources/views' => resource_path('views/vendor/notyfyre'),
        ], 'notyfyre-views');

        $this->publishes([
            __DIR__ . '/../resources/js' => public_path('vendor/notyfyre/js'),
            __DIR__ . '/../resources/css' => public_path('vendor/notyfyre/css'),
        ], 'notyfyre-assets');

        $this->mergeConfigFrom(__DIR__ . '/config/notyfyre.php', 'notyfyre');

        // Register Blade component
        Blade::component('notyfyre-container', NotyfyreContainer::class);

        // Register Blade directives
        Blade::directive('notyfyre', function () {
            return "<?php echo app('notyfyre')->render(); ?>";
        });
    }
}
