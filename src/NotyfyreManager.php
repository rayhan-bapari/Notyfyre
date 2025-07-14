<?php

namespace RayhanBapari\Notyfyre;

use Illuminate\Session\Store;
use Illuminate\Support\Collection;

class NotyfyreManager
{
    protected Store $session;
    protected string $sessionKey = 'notyfyre_notifications';

    public function __construct(Store $session)
    {
        $this->session = $session;
    }

    public function success(string $message, string $title = 'Success', array $options = []): self
    {
        return $this->addNotification('success', $message, $title, $options);
    }

    public function error(string $message, string $title = 'Error', array $options = []): self
    {
        return $this->addNotification('error', $message, $title, $options);
    }

    public function warning(string $message, string $title = 'Warning', array $options = []): self
    {
        return $this->addNotification('warning', $message, $title, $options);
    }

    public function info(string $message, string $title = 'Info', array $options = []): self
    {
        return $this->addNotification('info', $message, $title, $options);
    }

    public function addNotification(string $type, string $message, string $title = '', array $options = []): self
    {
        $notification = [
            'type' => $type,
            'message' => $message,
            'title' => $title,
            'options' => array_merge($this->getDefaultOptions(), $options),
            'id' => uniqid('notyfyre_', true)
        ];

        $notifications = $this->session->get($this->sessionKey, []);
        $notifications[] = $notification;
        $this->session->put($this->sessionKey, $notifications);

        return $this;
    }

    public function getNotifications(): Collection
    {
        $notifications = collect($this->session->get($this->sessionKey, []));
        $this->session->forget($this->sessionKey);

        return $notifications;
    }

    public function hasNotifications(): bool
    {
        return $this->session->has($this->sessionKey) &&
            count($this->session->get($this->sessionKey, [])) > 0;
    }

    public function render(): string
    {
        if (!$this->hasNotifications()) {
            return '';
        }

        $notifications = $this->getNotifications();

        return view('notyfyre::notifications', compact('notifications'))->render();
    }

    public function getDefaultOptions(): array
    {
        return config('notyfyre.default_options', [
            'closeButton' => true,
            'debug' => false,
            'newestOnTop' => true,
            'progressBar' => false,
            'positionClass' => 'toast-top-right',
            'preventDuplicates' => false,
            'showDuration' => 1000,
            'hideDuration' => 1000,
            'timeOut' => 5000,
            'extendedTimeOut' => 1000,
            'showEasing' => 'swing',
            'hideEasing' => 'linear',
            'showMethod' => 'fadeIn',
            'hideMethod' => 'fadeOut'
        ]);
    }

    public function config(array $options): self
    {
        $notifications = $this->session->get($this->sessionKey, []);

        if (!empty($notifications)) {
            $lastIndex = count($notifications) - 1;
            $notifications[$lastIndex]['options'] = array_merge(
                $notifications[$lastIndex]['options'],
                $options
            );
            $this->session->put($this->sessionKey, $notifications);
        }

        return $this;
    }
}
