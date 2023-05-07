<template>
  <div class="bac">
    <header>
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
        v-if="circleInfo.state == 2"
        @click="circleUpdate()"
        ><i class="el-icon-setting el-icon--left"></i>设置</el-button
      >
      <el-button
        type="warning"
        plain
        v-if="circleInfo.state == 1"
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
        v-if="circleInfo.state == 1"
        @click="cancelJoinCircle(circleInfo)"
        ><i class="el-icon-check el-icon--left"></i>已加入</el-button
      >
      <el-button
        type="warning"
        plain
        v-if="circleInfo.state == 0"
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
          <div style="font-size: 14px;height: 75px; margin-bottom: 15px;">
            {{ item.brief }}
          </div>
          <div>
            <span class="likes" style="margin-right:10px; cursor: pointer;">
              <img
                v-if="item.liked"
                src="@/assets/images/icons/liked.svg"
                @click="$common.like(item.postId, false, postList)"
              />
              <img
                v-else
                src="@/assets/images/icons/like.svg"
                @click="$common.like(item.postId, true, postList)"
              />
              <span>{{ item.likes }}</span>
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
      showPost: false,
      state: "",
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
    // 获取该摄影圈帖子列表
    getpostList() {
      // backend - 获取摄影圈帖子列表（摄影圈id）=》圈内帖子列表（id,用户名，用户头像，帖子简介，点赞数，评论，图片路径）
      this.postList = [
        {
          postId: "0",
          userName: "Abbylolo",
          avatarUrl:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          brief:
            "简单介绍介绍介简单介绍介绍介简单介绍介绍介简单介绍介绍介简单介绍介绍介绍",
          liked: true,
          likes: 30,
          comments: [
            { userName: "xxx", avatarUrl: "xxx", content: "xxxx", time: "xxx" }
          ],
          imgUrls: [
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
          ]
        },
        {
          postId: "1",
          userName: "Syhn",
          avatarUrl:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          brief: "简单介绍介绍介简单介绍绍",
          liked: true,
          likes: 30,
          comments: ["aaa", "bbb"],
          imgUrls: [
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
          ]
        },
        {
          postId: "2",
          userName: "Lihua",
          avatarUrl:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          brief:
            "简单介绍介绍介简单介绍介绍介简单介绍介绍介简单介绍介绍介简单介绍介绍介绍",
          liked: false,
          likes: 30,
          comments: ["aaa", "bbb"],
          imgUrls: [
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
          ]
        }
      ];
      this.postList.forEach(item => {
        item.translateX = 0;
      });
    },
    // 设置摄影圈信息
    circleUpdate() {
      const h = this.$createElement;
      const formInit = {
        name: this.circleInfo.name,
        brief: this.circleInfo.brief,
        avatarUrl: this.circleInfo.avatarUrl
      };
      this.$msgbox({
        title: "设置摄影圈",
        message: h("create-circle", {
          ref: "createCircle"
        }),
        showCancelButton: true,
        confirmButtonText: "创建",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          const form = this.$refs.createCircle.form || {};
          console.log("form:", form);
          if (action === "confirm") {
            if (form.name == "" || form.brief == "") {
              this.$message({
                message: "请输入摄影圈名称及简介",
                type: "warning"
              });
              done();
            } else {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "执行中...";
              setTimeout(() => {
                // 设置摄影圈信息
                // backend - circleUpdate设置摄影圈（form）=> 摄影圈信息（摄影圈id，摄影圈头像，摄影圈名字，摄影圈粉丝数，摄影圈简介,状态）
                this.$message({
                  message: "设置摄影圈成功",
                  type: "success"
                });
                // 如果设置成功更新摄影圈信息
                // this.circleInfo = res.data;
                done();
                instance.confirmButtonLoading = false;
              }, 3000);
            }
          } else {
            done();
          }
        }
      }).then(action => {
        this.$refs.createCircle.form = { name: "", brief: "", avatarUrl: "" };
      });
    },
    // 加入摄影圈
    joinCircle(circleInfo) {
      const statusCode = this.$common.joinCircle(circleInfo);
      if (statusCode === 200) {
        // 更新加入状态
        this.$set(this.circleInfo, "state", 1);
        // this.circleInfo = { ...this.circleInfo, state: 1 };
      }
    },
    // 取消加入摄影圈
    cancelJoinCircle(circleInfo) {
      // backend - 取消加入摄影圈cancelJoinCircle(userid,circleId) => 状态
      const statusCode = 200;
      if (statusCode === 200) {
        // 更新加入状态
        this.$set(this.circleInfo, "state", 0);
        this.$message({
          message: `取消加入摄影圈${circleInfo.name}`,
          type: "success"
        });
      }
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
      this.dialogVisible = false;
      const post = this.$refs.publishPost.post;
      console.log("post", post);
      // backend - 摄影圈中发布帖子（post,userId,circleId）=> 状态
      this.getpostList();
    }
  },
  mounted() {
    this.circleInfo = this.$route.params.circleInfo || {
      circleId: "",
      avatarUrl: "",
      name: "",
      fansNum: 0,
      brief: ""
    };
    this.state = this.$route.params.state || "";
    this.getpostList();
  }
};
</script>

<style lang="less" scoped>
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
