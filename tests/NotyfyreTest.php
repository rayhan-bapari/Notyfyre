<?php

namespace RayhanBapari\Notyfyre\Tests;

use Orchestra\Testbench\TestCase;
use RayhanBapari\Notyfyre\NotyfyreServiceProvider;
use RayhanBapari\Notyfyre\Facades\Notyfyre;

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
        $notification = Notyfyre::success('Success message');

        $this->assertEquals('Success message', $notification->toArray()['message']);
        $this->assertArrayHasKey('className', $notification->toArray()['options']);
        $this->assertEquals('notyfyre-success', $notification->toArray()['options']['className']);
    }

    /** @test */
    public function it_can_create_error_notification()
    {
        $notification = Notyfyre::error('Error message');

        $this->assertEquals('Error message', $notification->toArray()['message']);
        $this->assertArrayHasKey('className', $notification->toArray()['options']);
        $this->assertEquals('notyfyre-error', $notification->toArray()['options']['className']);
    }

    /** @test */
    public function it_can_customize_notification_options()
    {
        $notification = Notyfyre::info('Info message')
            ->duration(5000)
            ->position('center')
            ->gravity('bottom')
            ->close(false)
            ->progressBar(false);

        $options = $notification->toArray()['options'];

        $this->assertEquals(5000, $options['duration']);
        $this->assertEquals('center', $options['position']);
        $this->assertEquals('bottom', $options['gravity']);
        $this->assertFalse($options['close']);
        $this->assertFalse($options['progress_bar']);
    }

    /** @test */
    public function it_can_generate_javascript_code()
    {
        $notification = Notyfyre::success('Success message');

        $script = $notification->toScript();

        $this->assertStringContainsString('Notyfyre(', $script);
        $this->assertStringContainsString('showToast()', $script);
        $this->assertStringContainsString('"text":"Success message"', $script);
    }

    /** @test */
    public function it_flashes_notification_to_session()
    {
        Notyfyre::warning('Warning message')->flash();

        $this->assertEquals('Warning message', session('notyfyre')['message']);
    }
}
