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
  }
};

export default circle;
