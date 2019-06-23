App({
  globalData:{
    // 这个变量用于保存页面的播放情况 这个变量由于是全局的 所以当页面关闭以后依旧会存在
    g_isPlayingMusic:false,
    // 这个变量用于保存具体是第几个页面 当页面关闭以后 这个变量也会重新被赋值 修复图标bug
    g_currentMusicPage:null,
    // 这个变量用于保存获取数据URL的前缀
    baseUrl:'https://douban.uieee.com'
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    // console.log('2019请对🐖华华好一点')
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
