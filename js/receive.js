(function($){
        var settings = {};

        var methods = {
            init : function( options ) {
                settings = $.extend({
                    'uri'   : 'ws://localhost:8080',
                    'conn'  : null,
                    'message' : '#message',
                    'display' : '#display',
                }, options);
                $(settings['message']).keypress( methods['checkEvent'] );
                $(this).chat('connect');
            },

            checkEvent : function ( event ) {
                if (event && event.which == 13) {
                    var message = $(settings['message']).val();
                    if (message && settings['conn']) {
                        settings['conn'].send(message + '');
                        $(this).chat('drawText',message,'right');
                        $(settings['message']).val('');
                    }
                }
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
                $(this).chat('drawText','サーバに接続','left');
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
                    $(this).chat('display',event.data,'left');
                    // display(event.data)
                }
            },

            /**
             * 画像を表示する用の関数
             * @param message
             * @param align
             */
            display : function (src) {
                if (/\.(mp4|mov|mpeg|mpg|avi)$/.test(src)) {
                    console.log('test')
                    $('<video />').attr('src', src).prop('autoplay', true).prop('loop', true).appendTo('#chat')
                } else if (/\.(jpg|jpeg|png|gif)$/.test(src)) {
                    console.log('テスト')
                    $('<img />').attr('src', src).appendTo('#chat')
                }
            },

            onError : function(event) {
                console.log(event)
                $(this).chat('drawText',event,'left');
                $(this).chat('drawText','エラー発生!','left');
            },

            onClose : function(event) {
                $(this).chat('drawText','サーバと切断','left');
                settings['conn'] = null;
                setTimeout(methods['connect'], 1000);
            },

            drawText : function (message, align='left') {
                if ( align === 'left' ) {
                    var inner = $('<div class="left"></div>').text(message);
                } else {
                    var inner = $('<div class="right"></div>').text(message);
                }
                var box = $('<div class="box"></div>').html(inner);
                $('#chat').prepend(box);
            },
        }; // end of methods

        $.fn.chat = function( method ) {
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
    $(this).chat({
        'uri':'ws://localhost:8080',
        'message' : '#message',
        'display' : '#chat'
    });
});

