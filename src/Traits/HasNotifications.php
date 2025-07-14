<?php

namespace RayhanBapari\Notyfyre\Traits;

use RayhanBapari\Notyfyre\Facades\Notyfyre;

trait HasNotifications
{
    /**
     * Add a success notification
     */
    public function notifySuccess(string $message, string $title = 'Success', array $options = []): self
    {
        Notyfyre::success($message, $title, $options);
        return $this;
    }

    /**
     * Add an error notification
     */
    public function notifyError(string $message, string $title = 'Error', array $options = []): self
    {
        Notyfyre::error($message, $title, $options);
        return $this;
    }

    /**
     * Add a warning notification
     */
    public function notifyWarning(string $message, string $title = 'Warning', array $options = []): self
    {
        Notyfyre::warning($message, $title, $options);
        return $this;
    }

    /**
     * Add an info notification
     */
    public function notifyInfo(string $message, string $title = 'Info', array $options = []): self
    {
        Notyfyre::info($message, $title, $options);
        return $this;
    }

    /**
     * Add notification based on validation errors
     */
    public function notifyValidationErrors($errors): self
    {
        $errorMessages = [];

        if (is_array($errors)) {
            $errorMessages = $errors;
        } elseif (is_object($errors) && method_exists($errors, 'all')) {
            $errorMessages = $errors->all();
        } elseif (is_string($errors)) {
            $errorMessages = [$errors];
        }

        foreach ($errorMessages as $error) {
            Notyfyre::error($error, 'Validation Error');
        }

        return $this;
    }
}
