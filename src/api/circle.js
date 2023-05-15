import request from "./request";

/* 摄影圈模块接口 */
const circle = {
  // 获取摄影圈列表
  getAllCircleList(data) {
    return request({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/circle/getAllCircleList",
      method: "post",
      data
    });
  },
  // 创建摄影圈
  createCircle(data) {
    return request({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/circle/createCircle",
      method: "post",
      data
    });
  },
  // 设置摄影圈
  updateCircle(data) {
    return request({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/circle/updateCircle",
      method: "post",
      data
    });
  },
  // 获取摄影圈详情
  getCircleDetail(data) {
    return request({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/circle/getCircleDetail",
      method: "post",
      data
    });
  },
  // 加入摄影圈
  changeCircleFans(data) {
    return request({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/circle/changeCircleFans",
      method: "post",
      data
    });
  },
  // 获取摄影圈摄影贴列表
  getCirclePostList(data) {
    return request({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/circle/getCirclePostList",
      method: "post",
      data
    });
  },
  // 删除摄影圈
  deleteCircle(data) {
    return request({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/circle/deleteCircle",
      method: "post",
      data
    });
  }
};

export default circle;
