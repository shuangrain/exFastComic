// ==UserScript==
// @name         exFastComic - Dm5
// @namespace    https://github.com/shuangrain/exFastComic
// @version      v20170612
// @description  滾滾滾看漫畫 !!
// @author       shuangrain
// @match        http://www.dm5.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var versionTag = 'exFastComic_v20170612_';
    var authorTag = 'https://github.com/shuangrain/exFastComic';

    if ($('#showimage').length > 0) {
        Run();
    }

    function Run() {
        var currentIndex = DM5_FLOAT_INDEX;
        var imgApi = 'chapterfun.ashx?cid=';
        var isLock = false;

        var arrUrl = function() {
            var tmpArr = [];
            var pageDom = $($('div.pageBar')[0]).find('a');

            $.each(pageDom, function(index, item) {
                var href = $(item).attr('href');
                var value = function() {
                    var tmp = href.substring(0, href.indexOf('-'));
                    tmp = tmp.substring(tmp.indexOf('/m') + 2);
                    return tmp;
                }();

                tmpArr.push(href + imgApi + value + '&page=' + parseInt(index + 1));
            });

            return tmpArr;
        }();

        //重新讀取第一張圖，避免預設點擊至下一頁
        loadImage(arrUrl[currentIndex - 1]);

        $(window).on('scroll', function() {
            var nowVal = $(window).scrollTop() + 2000;
            var imgVal = $('img#' + versionTag + currentIndex).height();
            var isNeedLoadNext = nowVal > imgVal;

            if (isNeedLoadNext &&
                currentIndex <= arrUrl.length &&
                !isLock) {
                loadImage(arrUrl[currentIndex - 1]);
            }
        });

        function loadImage(apiUrl) {
            isLock = true;
            $.get(apiUrl, function(result) {
                $('img#cp_image, p#imgloading').remove();

                var tmpImgUrl = eval(result)[0];
                var html = '<br/><img src="' + tmpImgUrl + '" id="' + versionTag + currentIndex + '" alt="' + authorTag + '"><br/>';

                $('div#cp_img').append(html);
                currentIndex++;

                isLock = false;
            });
        }

        //remove ggyy dom
        $('.topTool, .rightToolBar, .viewTool').remove();
    }

    (function() {
        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-100906309-1', 'auto');
        ga('send', 'pageview');
    })();
})();