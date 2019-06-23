// pages/movies/movie-more/movie-more.js
var app = getApp()
var commonJS = require('../../../commonJS/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationTitle: '',
    movies: {},
    requestUrl: '',
    count: 0,
    isEmpty: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 显示loading动画
    commonJS.showLoading()
    var category = options.category
    this.data.navigationTitle = category
    var dataUrl = ''
    // 根据不同类型的电影 发送对应类型的请求
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.baseUrl + '/v2/movie/in_theaters'
        break;
      case "即将上映":
        dataUrl = app.globalData.baseUrl + '/v2/movie/coming_soon'
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.baseUrl + '/v2/movie/top250'
        break;
    }
    this.data.requestUrl = dataUrl
    commonJS.httpRequest(dataUrl, this.processData)
  },
  // 处理返回的数据 和movie.js里其实是一样的
  processData: function(res) {
    var movies = []
    for (var item in res.subjects) {
      var subject = res.subjects[item]
      if (subject.title.length >= 6) {
        subject.title = subject.title.substring(0, 6) + '...'
      }
      var temp = {
        title: subject.title,
        coverageUrl: subject.images.large,
        average: subject.rating.average,
        movieId: subject.id,
        stars: commonJS.getStars(subject.rating.stars)
      }
      movies.push(temp)
    }
    /*这里用于实现加载更多的数据  逻辑是 根据isEmpty去判断数据是不是第一次加载 如果是 那就直接把请求到的movies数据赋值给totalMovies 如果不是那就把请求到的movies数据和原本的movies数据进行合并 返回一个新的totalMovies*/
    var totalMovies = {}
    this.data.tMovies = totalMovies
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies)
    } else {
      totalMovies = movies
      this.data.isEmpty = false
    }
    this.setData({
      movies: totalMovies
    })
    this.data.count += 20
    // 隐藏loading动画
    wx.hideLoading()
    //隐藏加载动画
    wx.hideNavigationBarLoading()
    // 结束下拉刷新的效果
    wx.stopPullDownRefresh()
    if(totalMovies.length == res.total){
        wx.showToast({
          title: '没有更多啦~',
          icon: 'none',
          duration: 1000
        })
      }
  },
  // view组件滚动到页面底部的时候 触发事件
  onReachBottom: function() {
    // 拼接一个新的字符串 从上一次请求结束位置 发送一个新的请求
    var newUrl = this.data.requestUrl + '?start=' + this.data.count + '&count=20'
    commonJS.httpRequest(newUrl, this.processData)
    // 显示一个加载动画
    wx.showNavigationBarLoading()
  },

  onPullDownRefresh: function(){
    var freshUrl = this.data.requestUrl +'?start=0&count=20'
    commonJS.httpRequest(freshUrl, this.processData)
    this.totalMovies = {}
    this.data.isEmpty = true
    this.data.count = 0
  },

  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../movie-detail/movie-detail?movieId=' + movieId
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 根据不同的请求动态设置导航栏标题
    wx.setNavigationBarTitle({
      title: this.data.navigationTitle,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // wx.hideLoading()
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
  // onPullDownRefresh: function() {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function() {

  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})