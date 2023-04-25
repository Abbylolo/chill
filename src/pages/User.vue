<template>
  <div class="bac">
    <header>
      <img class="avatar" :src="userInfo.avatar" alt="图片加载失败" />
      <div>
        <p style="margin: 0;">{{ userInfo.name }}</p>
        <p style="font-size: 12px;margin: 4px;">{{ userInfo.brief }}</p>
      </div>
      <el-button type="info" round @click="post()"
        ><i class="el-icon-plus el-icon--left"></i>发布帖子</el-button
      >
    </header>
    <main>
      <el-card v-for="item in postList" :key="item.id">
        <div class="card_left">
          <div style="font-size: 22px;font-weight: bold; margin: 18px 0;">
            {{ item.createTime }}
          </div>
          <div style="font-size: 14px;height: 75px; margin-bottom: 15px;">
            {{ item.postBrief }}
          </div>
          <div>
            <span style="margin-right:10px; cursor: pointer;">
              <i class="el-icon-edit-outline el-icon--left"></i>编辑
            </span>
            <span style="cursor: pointer;">
              <i class="el-icon-delete el-icon--left"></i>删除
            </span>
          </div>
        </div>
        <div class="card_right">
          <el-button
            @click="move(item.id, 'right')"
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
            @click="move(item.id, 'left')"
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
export default {
  name: "User",
  data() {
    return {
      translateXNum: 200,
      userInfo: {
        avatar: "",
        name: "",
        brief: ""
      },
      postList: [
        {
          id: "",
          createTime: "",
          postBrief: "",
          imgUrls: [""],
          translateX: 0
        }
      ]
    };
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      // backend 获取用户信息（userid）=》用户头像、用户名、个人简介
      this.userInfo = {
        avatar:
          "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        name: "Abbylolo",
        brief: "阳光开朗大男孩"
      };
    },
    // 获取用户作品集
    getUserWorks() {
      // backend 获取用户作品集（userid) => 作品id，创建时间，作品简介,图片地址s
      this.postList = [
        {
          id: "0",
          createTime: "2023年4月12日",
          postBrief:
            "简单介绍介绍介简单介绍介绍介简单介绍介绍介简单介绍介绍介简单介绍介绍介绍",
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
          id: "1",
          createTime: "2023年4月12日",
          postBrief: "简单介绍介绍介简单介绍绍",
          imgUrls: [
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
          ]
        },
        {
          id: "2",
          createTime: "2023年4月12日",
          postBrief:
            "简单介绍介绍介简单介绍介绍介简单介绍介绍介简单介绍介绍介简单介绍介绍介绍",
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
    move(id, direction) {
      let flag = -1;
      if (direction == "right") {
        flag = 1;
      }
      let idx = 0;
      this.postList.forEach(item => {
        if (item.id === id) {
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
    // 发布帖子
    post() {}
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
</style>
