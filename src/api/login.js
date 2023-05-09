import request from "./request";
// 登录模块接口
const login = {
  login(data) {
    return request({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/sys/login",
      method: "post",
      data
    });
  },
  register(data) {
    return request({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/sys/register",
      method: "post",
      data
    });
  }
};

export default login;
