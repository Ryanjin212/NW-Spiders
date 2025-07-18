// ==UserScript==
// @name         Jable
// @namespace    gmspider
// @version      2024.12.03
// @description  Jable GMSpider
// @author       Luomo
// @match        https://jable.tv/*
// @require      https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js
// @grant        unsafeWindow
// ==/UserScript==
console.log(JSON.stringify(GM_info));
(function () {
    const GMSpiderArgs = {};
    if (typeof GmSpiderInject !== 'undefined') {
        let args = JSON.parse(GmSpiderInject.GetSpiderArgs());
        GMSpiderArgs.fName = args.shift();
        GMSpiderArgs.fArgs = args;
    } else {
        GMSpiderArgs.fName = "homeContent";
        GMSpiderArgs.fArgs = [true];
    }
    Object.freeze(GMSpiderArgs);
    const GmSpider = (function () {
        function listVideos(result) {
            result.pagecount = 1;
            $(".excerpts-wrapper .row:first .excerpt-c5").each(function (i) {
                const subTitle = $(this).find("footer").text().split('\n');
                const remarks = [
                    "👁️" + subTitle[1].trim(),
                    "❤️" + subTitle[2].trim()
                ];
                const url = new URL($(this).find(".excerpt-c5 a").attr("href"));
                result.list.push({
                    vod_id: url.pathname.split('/').at(2).toUpperCase(),
                    vod_name: $(this).find(".excerpt-c5 h2").text(),
                    vod_pic: $(this).find(".thumb").data("data-src"),
                    vod_remarks: remarks.join(" "),
                    vod_year: $(this).find(".post-view").text().trim()
                })
            });
            return result;
        }

        return {
            homeContent: function (filter) {
                let result = {
                    class: [
                        {type_id: "麻豆传媒", type_name: "麻豆传媒"},
                        {type_id: "麻豆番外篇", type_name: "麻豆番外篇"},
                        {type_id: "麻豆花絮", type_name: "麻豆花絮"},
                        {type_id: "麻豆传媒#", type_name: "其他原创/企划"},
                        {type_id: "tags", type_name: "热门标签"},
                        {type_id: "麻豆传媒#", type_name: "筛选"},
                    ],
                    filters: {
                        hot: [{
                            key: "sort_by",
                            name: "时间",
                            value: [
                                {
                                    n: "所有时间",
                                    v: "&sort_by=video_viewed"
                                },
                                {
                                    n: "本月热门",
                                    v: "&sort_by=video_viewed_month"
                                },
                                {
                                    n: "本周热门",
                                    v: "&sort_by=video_viewed_week"
                                },
                                {
                                    n: "今日热门",
                                    v: "&sort_by=video_viewed_today"
                                }
                            ]
                        }],
                        "categories/chinese-subtitle": [{
                            key: "sort_by",
                            name: "时间",
                            value: [
                                {
                                    n: "近期最佳",
                                    v: "&sort_by=post_date_and_popularity"
                                },
                                {
                                    n: "最近更新",
                                    v: "&sort_by=post_date"
                                },
                                {
                                    n: "最多观看",
                                    v: "&sort_by=video_viewed"
                                },
                                {
                                    n: "最高收藏",
                                    v: "&sort_by=most_favourited"
                                }
                            ]
                        }],
                        categories: [{
                            key: "sort_by",
                            name: "时间",
                            value: [
                                {
                                    n: "近期最佳",
                                    v: "&sort_by=post_date_and_popularity"
                                },
                                {
                                    n: "最近更新",
                                    v: "&sort_by=post_date"
                                },
                                {
                                    n: "最多观看",
                                    v: "&sort_by=video_viewed"
                                },
                                {
                                    n: "最高收藏",
                                    v: "&sort_by=most_favourited"
                                }
                            ]
                        }]
                    },
                    list: []
                };
                let itemList = [];
                $(".excerpt-c5").has(".detail").has("img").each(function () {
                    const url = new URL($(this).find("h2 a").attr("href"));
                    if (url.hostname === "madou.club") {
                        itemList.push({
                    vod_id: url.pathname.split('/').at(2),
                    vod_name: $(this).find(".excerpt-c5 h2").text(),
                    vod_pic: $(this).find(".thumb").data("data-src"),
                    vod_year: $(this).find(".absolute-bottom-right").text().trim()
                        })
                    }
                });
                result.list = itemList.filter((item, index) => {
                    return itemList.findIndex(i => i.vod_id === item.vod_id) === index
                });
                return result;
            },
            categoryContent: function (tid, pg, filter, extend) {
                let result = {
                    list: [],
                    pagecount: 1
                };
                if (tid === "categories") {
                    $("#list_categories_video_categories_list .video-img-box").each(function () {
                        const url = new URL($(this).find("a").attr("href")).pathname.split('/');
                        result.list.push({
                            vod_id: url[1] + "/" + url[2],
                            vod_name: $(this).find("h4").text(),
                            vod_pic: $(this).find("img").attr("src"),
                            vod_remarks: $(this).find(".absolute-center span").text(),
                            vod_tag: "folder",
                            style: {
                                "type": "rect",
                                "ratio": 1
                            }
                        })
                    });
                    const tags = [];
                    $(".app-nav .title-box:gt(0)").each(function () {
                        const remark = $(this).text();
                        $(this).next(".row").find(".tag").each(function () {
                            const url = new URL($(this).attr("href")).pathname.split('/');
                            result.list.push({
                                vod_id: url[1] + "/" + url[2],
                                vod_name: $(this).text(),
                                vod_remarks: remark,
                                vod_tag: "folder",
                            })
                        });
                    });
                    result.pagecount = 1;
                } else {
                    listVideos(result);
                }
                return result;
            },
            detailContent: function (ids) {
                let vodActor = [], categories = [], tags = [];
                $(".video-info .info-header .models .model").each(function () {
                    const url = new URL($(this).attr("href")).pathname.split('/');
                    const id = url[1] + "/" + url[2];
                    const name = $(this).find(".rounded-circle").data("original-title");
                    vodActor.push(`[a=cr:{"id":"${id}","name":"${name}"}/]${name}[/a]`);
                });
                $(".video-info .tags .cat").each(function () {
                    const url = new URL($(this).attr("href")).pathname.split('/');
                    const id = url[1] + "/" + url[2];
                    const name = $(this).text();
                    categories.push(`[a=cr:{"id":"${id}","name":"${name}"}/]#${name}[/a]`);
                });
                $(".video-info .tags a:not(.cat)").each(function () {
                    const url = new URL($(this).attr("href")).pathname.split('/');
                    const id = url[1] + "/" + url[2];
                    const name = $(this).text();
                    tags.push(`[a=cr:{"id":"${id}","name":"${name}"}/]#${name}[/a]`);
                });
                const vod = {
                    vod_id: ids[0],
                    vod_name: ids[0].toUpperCase(),
                    vod_pic: $("#player").attr("poster"),
                    vod_year: "更新於 " + $(".video-info .info-header .mr-3:first").text() + " " + $(".video-info .info-header .inactive-color").text(),
                    vod_remarks: tags.join(" "),
                    vod_actor: vodActor.join(" ") + " " + categories.join(" "),
                    vod_content: $(".video-info h4").text(),
                    vod_play_from: $(".video-info .info-header .header-right h6").children().remove().end().text().trim(),
                    vod_play_url: "1080P$" + unsafeWindow.hlsUrl,
                };
                return {list: [vod]};
            },
            searchContent: function (key, quick, pg) {
                const result = {
                    list: [],
                    pagecount: 1
                };
                listVideos(result);
                return result;
            }
        };
    })();
    $(document).ready(function () {
        let result = "";
        if ($("#cf-wrapper").length > 0) {
            console.log("源站不可用:" + $('title').text());
            GM_toastLong("源站不可用:" + $('title').text());
        } else {
            result = GmSpider[GMSpiderArgs.fName](...GMSpiderArgs.fArgs);
        }
        console.log(result);
        if (typeof GmSpiderInject !== 'undefined') {
            GmSpiderInject.SetSpiderResult(JSON.stringify(result));
        }
    });
})();
