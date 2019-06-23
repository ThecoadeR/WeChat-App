Page({
  /**
   * 启动页面跳转至小程序首页
   */
  onTap: function() {
    wx.navigateTo({
      url: '/pages/movies/movies',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    isScale: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var this_ = this
    var animation = wx.createAnimation({})
    setInterval(function () {
      if (this_.data.isScale == false) {
        animation.scale(1.3).step({
          duration: 1000
        })
        this_.data.isScale = !this_.data.isScale
      } else{
        animation.scale(1.0).step({
          duration: 1000
        })
        this_.data.isScale = !this_.data.isScale
      }
      this_.setData({
        animation: animation.export()
      })
    },1000)
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
    clearInterval()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval()

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