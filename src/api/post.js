import request from "./request";

/* 摄影贴模块接口 */
const post = {
  // 根据关键词搜索摄影贴
  getPostListByKeyword(data) {
    return request({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/post/getPostListByKeyword",
      method: "post",
      data
    });
  },
  // 获取用户摄影贴列表
  getUserPostList(data) {
    return request({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/post/getUserPostList",
      method: "post",
      data
    });
  },
  // 发布摄影贴
  addPost(data) {
    return request({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/post/add",
      method: "post",
      data
    });
  },
  // 删除摄影贴
  deletePost(data) {
    return request({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/post/deletePost",
      method: "post",
      data
    });
  },
  // 点赞摄影贴
  likePost(data) {
    return request({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/post/likePost",
      method: "post",
      data
    });
  },
  // 获取摄影贴详情
  getPostDetail(data) {
    return request({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/post/getPostDetail",
      method: "post",
      data
    });
  },
  // 编辑摄影贴
  editPost(data) {
    return request({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/post/editPost",
      method: "post",
      data
    });
  }
};

export default post;
