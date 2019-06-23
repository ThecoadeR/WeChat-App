// pages/movies/movies.js
var commonJS = require("../../commonJS/common.js")

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:'',
    inTheaters: {},
    comingSoon: {},
    top: {},
    searchResult: {},
    searchValue: '',
    showMovie: true,
    showSearch: false,
    showCity:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCurrentCity()
    var inTheatersUrl = app.globalData.baseUrl + '/v2/movie/in_theaters' + '?start=0&count=3'
    var comingSoonUrl = app.globalData.baseUrl + '/v2/movie/coming_soon' + '?start=0&count=3'
    var topUrl = app.globalData.baseUrl + '/v2/movie/top250' + '?start=0&count=3'
    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映")
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映")
    this.getMovieListData(topUrl, "top", "豆瓣Top250")
  },

  // 获取后台返回的数据
  getMovieListData: function(url, key, categoryTitle) {
    // 显示loading动画
    commonJS.showLoading()
    var this_ = this;
    wx.request({
      url: url,
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        // 成功获取数据以后隐藏loading动画
        wx.hideLoading()
        // console.log(res)
        this_.processData(res.data, key, categoryTitle)
      },
      fail: function () {
        wx.showToast({
          title: '加载失败,请稍后再试',
          duration:1500,
          icon:'none'
        })
      }
    })
  },

  // 处理从后台返回的数据
  processData: function(res, key, categoryTitle) {
    var moviesList = [];
    if (res.subjects.length == 0) {
      wx.showToast({
        title: '暂无搜索结果',
        icon: 'none',
        duration: 1000
      })
    }
    // 遍历返回的数据下 subjects里的所有数据
    for (var index in res.subjects) {
      // 获取每一项数据
      var subject = res.subjects[index]
      // 电影的名称 同时做一个截取处理 如果名字超出规定长度就用省略号代替
      // var title = subject.title
      if (subject.title.length >= 6) {
        subject.title = subject.title.substring(0, 6) + '...'
      }
      // console.log(title)
      var temp = {
        title: subject.title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: commonJS.getStars(subject.rating.stars)
      }
      moviesList.push(temp)
    }
    var dataList = {}
    dataList[key] = {
      movies: moviesList,
      categoryTitle: categoryTitle
    }
    this.setData(dataList)
    // console.log(dataList)
  },

  // 点击更多按钮跳转到更多页面
  onMoreTap: function(event) {
    // 获取一下具体点击的是哪个title下的更多按钮
    var category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: 'movie-more/movie-more?category=' + category
    })
  },
  // 点击电影图片跳转到电影详情页面
  onMovieTap: function(event) {
    var movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: 'movie-detail/movie-detail?movieId=' + movieId
    })
  },
  // 输入框获取焦点触发事件
  onBindFocus: function() {
    // 改变页面的显示状态 隐藏movie页面 显示search页面
    this.setData({
      showMovie: false,
      showSearch: true
    })
  },
  // 输入框失去焦点触发事件
  onBindConfirm: function(event) {
    // 通过event.detail 获取用户输入的值
    this.data.searchValue = event.detail.value
    // 调用查询URL
    var searchUrl = app.globalData.baseUrl + '/v2/movie/search?&q=' + this.data.searchValue
    // 返回数据并处理数据
    this.getMovieListData(searchUrl, "searchResult", "")
  },

  onCancelTap: function(event) {
    this.setData({
      showMovie: true,
      showSearch: false,
      searchResult: {},
      searchValue: ''
    })
  },

  // 获取当前城市
  getCurrentCity: function() {
    var this_ = this
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var longitude = res.longitude
        var latitude = res.latitude
        this_.getMap(longitude, latitude)
      }
    })
  },
  getMap: function(longitude, latitude) {
    var this_ = this
    wx.request({
      url: 'https://restapi.amap.com/v3/geocode/regeo?output=json&location=' + longitude + ',' + latitude + '&key=aa49176bdf5ddfab2e4530cee1d08449&radius=1000&extensions=all',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var city = res.data.regeocode.addressComponent.city
        this_.setData({
          city:city
        })
      },
      fail: function(){
        this_setData({
          city:'城市获取失败'
        })
      }
    })
  },
  // console.log('2019对我好一点')
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
  // onPullDownRefresh: function() {

  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function() {

  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})