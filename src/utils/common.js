import Vue from "vue";
// 公共方法
const common = {
  // 删除对象数组的某一项
  arrRemoveJson(arr, attr, value) {
    if (!arr || arr.lenth == 0) {
      return "";
    }
    const newArr = arr.filter(item => {
      return item[attr] !== value;
    });
    return newArr;
  },

  // 用户加入摄影圈
  joinCircle(circle) {
    const circleId = circle.circleId;
    // backend - joinCircle用户加入摄影圈（circleId,userid) => 状态
    // console.log("circleId", circleId);
    const statusCode = 200;
    if (statusCode === 200) {
      Vue.prototype.$message({
        message: `成功加入摄影圈${circle.name}`,
        type: "success"
      });
    }
    return statusCode;
  },

  // 点赞帖子/取消点赞
  like(postId, flag, postList) {
    // backend 更新帖子点赞状态(userid,postId,1)

    // 更新成功执行下文
    postList.forEach(item => {
      if (item.postId === postId) {
        if (flag) {
          item.likes++;
          item.liked = true;
        } else {
          item.likes--;
          item.liked = false;
        }
        return;
      }
    });
    return postList;
  }
};

Vue.prototype.$common = common;
export default common;
