<?php

namespace React\Test\Dns\Config;

use PHPUnit\Framework\TestCase;
use React\Dns\Config\FilesystemFactory;

class FilesystemFactoryTest extends TestCase
{
    /** @test */
    public function parseEtcResolvConfShouldParseCorrectly()
    {
        $contents = '#
# Mac OS X Notice
#
# This file is not used by the host name and address resolution
# or the DNS query routing mechanisms used by most processes on
# this Mac OS X system.
#
# This file is automatically generated.
#
domain v.cablecom.net
nameserver 127.0.0.1
nameserver 8.8.8.8
';
        $expected = array('127.0.0.1', '8.8.8.8');

        $capturedConfig = null;

        $loop = $this->getMockBuilder('React\EventLoop\LoopInterface')->getMock();
        $factory = new FilesystemFactory($loop);
        $factory->parseEtcResolvConf($contents)->then(function ($config) use (&$capturedConfig) {
            $capturedConfig = $config;
        });

        $this->assertNotNull($capturedConfig);
        $this->assertSame($expected, $capturedConfig->nameservers);
    }

    /** @test */
    public function createShouldLoadStuffFromFilesystem()
    {
        $this->markTestIncomplete('Filesystem API is incomplete');

        $expected = array('8.8.8.8');

        $triggerListener = null;
        $capturedConfig = null;

        $loop = $this->getMockBuilder('React\EventLoop\LoopInterface')->getMock();
        $loop
            ->expects($this->once())
            ->method('addReadStream')
            ->will($this->returnCallback(function ($stream, $listener) use (&$triggerListener) {
                $triggerListener = function () use ($stream, $listener) {
                    call_user_func($listener, $stream);
                };
            }));

        $factory = new FilesystemFactory($loop);
        $factory->create(__DIR__ . '/../Fixtures/etc/resolv.conf')->then(function ($config) use (&$capturedConfig) {
            $capturedConfig = $config;
        });

        $triggerListener();

        $this->assertNotNull($capturedConfig);
        $this->assertSame($expected, $capturedConfig->nameservers);
    }
}
