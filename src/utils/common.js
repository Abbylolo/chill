import Vue from "vue";
import api from "../api";

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
  // 删除数组指定值元素
  arrRemoveValue(arr, item) {
    for (var i = arr.length - 1; i >= 0; i--) {
      if (arr[i] == item) {
        arr.splice(i, 1);
      }
    }
    return arr;
  },

  // 点赞帖子/取消点赞
  like(postId, flag, postList, userId) {
    // backend 更新帖子点赞状态(userid,postId,true)
    api.likePost({ userId, postId, flag }).then(res => {
      if (res.data.code == 200) {
        // 更新成功执行下文
        postList.forEach(item => {
          if (item.postId === postId) {
            if (flag) {
              item.liker.push(userId);
              item.liked = true;
            } else {
              let arr = item.liker;
              for (var i = arr.length - 1; i >= 0; i--) {
                if (arr[i] == userId) {
                  arr.splice(i, 1);
                }
              }
              item.liker = arr;
              item.liked = false;
            }
            return;
          }
        });
      }
    });
    return postList;
  }
};

Vue.prototype.$common = common;
export default common;
