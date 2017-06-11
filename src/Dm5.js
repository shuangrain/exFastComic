// ==UserScript==
// @name         exFastComic - Dm5
// @namespace    http://blog.exfast.me/
// @version      0.1
// @description  滾滾滾看漫畫 !!
// @author       shuangrain07@gmail.com
// @match        http://www.dm5.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if ($('#showimage').length > 0) {
        Run();
    }

    function Run() {
        var currentIndex = DM5_FLOAT_INDEX;
        var isLock = false;

        var arrUrl = function() {
            var tmpArr = [];
            var pageDom = $($('div.pageBar')[0]).find('a');
            $.each(pageDom, function(index, item) {
                var href = $(item).attr('href');
                var api = 'chapterfun.ashx?cid=';
                var value = function() {
                    var tmp = href.substring(0, href.indexOf('-'));
                    tmp = tmp.substring(tmp.indexOf('/m') + 2);
                    return tmp;
                }();
                tmpArr.push(href + api + value + '&page=' + parseInt(index + 1));
            });

            return tmpArr;
        }();

        //處理第一張圖
        (function() {
            $('div#cp_img').html('');
            loadImage(arrUrl[currentIndex - 1]);
        })();

        $(window).on('scroll', function() {
            var nowVal = $(window).scrollTop() + 1500;
            var isNeedLoadNext = nowVal > $('div#cp_img').height();

            if (isNeedLoadNext &&
                currentIndex < arrUrl.length &&
                !isLock) {
                loadImage(arrUrl[currentIndex]);
                currentIndex++;
            }
        });


        function loadImage(apiUrl) {
            isLock = true;
            $.ajax({
                url: apiUrl,
                type: "GET",
                success: function(result) {
                    var url = eval(result)[0];
                    var html = '<br/><img src="' + url + '"><br/>';
                    $('img#cp_image').remove();
                    $('div#cp_img').append(html);
                    isLock = false;
                }
            });
        }

        //remove tool
        $('.topTool, .rightToolBar, .viewTool').remove();
    }
})();