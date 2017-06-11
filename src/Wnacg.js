// ==UserScript==
// @name         exFastComic - Wnacg
// @namespace    http://blog.exfast.me/
// @version      0.1
// @description  滾滾滾看漫畫 !!
// @author       shuangrain07@gmail.com
// @match        http*://www.wnacg.com/photos-view-*
// @match        http*://www.wnacg.com/?ctl=photos&act=view&id=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //hide ad
    $('div.couplet').remove();
    var pageUrl = $('select.pageselect').attr('onchange').replace("location='", "").replace("'+this.value", "");
    var pageNum = $('select.pageselect').find('option');

    var currentIndex = 0;
    var currentId = $('form#tzform').find('input[name="pid"]').val();
    var arrUrl = [];
    var arrImage = [];

    //get all url
    $.each(pageNum, function(index, item) {
        var value = $(item).val();
        arrUrl.push(pageUrl + value);

        if (value == currentId) {
            currentIndex = index;
        }
    });

    //get image url
    $.each(arrUrl, function(index, item) {
        $.get(item, function(result) {
            arrImage.push({
                Index: index,
                Item: $(result).find('img#picarea')[0]
            });

            if (index == arrUrl.length - 1) {
                arrImage.sort(function(a, b) {
                    return parseInt(a.Index) - parseInt(b.Index);
                });
            }
        });
    });
    $(window).on('scroll', function() {
        var allVal = $(document).height() - $(window).height();
        var nowVal = $(window).scrollTop();
        var footVal = $('.newpagewrap').height() + $('.tocaowrap').height() + $('.bodywrap').height() + $('.footer').height();
        var isNeedLoadNext = (allVal - nowVal) < (footVal + 50);

        if (isNeedLoadNext && (currentIndex + 1) < arrImage.length) {
            $('span#imgarea').append(arrImage[currentIndex + 1].Item);
            currentIndex++;
        }
    });
})();
