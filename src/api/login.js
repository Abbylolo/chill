import request from "./request";

/* 登录注册模块接口 */
const login = {
  // 登录
  login(data) {
    return request({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/user/login",
      method: "post",
      data
    });
  },
  // 注册
  register(data) {
    return request({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/user/register",
      method: "post",
      data
    });
  }
};

export default login;
