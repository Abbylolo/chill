<template>
  <div class="bac">
    <header>
      <img
        src="@/assets/images/icons/goback.svg"
        class="go_back"
        @click="$router.push({ name: 'PhotoCircle' })"
      />
      <img class="avatar" :src="circleInfo.avatarUrl" alt="图片加载失败" />
      <div class="circle_info">
        <div>
          <span class="circle_name">{{ circleInfo.name }}</span>
          <span style="font-size: 15px;">{{ circleInfo.fansNum }}圈友</span>
        </div>
        <div class="circle_brief">简介：{{ circleInfo.brief }}</div>
      </div>
      <el-button
        type="warning"
        plain
        v-if="circleInfo.state == 1 || circleInfo.state == 2"
        @click="showPost = true"
        ><i class="el-icon-plus el-icon--left"></i>发布帖子</el-button
      >
      <!-- 发布帖子弹窗 -->
      <el-dialog
        title="发布摄影贴"
        :visible.sync="showPost"
        width="70%"
        :destroy-on-close="true"
      >
        <publish-post ref="publishPost"></publish-post>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="post()">发 布</el-button>
        </span>
      </el-dialog>
      <el-button
        type="warning"
        plain
        v-if="circleInfo.state == 2"
        @click="showUpdateCircle()"
        style="margin-left: 10px;"
        ><i class="el-icon-setting el-icon--left"></i>设置</el-button
      >
      <el-button
        type="warning"
        plain
        v-if="circleInfo.state == 2"
        style="margin-right: 10px;"
        @click="deleteCircle()"
        ><i class="el-icon-delete el-icon--left"></i>删除</el-button
      >
      <!-- 设置摄影圈弹窗 -->
      <el-dialog
        title="设置摄影圈"
        :visible.sync="showCircleDetail"
        width="40%"
        :destroy-on-close="true"
      >
        <create-circle
          ref="circleDetail"
          :formInit="circleInfo"
        ></create-circle>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateCircle()">保 存</el-button>
        </span>
      </el-dialog>

      <el-button
        type="warning"
        plain
        v-if="circleInfo.state == 1"
        @click="cancelJoinCircle(circleInfo)"
        ><i class="el-icon-check el-icon--left"></i>已加入</el-button
      >
      <el-button
        type="warning"
        plain
        v-if="circleInfo.state == 0"
        v-show="userId"
        @click="joinCircle(circleInfo)"
        ><i class="el-icon-plus el-icon--left"></i>加入</el-button
      >
    </header>
    <main>
      <el-card v-for="item in postList" :key="item.postId">
        <div class="card_left">
          <div class="user_info">
            <img class="avatar_user" :src="item.avatarUrl" alt="图片加载失败" />
            <span> {{ item.userName }}</span>
          </div>
          <div style="font-size: 14px;height: 35px; margin-bottom: 15px;">
            {{ item.brief }}
          </div>
          <div style="font-size: 12px;">
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
                v-if="!userId"
                src="@/assets/images/icons/liked.svg"
                style="cursor:default;"
              />
              <img
                v-else-if="item.liked"
                src="@/assets/images/icons/liked.svg"
                @click="$common.like(item.postId, false, postList, userId)"
              />
              <img
                v-else
                src="@/assets/images/icons/like.svg"
                @click="$common.like(item.postId, true, postList, userId)"
              />
              <span>{{ item.liker == null ? 0 : item.liker.length }}</span>
            </span>
            <!-- <span style="cursor: pointer;">
              <i class="el-icon-chat-dot-square el-icon--left"></i
              >{{ item.comments.length }}
            </span> -->
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
  </div>
</template>

<script>
import CreateCircle from "@/components/CreateCircle.vue";
import PublishPost from "../components/PublishPost.vue";
export default {
  name: "PhotoCircleDetail",
  components: { CreateCircle, PublishPost },
  data() {
    return {
      userId: 0,
      circleId: 7,
      showPost: false,
      showCircleDetail: false,
      circleInfo: {
        circleId: "",
        avatarUrl: "",
        name: "",
        fansNum: 0,
        brief: ""
      },
      postList: [
        {
          postId: "",
          userName: "",
          avatarUrl: "",
          brief: "",
          translateX: 0,
          likes: 0,
          // comments: [],
          imgUrls: []
        }
      ],
      translateXNum: 200
    };
  },
  methods: {
    // 返回摄影圈主页
    goBack() {},
    // 删除摄影圈
    deleteCircle() {
      this.$confirm("确认解散摄影圈吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$api.deleteCircle({ circleId: this.circleId }).then(res => {
          if (res.data.code == 200) {
            this.$message(`${this.circleInfo.name}摄影圈解散`);
            // 跳转回摄影圈页面
            this.$router.push({
              name: "PhotoCircle"
            });
          } else {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        });
      });
    },
    // 获取摄影圈详情
    getCircleDetail() {
      this.$api.getAllCircleList({ userId: this.userId }).then(res => {
        if (res.data.code == 200) {
          this.allCircleList = res.data.allCircleList;
          this.allCircleList.forEach(item => {
            if (item.circleId == this.circleId) {
              this.circleInfo = item;
              return;
            }
          });
          this.getpostList();
        }
      });
    },
    // 获取该摄影圈帖子列表
    getpostList() {
      // backend - 获取摄影圈帖子列表（摄影圈id）=》圈内帖子列表（id,用户名，用户头像，帖子简介，点赞数，评论，图片路径）
      this.$api
        .getCirclePostList({
          circleId: this.circleInfo.circleId,
          userId: this.userId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.postList = res.data.data;
          }
          this.postList.forEach(item => {
            item.translateX = 0;
          });
        });
    },
    showUpdateCircle() {
      this.showCircleDetail = true;
    },
    // 设置摄影圈信息
    updateCircle() {
      const form = this.$refs.circleDetail.form || {};
      if (form.name == "" || form.brief == "") {
        this.$message({
          message: "请输入摄影圈名称及简介",
          type: "warning"
        });
      } else {
        // 设置摄影圈信息
        // backend - updateCircle设置摄影圈（form）=> 摄影圈信息（摄影圈id，摄影圈头像，摄影圈名字，摄影圈圈友数，摄影圈简介,状态）
        this.$api
          .updateCircle({
            ...form,
            circleId: this.circleInfo.circleId
          })
          .then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "设置摄影圈成功",
                type: "success"
              });
            }
          });
        // 如果设置成功更新摄影圈信息
        this.getCircleDetail();
        this.showCircleDetail = false;
      }
    },
    // 加入摄影圈
    async joinCircle(circleInfo) {
      let { circleId, fans, name } = circleInfo;
      if (fans == null) {
        fans = [];
      }
      fans.push(this.userId.toString());
      this.$api.changeCircleFans({ circleId, fans }).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: `成功加入摄影圈"${name}"`,
            type: "success"
          });
        }
        // 更新加入状态
        this.$set(this.circleInfo, "state", 1);
        // this.circleInfo = { ...this.circleInfo, state: 1 };
        // this.getAllCircleList();
      });
    },
    // 取消加入摄影圈
    cancelJoinCircle(circleInfo) {
      this.$confirm(`确认退出"${circleInfo.name}"摄影圈吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let { circleId, fans, name } = circleInfo;
        if (fans == null) {
          fans = [];
        }
        fans = fans.filter(item => item != this.userId.toString());
        // backend - 取消加入摄影圈cancelJoinCircle(circleId,fans) => 状态
        this.$api.changeCircleFans({ circleId, fans }).then(res => {
          if (res.data.code == 200) {
            this.$set(this.circleInfo, "fans", fans);
            this.$set(this.circleInfo, "state", 0);
            this.$message(`取消加入摄影圈${name}`);
            // this.getAllCircleList();
          }
        });
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
    },
    // 点击发布帖子
    post() {
      this.showPost = false;
      const post = this.$refs.publishPost.post;
      // backend - 摄影圈中发布帖子（...post,userId,circleId）=> 状态
      this.$api
        .addPost({
          ...post,
          userId: this.userId,
          circleId: this.circleInfo.circleId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.getpostList();
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        });
    }
  },
  mounted() {
    // this.userId = this.$store.state.userId;
    this.userId = Number(window.sessionStorage.getItem("userId"));
    this.circleId = this.$route.params.circleId || 0;
    this.getCircleDetail();
  }
};
</script>

<style lang="less" scoped>
.go_back {
  height: 25px;
  cursor: pointer;
  margin-top: -125px;
  margin-left: 5px;
}

.bac {
  width: 100%;
  min-height: 92.8vh;
  padding-top: 60px;
  background-color: #eee;
}

header {
  height: 160px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #f7f6ca;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

main {
  margin: 20px;
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

.avatar {
  height: 110px;
  width: 110px;
  border-radius: 7px;
  margin: 0 20px;
}

.avatar_user {
  height: 50px;
  width: 50px;
  border-radius: 100px;
  margin-right: 20px;
}

.circle_info {
  width: 70%;
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}

.circle_name {
  font-size: 20px;
  font-weight: bold;
  margin-right: 20px;
}

.circle_brief {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.card_left {
  margin: 0 30px;
  text-align: left;
  height: 100%;
  width: 25%;
}

.user_info {
  font-size: 22px;
  font-weight: bold;
  margin: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
