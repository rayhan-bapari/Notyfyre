<?php

namespace RayhanBapari\Notyfyre\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use RayhanBapari\Notyfyre\Facades\Notyfyre;

class NotyfyreMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Handle validation errors automatically
        if ($response instanceof RedirectResponse && $request->session()->has('errors')) {
            $errors = $request->session()->get('errors');

            if ($errors && method_exists($errors, 'all')) {
                foreach ($errors->all() as $error) {
                    Notyfyre::error($error, 'Validation Error');
                }
            }
        }

        // Handle Laravel's flash messages
        if ($request->session()->has('success')) {
            Notyfyre::success($request->session()->get('success'));
        }

        if ($request->session()->has('error')) {
            Notyfyre::error($request->session()->get('error'));
        }

        if ($request->session()->has('warning')) {
            Notyfyre::warning($request->session()->get('warning'));
        }

        if ($request->session()->has('info')) {
            Notyfyre::info($request->session()->get('info'));
        }

        return $response;
    }
}
