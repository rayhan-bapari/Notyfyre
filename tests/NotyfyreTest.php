<?php

namespace RayhanBapari\Notyfyre\Tests;

use Orchestra\Testbench\TestCase;
use RayhanBapari\Notyfyre\NotyfyreServiceProvider;
use RayhanBapari\Notyfyre\Facades\Notyfyre;
use RayhanBapari\Notyfyre\NotyfyreManager;

class NotyfyreTest extends TestCase
{
    protected function getPackageProviders($app)
    {
        return [NotyfyreServiceProvider::class];
    }

    protected function getPackageAliases($app)
    {
        return [
            'Notyfyre' => Notyfyre::class,
        ];
    }

    /** @test */
    public function it_can_create_success_notification()
    {
        Notyfyre::success('Test message', 'Test title');

        $this->assertTrue(Notyfyre::hasNotifications());

        $notifications = Notyfyre::getNotifications();
        $this->assertCount(1, $notifications);

        $notification = $notifications->first();
        $this->assertEquals('success', $notification['type']);
        $this->assertEquals('Test message', $notification['message']);
        $this->assertEquals('Test title', $notification['title']);
    }

    /** @test */
    public function it_can_create_error_notification()
    {
        Notyfyre::error('Error message');

        $notifications = Notyfyre::getNotifications();
        $notification = $notifications->first();

        $this->assertEquals('error', $notification['type']);
        $this->assertEquals('Error message', $notification['message']);
    }

    /** @test */
    public function it_can_create_warning_notification()
    {
        Notyfyre::warning('Warning message');

        $notifications = Notyfyre::getNotifications();
        $notification = $notifications->first();

        $this->assertEquals('warning', $notification['type']);
        $this->assertEquals('Warning message', $notification['message']);
    }

    /** @test */
    public function it_can_create_info_notification()
    {
        Notyfyre::info('Info message');

        $notifications = Notyfyre::getNotifications();
        $notification = $notifications->first();

        $this->assertEquals('info', $notification['type']);
        $this->assertEquals('Info message', $notification['message']);
    }

    /** @test */
    public function it_can_chain_multiple_notifications()
    {
        Notyfyre::success('Success')
               ->error('Error')
               ->warning('Warning');

        $notifications = Notyfyre::getNotifications();
        $this->assertCount(3, $notifications);
    }

    /** @test */
    public function it_merges_custom_options_with_defaults()
    {
        Notyfyre::success('Test', 'Title', ['timeOut' => 3000]);

        $notifications = Notyfyre::getNotifications();
        $notification = $notifications->first();

        $this->assertEquals(3000, $notification['options']['timeOut']);
        $this->assertTrue($notification['options']['closeButton']); // Default value
    }

    /** @test */
    public function it_clears_notifications_after_retrieval()
    {
        Notyfyre::success('Test message');

        $this->assertTrue(Notyfyre::hasNotifications());

        Notyfyre::getNotifications();

        $this->assertFalse(Notyfyre::hasNotifications());
    }

    /** @test */
    public function it_can_configure_last_notification()
    {
        Notyfyre::success('Test')->config(['timeOut' => 8000]);

        $notifications = Notyfyre::getNotifications();
        $notification = $notifications->first();

        $this->assertEquals(8000, $notification['options']['timeOut']);
    }
}
