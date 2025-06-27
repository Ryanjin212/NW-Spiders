var rule = {
    title:'Missav',
    host:'https://missav.ai',
	searchUrl:'/cn/search/**',
    url:'/fyclass?page=fypage',
    headers:{
        'User-Agent':'MOBILE_UA'
    },
    timeout:5000,
    class_name:'最近更新&新作上市&今日热门&本週热门&本月热门&无码流出&VR&SIRO&LUXU&GANA&PRESTIGE&S-CUTE&ARA&FC2&heyzo&tokyohot&1pondo&aribbeancom&caribbeancompr&10musume&pacopacomama&gachinco&xxxav&人妻斩&naughty4610&naughty0930&麻豆传媒&韩国直播&中国直播',//静态分类名称拼接
    class_url:'dm514/cn/new&dm588/cn/release&dm291/cn/today-hot&dm169/cn/weekly-hot&monthly-hot&dm621/cn/uncensored-leak&dm2091/genres/VR&dm23/cn/siro&dm20/cn/luxu&dm17/cn/gana&dm862/cn/maan&dm23/cn/scute&dm19/cn/ara&dm99/cn/fc2&dm319995/cn/heyzo&dm29/cn/tokyohot&dm695579/cn/1pondo&dm1271239/cn/caribbeancom&dm14081/cn/caribbeancompr&dm1117248/cn/10musume&dm370414/cn/pacopacomama&dm135/cn/gachinco&dm29/cn/xxxav&dm24/cn/marriedslash&dm19/cn/naughty4610&dm22/cn/naughty0930&madou&cn/klive&cn/clive',//静态分类标识拼接
    limit:5,
    play_parse:true,
    lazy:'',
    一级:'.grid.grid-cols-2&&.relative.aspect-w-16;.lozad.w-full&&alt;.lozad.w-full&&data-src;.absolute.bottom-1&&Text;a&&href',
    二级:'*',
	搜索:'.grid.grid-cols-2 div&&a;.lozad.w-full&&alt;.lozad.w-full&&data-src;.absolute.bottom-1&&Text;a&&href',
	searchable:1,//是否启用全局搜索,
    quickSearch:1,//是否启用快速搜索,
    filterable:0,//是否启用分类筛选,
}
