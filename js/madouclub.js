var rule = {
    title:'麻豆社',
    host:'https://madou.club',
    url:'/category/fyclass/page/fypage',
	homeUrl:'/category/fyclass',
    headers:{
        'User-Agent':'MOBILE_UA'
    },
    timeout:5000,
    class_name:'麻豆传媒&麻豆番外篇&麻豆花絮&hongkongdoll&psychoporntw&91制片厂&果冻传媒&天美传媒&皇家华人&兔子先生&爱豆&麻豆导演系列&大象传媒&猫爪影像&精东影业&杏吧&乐播传媒&草莓&抖阴&SA国际传媒&起点传媒/性视界传媒&大鸟十八&小鹏奇啪行&女优淫娃培训营&淫欲游戏王&女神羞羞研究所&突袭女优家&情趣K歌房&KISS糖果屋&点赞排行&7天热门&30天热门',//静态分类名称拼接
    class_url:'麻豆传媒&麻豆番外篇&麻豆花絮&hongkongdoll&psychoporntw&91制片厂&果冻传媒&天美传媒&皇家华人&兔子先生&爱豆&麻豆导演系列&大象传媒&猫爪影像&精东影业&杏吧&乐播传媒&草莓&抖阴&SA国际传媒&起点传媒-性视界传媒&大鸟十八&小鹏奇啪行&女优淫娃培训营&淫欲游戏王&女神羞羞研究所&突袭女优家&情趣K歌房&KISS糖果屋&likes&week&month',//静态分类标识拼接
    limit:5,
    play_parse:true,
    lazy:'',
    一级:'.excerpts-wrapper&&article;.excerpt.excerpt-c5 h2&&Text;img&&data-src;.absolute.bottom-1&&Text;a&&href',
    二级:'*',
	搜索:'.grid.grid-cols-2 div&&a;.lozad.w-full&&alt;.lozad.w-full&&data-src;.absolute.bottom-1&&Text;a&&href',
	searchable:1,//是否启用全局搜索,
    quickSearch:1,//是否启用快速搜索,
    filterable:0,//是否启用分类筛选,
}
