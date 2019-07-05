//処理全体の設定
(function($){
    var settings = {}
    var methods = {                                     　　　　      　  ///変数「method」に各methodを代入
        init : function( options ) {
            settings = $.extend({
                'uri'   : 'ws://172.20.10.2:8080',
                'conn'  : null,
                'message' : '#message',
                'display' : '#display'
            }, options);
            $(settings['message']).keypress( methods['checkEvent'] );　　///キーボードが押されるとcheckEventを行う
            $(this).chat('connect');
        },

        checkEvent : function ( event ) {
            if (event && event.which == 13) {　　　　　　　　　　　　　　///エンターキーを押すとメッセージが送信される
                var message = $(settings['message']).val();
                console.log(`メッセージを送信した！`);
                if (message && settings['conn']) {
                    settings['conn'].send(message + '');
                    $(this).chat('drawText',message,'right');　　　　　　///接続が行われていれば画面の右側にメッセージを表示
                    $(settings['message']).val('');
                }
            }
        },

///接続に関する設定
        connect : function () {
            if (settings['conn'] == null) {
                settings['conn'] = new WebSocket(settings['uri']);
                settings['conn'].onopen = methods['onOpen'];
                settings['conn'].onmessage = methods['onMessage'];
                settings['conn'].onclose = methods['onClose'];
                settings['conn'].onerror = methods['onError'];
            }
        },

///接続イベント
        onOpen : function ( event ) {
            console.log('Send.js', event)
            $(this).chat('drawText','サーバに接続','left');　　　　　///接続されたら左側に'サーバーに接続'を表示
        },



///メッセージ受信イベント
        onMessage : function (event) {
            if (event && event.data) {
                $(this).chat('drawText',event.data,'left');         ///メッセージを受信したら左側に表示

            }
        },

///エラーイベント
        onError : function(event) {
            $(this).chat('drawText','エラー発生!','left');　　　　　///エラーが発生したら左側に表示
        },

///切断イベント
        onClose : function(event) {
            $(this).chat('drawText','サーバと切断','left');　　　　///切断されたら左側に'サーバーと切断'を表示
            settings['conn'] = null;
            setTimeout(methods['connect'], 1000);　　　　///1秒毎に接続を行う
        },

///表示の設定
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
        'uri':'ws://172.20.10.2:8080',
        'message' : '#message',
        'display' : '#chat'
    });
});
処理全体の設定
(function($){
        var settings = {}
        var methods = {                                     　　　　      　  ///変数「method」に各methodを代入
            init : function( options ) {
                settings = $.extend({
                    'uri'   : 'ws://localhost:8080',
                    'conn'  : null,
                    'message' : '#message',
                    'display' : '#display'
                }, options);
                $(settings['message']).keypress( methods['checkEvent'] );　　///キーボードが押されるとcheckEventを行う
                $(this).chat('connect');
            },

            checkEvent : function ( event ) {
                if (event && event.which == 13) {　　　　　　　　　　　　　　///エンターキーを押すとメッセージが送信される
                    var message = $(settings['message']).val();
                    alert(`メッセージを送信した！`);
                    if (message && settings['conn']) {
                        settings['conn'].send(message + '');
                        $(this).chat('drawText',message,'right');　　　　　　///接続が行われていれば画面の右側にメッセージを表示
                        $(settings['message']).val('');
                    }
                }
            },

///接続に関する設定
            connect : function () {
                if (settings['conn'] == null) {
                    settings['conn'] = new WebSocket(settings['uri']);
                    settings['conn'].onopen = methods['onOpen'];
                    settings['conn'].onmessage = methods['onMessage'];
                    settings['conn'].onclose = methods['onClose'];
                    settings['conn'].onerror = methods['onError'];
                }
            },

///接続イベント
            onOpen : function ( event ) {
                $(this).chat('drawText','サーバに接続','left');　　　　　///接続されたら左側に'サーバーに接続'を表示
            },


///メッセージ受信イベント
            onMessage : function (event) {
                if (event && event.data) {
                    $(this).chat('drawText',event.data,'left');         ///メッセージを受信したら左側に表示

                }
            },

///エラーイベント
            onError : function(event) {
                $(this).chat('drawText','エラー発生!','left');　　　　　///エラーが発生したら左側に表示
            },

///切断イベント
            onClose : function(event) {
                $(this).chat('drawText','サーバと切断','left');　　　　///切断されたら左側に'サーバーと切断'を表示
                settings['conn'] = null;
                setTimeout(methods['connect'], 1000);　　　　///1秒毎に接続を行う
            },

///表示の設定
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
//処理全体の設定
(function($){
        var settings = {}
        var methods = {                                     　　　　      　  ///変数「method」に各methodを代入
            init : function( options ) {
                settings = $.extend({
                    'uri'   : 'ws://localhost:8080',
                    'conn'  : null,
                    'message' : '#message',
                    'display' : '#display'
                }, options);
                $(settings['message']).keypress( methods['checkEvent'] );　　///キーボードが押されるとcheckEventを行う
                $(this).chat('connect');
            },

            checkEvent : function ( event ) {
                if (event && event.which == 13) {　　　　　　　　　　　　　　///エンターキーを押すとメッセージが送信される
                    var message = $(settings['message']).val();
                    alert(`メッセージを送信した！`);
                    if (message && settings['conn']) {
                        settings['conn'].send(message + '');
                        $(this).chat('drawText',message,'right');　　　　　　///接続が行われていれば画面の右側にメッセージを表示
                        $(settings['message']).val('');
                    }
                }
            },

///接続に関する設定
            connect : function () {
                if (settings['conn'] == null) {
                    settings['conn'] = new WebSocket(settings['uri']);
                    settings['conn'].onopen = methods['onOpen'];
                    settings['conn'].onmessage = methods['onMessage'];
                    settings['conn'].onclose = methods['onClose'];
                    settings['conn'].onerror = methods['onError'];
                }
            },

///接続イベント
            onOpen : function ( event ) {
                $(this).chat('drawText','サーバに接続','left');　　　　　///接続されたら左側に'サーバーに接続'を表示
            },


///メッセージ受信イベント
            onMessage : function (event) {
                if (event && event.data) {
                    $(this).chat('drawText',event.data,'left');         ///メッセージを受信したら左側に表示

                }
            },

///エラーイベント
            onError : function(event) {
                $(this).chat('drawText','エラー発生!','left');　　　　　///エラーが発生したら左側に表示
            },

///切断イベント
            onClose : function(event) {
                $(this).chat('drawText','サーバと切断','left');　　　　///切断されたら左側に'サーバーと切断'を表示
                settings['conn'] = null;
                setTimeout(methods['connect'], 1000);　　　　///1秒毎に接続を行う
            },

///表示の設定
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
