// pages/short-video/index.ts
const app = getApp()
// import "./extend-page";
const urls = [
  'http://175.102.133.138/short-video/ces.mp4',
  'http://175.102.133.138/short-video/ces2.mp4',
  'http://175.102.133.138/short-video/ces3.mp4',
  'http://175.102.133.138/short-video/ces4.mp4',
  'http://175.102.133.138/short-video/ces5.mp4',
  'http://175.102.133.138/short-video/ces6.mp4',
]

const videoList = urls.map((url, index) => ({ id: index + 1, url }));
var timer: any;//连击计时器
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageHeight: app.globalData.pageHeight,
    windowWidth: app.globalData.windowWidth,
    videoCtx: null as any,

    videoList,
    current_index: 0,

    handleState: {
      attention: false,
      like: false,
      likeNum: "17万",
      star: true,
      starNum: "17.4万"
    },
    handleTapCount: 0,
    handleTapStartTime: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // this.setWatcher(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  videoTap() {
    this.data.playStates ? this.data.videoCtx.pause() : this.data.videoCtx.play();
    this.setData({
      playStates: !this.data.playStates
    })
  },
  onError() { },

  swiperChange() {

  },

  // 视频点赞、评论、收藏、转发
  handlerDoubleHit() {
    let handleTapStartTime = this.data.handleTapStartTime;
    let handleTapCount = this.data.handleTapCount;
    const currenTime = new Date().getTime();
    handleTapCount = currenTime - handleTapStartTime < 300 ? handleTapCount + 1 : 1;
    this.setData({
      handleTapStartTime: currenTime,
      handleTapCount
    })
  },
  tapLike(event) {
    this.handlerDoubleHit();
    if (this.data.handleTapCount > 2) {
      this.setData({ "handleState.like": false });
      wx.nextTick(() => { this.setData({ "handleState.like": true }) })
    } else {
      this.setData({
        "handleState.like": event.detail
      })
    };
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log("发送请求");
      this.setData({
        handleTapCount: 0,
        handleTapStartTime: 0
      })
    }, 310);
  },
  tapChat(event) {
    console.log(event);

  },
  tapStar(event) {
    this.handlerDoubleHit();
    if (this.data.handleTapCount > 2) {
      this.setData({ "handleState.star": false });
      wx.nextTick(() => { this.setData({ "handleState.star": true }) })
    } else {
      this.setData({
        "handleState.star": event.detail
      })
    };
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log("发送请求");
      this.setData({
        handleTapCount: 0,
        handleTapStartTime: 0
      })
    }, 310);

  },
  tapShare(event) {
    console.log(event);

  },
  tapAttention() {
    this.setData({
      "handleState.attention": true
    })
  }
})
export { }