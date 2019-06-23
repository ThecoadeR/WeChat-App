// pages/movies/movie-detail/movie-detail.js
var commonJS = require('../../../commonJS/common.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId: '',
    movieDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '电影详情',
    })
    // 接收电影id
    this.data.movieId = options.movieId
    // 获取电影详情数据
    this.getMovieDetail()

  },
  // 根据URL访问电影详情
  getMovieDetail: function() {
    // 显示loading动画
    commonJS.showLoading()
    // 拼接Url
    var detailUrl = app.globalData.baseUrl + '/v2/movie/subject/' + this.data.movieId
    // 调用commonJS里封装好的小程序发送请求的方法
    commonJS.httpRequest(detailUrl, this.processData)
  },
  // 处理返回的数据
  processData: function(res) {
    // console.log(res)
    var director = {
      name: '',
      avatar: '',
      id: ''
    }
    if (res.directors[0] != null) {
      if(res.directors[0].avatar != null){
        director.avatar =res.directors[0].avatar.large
      }
      director.name = res.directors[0].name
      director.id = res.directors[0].id 
    }
    var movieDetail = {
      director: director,
      movieImg: res.images? res.images.large : '',
      title: res.title,
      country: res.countries[0],
      originalTitle: res.original_title,
      year: res.year,
      summary: res.summary,
      wishCount: res.wish_count,
      reviewsCount: res.reviews_count,
      stars:commonJS.getStars(res.rating.stars),
      score: res.rating.average,
      generes: res.genres.join('、'),
      casts: commonJS.convertToCastsString(res.casts),
      castsInfo: commonJS.convertTocatsInfo(res.casts)
    }
    // console.log(movieDetail)
    this.setData({
    movieDetail: movieDetail
    })
    // 隐藏loading动画
    wx.hideLoading()
  }
})