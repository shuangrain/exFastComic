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
        //remove tool
        $('.rightToolBar').remove();

        var pageDom = $($('div.pageBar')[0]).find('a');

        var currentIndex = parseInt($('.arrow_down').text().replace('第', '').replace('页', '')) - 1;

        var arrUrl = [];
        var arrImage = [];

        $.each(pageDom, function(index, item) {
            var url = $(item).attr('href') + 'chapterfun.ashx?cid=';
            var value = url.substring(0, url.indexOf('-'));
            value = value.substring(value.indexOf('/m') + 2);
            arrUrl.push({
                PageNumber: index + 1,
                Url: url + value + '&page=' + parseInt(index + 1)
            });
        });


        //get image url
        $.each(arrUrl, function(index, item) {
            $.ajax({
                url: item.Url,
                type: "GET",
                success: function(result) {
                    var url = eval(result)[0];
                    arrImage.push({
                        PageNumber: item.PageNumber,
                        Item: '<br/><img src="' + url + '" style="cursor: pointer; width: auto; height: auto;" id="cp_image"><div style="color: red;">' + item.PageNumber + '</div><br/>'
                    });

                    if (index == arrUrl.length - 1) {
                        arrImage.sort(function(a, b) {
                            return parseInt(a.PageNumber) - parseInt(b.PageNumber);
                        });

                        $.each(arrImage, function(index, item) {
                            if (currentIndex < item.PageNumber - 1) {
                                $('div#cp_img').append(item.Item);
                            }
                        });
                    }

                }
            });
        });
    }
})();