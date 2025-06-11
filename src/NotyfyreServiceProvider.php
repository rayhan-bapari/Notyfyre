<?php

namespace RayhanBapari\Notyfyre;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Config;

class NotyfyreServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        // Register the main class in the container
        $this->app->singleton('notyfyre', function ($app) {
            return new Notyfyre();
        });

        // Merge package configuration
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
        // Publish configuration file
        $this->publishes([
            __DIR__ . '/config/notyfyre.php' => config_path('notyfyre.php'),
        ], 'notyfyre-config');

        // Publish assets
        $this->publishes([
            __DIR__ . '/resources/js' => public_path('vendor/notyfyre/js'),
            __DIR__ . '/resources/css' => public_path('vendor/notyfyre/css'),
        ], 'notyfyre-assets');

        // Publish all
        $this->publishes([
            __DIR__ . '/config/notyfyre.php' => config_path('notyfyre.php'),
            __DIR__ . '/resources/js' => public_path('vendor/notyfyre/js'),
            __DIR__ . '/resources/css' => public_path('vendor/notyfyre/css'),
        ], 'notyfyre');

        // Register Blade directives
        $this->registerBladeDirectives();

        // Register view composers
        $this->registerViewComposers();

        // Load package views
        $this->loadViewsFrom(__DIR__ . '/resources/views', 'notyfyre');

        // Publish views
        $this->publishes([
            __DIR__ . '/resources/views' => resource_path('views/vendor/notyfyre'),
        ], 'notyfyre-views');
    }

    /**
     * Register Blade directives.
     *
     * @return void
     */
    protected function registerBladeDirectives()
    {
        // Directive to include CSS
        Blade::directive('notyfyreStyles', function () {
            return $this->generateAssetTag('css');
        });

        // Directive to include JS
        Blade::directive('notyfyreScripts', function () {
            return $this->generateAssetTag('js');
        });

        // Directive to include both CSS and JS
        Blade::directive('notyfyre', function () {
            return $this->generateAssetTag('css') . "\n" . $this->generateAssetTag('js');
        });

        // Directive to render notifications
        Blade::directive('notyfyreRender', function () {
            return "<?php echo view('notyfyre::notifications')->render(); ?>";
        });
    }

    /**
     * Generate asset tag (CSS or JS).
     *
     * @param string $type
     * @return string
     */
    protected function generateAssetTag(string $type): string
    {
        $config = Config::get('notyfyre.assets', []);

        if ($config['cdn']['enabled'] ?? false) {
            $url = $config['cdn']["{$type}_url"] ?? '';
            if ($type === 'css') {
                return "<?php echo '<link rel=\"stylesheet\" href=\"{$url}\">'; ?>";
            } else {
                return "<?php echo '<script src=\"{$url}\"></script>'; ?>";
            }
        }

        $path = $config["{$type}_path"] ?? "vendor/notyfyre/{$type}/notyfyre.{$type}";

        if ($type === 'css') {
            return "<?php echo '<link rel=\"stylesheet\" href=\"' . asset('{$path}') . '\">'; ?>";
        } else {
            return "<?php echo '<script src=\"' . asset('{$path}') . '\"></script>'; ?>";
        }
    }

    /**
     * Register view composers.
     *
     * @return void
     */
    protected function registerViewComposers()
    {
        // Share configuration with all views
        View::composer('*', function ($view) {
            if (Config::get('notyfyre.assets.auto_inject', false)) {
                $view->with('notyfyreAutoInject', true);
            }
        });

        // Share notifications with all views
        View::composer('*', function ($view) {
            $this->shareNotifications($view);
        });
    }

    /**
     * Share notifications with view.
     *
     * @param \Illuminate\View\View $view
     * @return void
     */
    protected function shareNotifications($view)
    {
        $sessionKey = Config::get('notyfyre.session.key', 'notyfyre_notifications');
        $flashKey = Config::get('notyfyre.session.flash_key', 'notyfyre_flash');

        $notifications = [];

        // Get current session notifications
        if (Session::has($sessionKey)) {
            $notifications = array_merge($notifications, Session::get($sessionKey, []));
            Session::forget($sessionKey);
        }

        // Get flash notifications
        if (Session::has($flashKey)) {
            $notifications[] = Session::get($flashKey);
            Session::forget($flashKey);
        }

        if (!empty($notifications)) {
            $view->with('notyfyreNotifications', $notifications);
        }
    }
}
