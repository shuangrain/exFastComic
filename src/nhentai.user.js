// ==UserScript==
// @name         exFastComic - nhentai
// @namespace    https://github.com/shuangrain/exFastComic
// @version      v20170612
// @description  滾滾滾看漫畫 !!
// @author       shuangrain
// @match        https://nhentai.net/g/*
// @grant        none
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';

    var versionTag = 'exFastComic_v20171111_';
    var authorTag = 'https://github.com/shuangrain/exFastComic';

    if ($('#image-container').find('img').length > 0) {
        Run();
    }

    function Run() {
        let isLock = false;
        const firstImg = $('#image-container').find('img');
        let currentPage = parseInt($('#pagination-page-bottom').find('.page-number').find('.current').text());
        const totalPage = parseInt($('#pagination-page-bottom').find('.page-number').find('.num-pages').text());
        firstImg.attr('id', versionTag + currentPage);

        $(window).on('scroll', function () {
            var nowVal = $(window).scrollTop() + 2000;
            var imgVal = $('img#' + versionTag + currentPage).height();
            var isNeedLoadNext = nowVal > imgVal;
            
            if (isNeedLoadNext &&
                currentPage <= totalPage &&
                !isLock) {
                isLock = true;
                const nextNumber = currentPage + 1;
                loadImage(nextNumber);
            }
        });

        function loadImage(nextNumber) {
            const lastImgUrl = $('#image-container').find('img:last').attr('src');
            const lastImgFileName = lastImgUrl.substring(lastImgUrl.lastIndexOf('/'));
            const nextImgFileName = lastImgFileName.replace(currentPage, nextNumber);
            currentPage++;
            const nextDom = firstImg.clone().attr('src', lastImgUrl.replace(lastImgFileName, nextImgFileName)).attr('id', versionTag + currentPage);
            firstImg.parent().append(nextDom);
            isLock = false;
        }
    }

    (function () {
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
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