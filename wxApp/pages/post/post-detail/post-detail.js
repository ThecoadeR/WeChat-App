// pages/post/post-detail/post-detail.js
var postsData = require('../../../data/posts-data.js')
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false,
    currentId: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 调用封装好的监听音乐播放事件函数
    this.setLinsterForPlayState()
    // 文章详情页面接受对应ID
    var postId = options.id;
    // 通过data保存postID 在其他地方也可以调用
    this.data.currentId = postId;
    // 拿到数组里具体的内容
    var postData = postsData.postList[postId];
    // console.log(postData)
    this.setData({
      // 数据绑定 然后渲染在页面上
      postData: postData
    })
    //读取缓存中所有文章是否被收藏的状态
    var isCollected = wx.getStorageSync("posts_collected");
    if (isCollected) {
      // 拿到具体的某一文章的收藏状态
      var collected = isCollected[postId];
      // 数据绑定 渲染页面
      if (collected) {
        this.setData({
          collected: collected
        })
      }
    } else {
      var isCollected = {};
      isCollected[postId] = false;
      wx.setStorageSync("posts_collected", isCollected);
    }

    var g_isPlaying = app.globalData.g_isPlayingMusic
    var g_isPlayingCurrentPage = app.globalData.g_currentMusicPage
    if (g_isPlaying && g_isPlayingCurrentPage === postId) {
      this.setData({
        isPlaying: true
      })
    }
  },
  // 文章收藏按钮功能实现
  onCollectionTap: function(event) {
    var isCollected = wx.getStorageSync("posts_collected");
    // 拿到当前具体某一篇文章的收藏状态
    var newCollected = isCollected[this.data.currentId];
    // console.log(newCollected);
    newCollected = !newCollected;
    // 更新具体某篇文章的缓存值
    isCollected[this.data.currentId] = newCollected;
    // 更新缓存
    wx.setStorageSync("posts_collected", isCollected);
    // 数据绑定
    this.setData({
      collected: newCollected
    })
    // 通知用户收藏成功或取消
    wx.showToast({
      title: isCollected[this.data.currentId] ? "收藏成功" : "取消收藏",
      duration: 1000
    })
  },

  // 新闻页面音乐播放
  onPlayTap: function() {
    // 借助isPlayMusic变量来判断是播放状态还是暂停状态
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio()
      this.data.isPlayingMusic = false
      // 更新UI
      this.setData({
        isPlaying: this.data.isPlayingMusic
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postsData.postList[this.data.currentId].music.url,
        title: postsData.postList[this.data.currentId].music.title
      })
      this.data.isPlayingMusic = true
      this.setData({
        isPlaying: this.data.isPlayingMusic
      })
    }
  },
  // 监听播放事件
  setLinsterForPlayState: function() {
    // 监听音乐播放事件 让总控开关可以和图片上的开关步调一致
    var this_ = this
    wx.onBackgroundAudioPlay(function() {
      this_.setData({
        isPlaying: true
      })
      app.globalData.g_isPlayingMusic = true
      app.globalData.g_currentMusicPage = this_.data.currentId
    })
    // 监听音乐播放事件 让总控开关可以和图片上的开关步调一致
    wx.onBackgroundAudioPause(function() {
      this_.setData({
        isPlaying: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPage = null;
    }),
    // 监听音乐播放结束事件 让播放图标更改为未播放状态
    wx.onBackgroundAudioStop(function () {
      this_.setData({
        isPlaying: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPage = null;
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})