<?php

namespace RayhanBapari\Notyfyre\View\Components;

use Illuminate\View\Component;
use RayhanBapari\Notyfyre\Facades\Notyfyre;

class NotyfyreContainer extends Component
{
    public bool $includeAssets;
    public bool $includeJquery;

    public function __construct(bool $includeAssets = true, bool $includeJquery = false)
    {
        $this->includeAssets = $includeAssets;
        $this->includeJquery = $includeJquery;
    }

    public function render()
    {
        return view('notyfyre::container');
    }

    public function hasNotifications(): bool
    {
        return Notyfyre::hasNotifications();
    }
}
