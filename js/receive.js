(function($) {
    var settings = {};
    var displayFunc = function (src) {
        if (/\.(mp4|mov|mpeg|mpg|avi)$/.test(src)) {
            $('<video />').attr('src', src).prop('autoplay', true).prop('loop', true).prop('muted', true).appendTo('#container').wrap('<section class="display-media --background">',).wrap('<div class="slide-items">').wrap('<li class="slide-item" >').data("<li />","data-slidetime", "10000")
        } else if (/\.(jpg|jpeg|png|gif)$/.test(src)) {
            $('<img />').attr('src', src).appendTo('#container')
        }
    };
    var methods = {
        init : function( options ) {
            settings = $.extend({
                'uri'   : 'ws://172.20.10.2:8080',
                'conn'  : null,
                'display' : '#display',
            }, options);
            $(this).container('connect');
        },
        connect : function () {
            if (settings['conn'] == null) {
                settings['conn'] = new WebSocket(settings['uri']);
                settings['conn'].onopen = methods['onOpen'];
                settings['conn'].onmessage = methods['onMessage'];
                settings['conn'].onclose = methods['onClose'];
                settings['conn'].onerror = methods['onError'];
            }
        },
        onOpen : function ( event ) {
            console.log(event);
        },
        /**
         * データを受信したときの処理を行う関数
         * @param event
         */
        onMessage : function (event) {
            console.log(event)
            console.log(`メッセージを受信した！`);
            if (event && event.data) {
                // TODO 画像か動画かを判断する分岐
                $(this).container('display',event.data,'left');
                // display(event.data)
            }
        },
        onClose : function(event) {
            console.log(event);
        },
        onError : function(event) {
            console.log(event)
        },
        /**
         * 画像を表示する用の関数
         * @param message
         * @param align
         */
        display : displayFunc,

    }; // end of methods
    $.fn.container = function( method ) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist' );
        }
    } // end of function
})( jQuery );
$(function() {
    $(this).container({
        'uri':'ws://172.20.10.2:8080',
        'display' : '#container'
    });
});

