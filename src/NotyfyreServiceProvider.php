<?php

namespace RayhanBapari\Notyfyre;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\View;

class NotyfyreServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('notyfyre', function ($app) {
            return new Notyfyre();
        });

        $this->mergeConfigFrom(
            __DIR__ . '/config/notyfyre.php',
            'notyfyre'
        );
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        // Publish configuration
        $this->publishes([
            __DIR__ . '/config/notyfyre.php' => config_path('notyfyre.php'),
        ], 'config');

        // Publish assets
        $this->publishes([
            __DIR__ . '/resources/js' => public_path('vendor/notyfyre/js'),
            __DIR__ . '/resources/css' => public_path('vendor/notyfyre/css'),
        ], 'assets');

        // Register blade directives
        Blade::directive('notyfyreStyles', function () {
            return '<?php echo \'<link rel="stylesheet" href="\' . asset(\'vendor/notyfyre/css/notyfyre.css\') . \'">\'; ?>';
        });

        Blade::directive('notyfyreScripts', function () {
            return '<?php echo \'<script src="\' . asset(\'vendor/notyfyre/js/notyfyre.js\') . \'"></script>\'; ?>';
        });

        // Auto-load assets if enabled in config
        if (config('notyfyre.auto_load_assets', false)) {
            View::composer('*', function ($view) {
                $view->with('notyfyreAutoloadAssets', true);
            });
        }

        // Share the session notifications with all views
        View::composer('*', function ($view) {
            if (session()->has(config('notyfyre.session_key', 'notyfyre'))) {
                $notifications = session(config('notyfyre.session_key', 'notyfyre'));
                $view->with('notyfyreNotifications', $notifications);
                session()->forget(config('notyfyre.session_key', 'notyfyre'));
            }
        });

        // Load views
        $this->loadViewsFrom(__DIR__ . '/resources/views', 'notyfyre');
    }
}
