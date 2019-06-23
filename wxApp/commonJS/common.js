// 获取返回的数据有几颗星星 star=50的话 => 同时把星星转化成[1,1,1,1,1]这样的数组 
function getStars(stars) {
  // 截取返回的数据里的第一个数字 比如返回的数据stars是50 那就只拿5
  var num = stars.toString().substring(0, 1)
  var array = []
  // i<5是因为总共只有5颗星
  for (var i = 0; i < 5; i++) {
    if (i <= num) {
      array.push(1)
    } else {
      array.push(0)
    }
  }
  return array
}

// 发送数据请求
function httpRequest(url, callBack) {
  wx.request({
    url: url,
    header:{
      'content-type':'json'
    },
    success: function(res) {
      callBack(res.data)
    },
    fail: function(error) {
      console.log(error)
    }
  })
}

  function convertToCastsString(array) {
    var casts = ''
    for (var index in array) {
      casts = casts + array[index].name + '/'
    }
    return casts.substring(0, casts.length - 2)
  }

  function convertTocatsInfo(array) {
    var castsInfo = []
    for (var index in array) {
      var info = {
        img: array[index].avatars ? array[index].avatars.large : '',
        name: array[index].name
      }
    castsInfo.push(info)
    }
    return castsInfo
  }

  function showLoading(){
    wx.showLoading({
      title: '正在加载'
    })
  }
 
// 暴露给外部调用
module.exports = {
  getStars: getStars,
  httpRequest: httpRequest,
  convertToCastsString: convertToCastsString,
  convertTocatsInfo: convertTocatsInfo,
  showLoading:showLoading
}