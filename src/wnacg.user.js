// ==UserScript==
// @name         exFastComic - Wnacg
// @namespace    https://github.com/shuangrain/exFastComic
// @version      v20170612
// @description  滾滾滾看漫畫 !!
// @author       shuangrain
// @match        http*://www.wnacg.com/photos-view-*
// @match        http*://www.wnacg.com/?ctl=photos&act=view&id=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var versionTag = 'exFastComic_v20170612_';
    var authorTag = 'https://github.com/shuangrain/exFastComic';

    var currentIndex = function() {
        var tmp = $('.pageselect').find('option:selected').text();
        tmp = tmp.substring(1, tmp.length - 1);

        return parseInt(tmp);
    }();
    var imgApi = $('select.pageselect').attr('onchange').replace("location='", "").replace("'+this.value", "");
    var isLock = false;

    var arrUrl = function() {
        var tmpArr = [];
        var pageDom = $('select.pageselect').find('option');

        $.each(pageDom, function(index, item) {
            var value = $(item).val();
            tmpArr.push(imgApi + value);
        });

        return tmpArr;
    }();

    //處理前兩張
    (function() {
        var tmpImgUrl = $('img#picarea').attr('src');
        var html = '<br/><img src="' + tmpImgUrl + '" id="' + versionTag + currentIndex + '" alt="' + authorTag + '"><br/>';
        $('span#imgarea').html('').append(html);
        if (currentIndex < arrUrl.length) {
            loadImage(arrUrl[currentIndex]);
        }
    })();

    $(window).on('scroll', function() {
        var nowVal = $(window).scrollTop() + 2000;
        var imgVal = $('img#' + versionTag + currentIndex).height();
        var isNeedLoadNext = nowVal > imgVal;

        if (isNeedLoadNext &&
            currentIndex <= arrUrl.length &&
            !isLock) {
            loadImage(arrUrl[currentIndex]);
        }
    });

    function loadImage(apiUrl) {
        isLock = true;
        $.get(apiUrl, function(result) {
            var tmpImgUrl = $($(result).find('img#picarea')[0]).attr('src');
            var html = '<br/><img src="' + tmpImgUrl + '" id="' + versionTag + (currentIndex + 1) + '" alt="' + authorTag + '"><br/>';

            $('span#imgarea').append(html);

            currentIndex++;
            isLock = false;
        });
    }

    //remove ggyy dom
    $('div.couplet, div#header, div#bread, div#bodywrap, div.tocaowrap, div.newpagewrap').remove();

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