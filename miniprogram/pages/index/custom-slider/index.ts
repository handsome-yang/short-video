// pages/short-video/custom-slider/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    videoDuration: {
      value: 1,
      type: Number
    },
    videoCuttentTime: {
      value: 1,
      type: Number
    },
    // videoBolCur:{
    //   type:Boolean,
    //   value:true
    // },//播放状态
  },

  /**
   * 组件的初始数据
   */
  data: {
    processBar: {
      activeColor: "rgba(255,255,255,0.5)",
      inactiveColor: "rgba(255,255,255,0.3)",
      barHeight: "5px",
      slidingBlock: "10px",
    },
    processBarPercent: 0,
    isSpeed: false,
    videoTimeTips: {
      current: "",
      end: ""
    },
    startProcessBarPercent: 0,//拖拽开始时的进度条位置
    processClientX: {//进度条滑动距离
      start: 0,
      end: 0,
      dis: null as any
    },
  },
  observers: {
    'isSpeed': function (nv, ov) {
      let processBar = this.data.processBar
      if (nv) {
        processBar = {
          activeColor: "rgba(255,255,255,1.0)",
          inactiveColor: "rgba(0,0,0,0.7)",
          barHeight: "15px",
          slidingBlock: "25px"
        };
        
        this.setData({
          processBar,
          videoTimeTips: {
            current: this.getVideoTime(this.data.videoCuttentTime),
            end: this.getVideoTime(this.data.videoDuration)
          }
        })
      } else {
        processBar = {
          activeColor: "rgba(255,255,255,0.5)",
          inactiveColor: "rgba(255,255,255,0.3)",
          barHeight: "5px",
          slidingBlock: "10px"
        }
        this.setData({
          processBar
        });
      }
    },
    'videoCuttentTime': function (nv, ov) {
      this.setData({
        processBarPercent: Math.floor((nv / this.data.videoDuration) * 100)
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchmoveprocess(event) {
      if (!this.data.isSpeed) {
        this.setData({
          isSpeed: true
        })
      };
      const { clientX } = event.changedTouches[0];
      this.setData({ 'processClientX.end': clientX });
      // 滑动距离
      const moveDis = this.data.processClientX.end - this.data.processClientX.start;
      const step = Math.floor(moveDis / (this.data.windowWidth - 30) * 100);

      const _processBarPercent = this.data.startProcessBarPercent + step > 0 ? this.data.startProcessBarPercent + step : 0;
      const timeTipsCurrent = this.getVideoTime(this.data.processBarPercent / 100 * this.data.videoDuration);
      this.setData({ processBarPercent: _processBarPercent, "videoTimeTips.current": timeTipsCurrent });
    },
    touchStartProcess(event) {
      const { clientX } = event.changedTouches[0];
      this.setData({ 'processClientX.start': clientX, startProcessBarPercent: this.data.processBarPercent })
    },
    touchEndProcess(event) {
      this.setData({
        isSpeed: false
      });
      const posTime = this.data.videoDuration * (this.data.processBarPercent / 100);
      this.triggerEvent("seekAndPlay", posTime);
    },

    onDragStart() {
      if (!this.data.isSpeed) {
        this.setData({
          isSpeed: true
        })
      }
    },
    onDrag(event) {
      const current: any = this.getVideoTime(event.detail.value / 100 * this.data.videoDuration);
      this.setData({
        videoTimeTips: {
          current: current,
          end: this.getVideoTime(this.data.videoDuration)
        }
      })
    },
    dragValChange(event) {
      this.setData({
        processBarPercent: event.detail
      });
      const posTime = this.data.videoDuration * (event.detail / 100)
      this.triggerEvent("seekAndPlay", posTime)
    },
    // 工具函数
    getVideoTime(totalSeconds) {
      // ?️ 获取完整分钟数
      const minutes = Math.floor(totalSeconds / 60);

      // ?️ 获得剩余的秒数
      const seconds = Math.floor(totalSeconds % 60);

      function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
      return result
    }
  }
})
