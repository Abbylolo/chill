<template>
  <div class="bac">
    <header>
      <img class="avatar" :src="userInfo.avatarUrl" alt="图片加载失败" />
      <div>
        <p style="margin: 0;">{{ userInfo.userName }}</p>
        <p style="font-size: 12px;margin: 4px;">{{ userInfo.brief }}</p>
      </div>
      <el-button type="info" round @click="showPost = true"
        ><i class="el-icon-plus el-icon--left"></i>发布帖子</el-button
      >
      <!-- 发布帖子弹窗 -->
      <el-dialog
        title="发布摄影贴"
        :visible.sync="showPost"
        width="70%"
        :destroy-on-close="true"
        :close-on-click-modal="false"
      >
        <publish-post ref="publishPost"></publish-post>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="post()">发 布</el-button>
        </span>
      </el-dialog>
    </header>
    <main>
      <el-card v-for="item in postList" :key="item.postId">
        <div class="card_left">
          <div style="font-size: 22px;font-weight: bold; margin: 18px 0;">
            {{ item.createTime.split("日")[0] + "日" }}
          </div>
          <div style="font-size: 14px;height: 50px; margin-bottom: 15px;">
            {{ item.brief }}
          </div>
          <div style="font-size: 12px; margin-bottom: 5px;">
            <div>
              <img
                src="@/assets/images/icons/camera.svg"
                alt="图片加载失败"
                style="height: 14px;"
              />
              <span>{{ item.cameraInfo }}</span>
            </div>
            <div>
              <img
                src="@/assets/images/icons/parameter.svg"
                alt="图片加载失败"
                style="height: 14px;"
              />
              <span>{{ item.parameter }}</span>
            </div>
          </div>
          <div>
            <span class="likes" style="margin-right:10px; cursor: pointer;">
              <img
                v-if="item.liked"
                src="@/assets/images/icons/liked.svg"
                @click="
                  $common.like(item.postId, false, postList, userInfo.userId)
                "
              />
              <img
                v-else
                src="@/assets/images/icons/like.svg"
                @click="
                  $common.like(item.postId, true, postList, userInfo.userId)
                "
              />
              <span>{{ item.liker == null ? 0 : item.liker.length }}</span>
            </span>
            <span
              style="margin-right:10px; cursor: pointer;"
              @click="edit(item.postId)"
            >
              <i class="el-icon-edit-outline el-icon--left"></i>编辑
            </span>
            <span style="cursor: pointer;" @click="deletePost(item.postId)">
              <i class="el-icon-delete el-icon--left"></i>删除
            </span>
          </div>
        </div>
        <div class="card_right">
          <el-button
            @click="move(item.postId, 'right')"
            icon="el-icon-arrow-left"
            circle
            class="translate_button"
          ></el-button>
          <div class="work_list">
            <img
              v-for="(item2, index) in item.imgUrls"
              :key="index"
              :src="item2"
              alt="图片加载失败"
              :style="{
                transform: 'translateX(' + item.translateX + 'px)',
                transition: 'all .2s linear'
              }"
            />
          </div>
          <el-button
            @click="move(item.postId, 'left')"
            icon="el-icon-arrow-right"
            circle
            class="translate_button"
          ></el-button>
        </div>
      </el-card>
    </main>
    <footer>-THE END-</footer>
    <!-- 编辑帖子弹窗 -->
    <el-dialog
      title="编辑摄影贴"
      :visible.sync="showEditPost"
      width="70%"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      @opened="editPostInit(currentPostId)"
    >
      <publish-post ref="editPost"></publish-post>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editPost(currentPostId)"
          >保 存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PublishPost from "../components/PublishPost.vue";
export default {
  name: "User",
  components: { PublishPost },
  data() {
    return {
      showEditPost: false, // 编辑帖子弹窗控制
      currentPostId: "",
      showPost: false, // 发布帖子弹窗控制
      translateXNum: 200,
      userInfo: {
        avatarUrl: "",
        userName: "",
        brief: "",
        userId: 0
      },
      postList: [
        {
          postId: "",
          createTime: "",
          brief: "",
          liker: "",
          imgUrls: [""],
          translateX: 0
        }
      ]
    };
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      // this.userInfo = this.$store.state.user;
      this.userInfo = {
        avatarUrl: window.sessionStorage.getItem("avatarUrl"),
        userName: window.sessionStorage.getItem("username"),
        brief: window.sessionStorage.getItem("brief"),
        userId: Number(window.sessionStorage.getItem("userId"))
      };
      if (!this.userInfo.avatarUrl) {
        this.userInfo.avatarUrl =
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      }
    },
    // 点击发布帖子
    post() {
      this.showPost = false;
      const post = this.$refs.publishPost.post;
      console.log("post", post);
      // backend - 个人发布帖子（post，userid）=> 帖子详细信息
      const params = { ...post, userId: this.userInfo.userId };
      this.$api.addPost(params).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.getUserWorks();
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    // 获取用户作品集
    getUserWorks() {
      // backend 获取用户作品集（userid) => 作品id，创建时间，作品简介,图片地址s
      this.$api.getUserPostList({ userId: this.userInfo.userId }).then(res => {
        if (res.data.code == 200) {
          this.postList = res.data.data;
          this.postList.forEach(item => {
            item.translateX = 0;
          });
        } else {
          this.$message({
            message: "查询用户作品集失败",
            type: "error"
          });
        }
      });
    },
    // 删除帖子
    deletePost(postId) {
      this.$confirm("此操作将永久删除该帖子, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // backend - 删除帖子（id）=> 删除状态
          this.$api.deletePost({ postId: postId }).then(res => {
            if (res.data.code == 200) {
              this.$message("删除成功");
              this.getUserWorks();
            } else {
              this.$message({
                type: "error",
                message: "删除失败"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 点击编辑按钮
    edit(postId) {
      this.showEditPost = true;
      this.currentPostId = postId;
    },
    // 编辑帖子弹窗信息初始化
    editPostInit(postId) {
      // backend - 获取摄影贴详情（postId）=》帖子详情
      this.$api.getPostDetail({ postId }).then(res => {
        if (res.data.code == 200) {
          const postDetail = res.data.data;
          postDetail.imgUrlList = [];
          postDetail.imgUrls.forEach(item => {
            postDetail.imgUrlList.push({ url: item });
          });
          this.$refs.editPost.post = postDetail;
        }
      });
    },
    // 编辑帖子
    editPost(postId) {
      this.showEditPost = false;
      const post = this.$refs.editPost.post;
      console.log("post", post);
      // backend - 编辑帖子（post，postId）=> 状态
      this.$api
        .editPost({
          postId,
          brief: post.brief,
          cameraInfo: post.cameraInfo,
          imgUrls: post.imgUrls,
          parameter: post.parameter,
          tags: post.tags
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
            this.getUserWorks();
          }
        });
    },
    move(postId, direction) {
      let flag = -1;
      if (direction == "right") {
        flag = 1;
      }
      let idx = 0;
      this.postList.forEach(item => {
        if (item.postId === postId) {
          if (item.translateX == 0 && flag == 1) {
            return;
          } else {
            this.$set(this.postList, idx, {
              ...item,
              translateX: item.translateX + this.translateXNum * flag
            });
          }
          return;
        }
        idx++;
      });
    }
  },
  mounted() {
    this.getUserInfo();
    this.getUserWorks();
  }
};
</script>

<style lang="less" scoped>
.bac {
  width: 100%;
  min-height: 92.8vh;
  background-color: #f7f6cac2;
  padding-top: 60px;
  // position: fixed;
}

header,
main {
  margin: 20px;
}

header {
  height: 160px;
}

.avatar {
  height: 120px;
  width: 120px;
  border-radius: 100px;
  margin-right: 20px;
}

/deep/ .el-button--info.is-round {
  color: #fff;
  background: #2c2c2c;
  border: none;
}

/deep/ .el-button--info.is-round:focus,
.el-button--info.is-round:hover {
  background: #222;
  color: #fff;
}

header > button {
  position: absolute;
  right: 80px;
  top: 143px;
}

/deep/.el-card__body {
  height: 200px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
}

/deep/.el-card {
  margin-bottom: 30px;
}

.card_left {
  margin: 0 30px;
  text-align: left;
  height: 100%;
  width: 25%;
}

.card_right {
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 25%;
}

/deep/.el-button:active {
  color: #e6a23c;
  border-color: #f5cf96;
  outline: 0;
}
/deep/.el-button:focus,
.el-button:hover {
  color: #e6a23c;
  border-color: #f5cf96;
  background-color: #e6a23c2b;
}

.work_list {
  height: 100%;
  width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}

.work_list img {
  height: 160px;
  margin: 0 10px;
}

.translate_button {
  z-index: 10;
  margin: 10px;
}

.likes {
  right: 12px;
  top: 12px;
  height: 20px;
}

.likes img {
  width: 16px;
  height: 16px;
  margin-bottom: -2px;
}

// 发布摄影贴弹出框样式
/deep/ .el-dialog__header {
  padding: 20px 20px 10px;
  text-align: left;
  border-bottom: 1px solid #bbbbbbab;
}

/deep/ .el-dialog {
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
</style>
