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
      <el-button type="warning" plain
        ><i class="el-icon-plus el-icon--left"></i>加入</el-button
      >
    </header>
    <main>
      <el-card v-for="item in postList" :key="item.id">
        <div class="card_left">
          <div class="user_info">
            <img
              class="avatar_user"
              :src="item.userAvatar"
              alt="图片加载失败"
            />
            <span> {{ item.userName }}</span>
          </div>
          <div style="font-size: 14px;height: 75px; margin-bottom: 15px;">
            {{ item.postBrief }}
          </div>
          <div>
            <span style="margin-right:10px; cursor: pointer;">
              <i class="el-icon-edit-outline el-icon--left"></i>{{ item.likes }}
            </span>
            <span style="cursor: pointer;">
              <i class="el-icon-chat-dot-square el-icon--left"></i
              >{{ item.comments.length }}
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
  name: "PhotoCircleDetail",
  data() {
    return {
      circleInfo: {
        circleId: "",
        avatarUrl: "",
        name: "",
        fansNum: 0,
        brief: ""
      },
      postList: [
        {
          id: "",
          userName: "",
          userAvatar: "",
          postBrief: "",
          translateX: 0,
          likes: 0,
          comments: [],
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
          id: "0",
          userName: "Abbylolo",
          userAvatar:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          postBrief:
            "简单介绍介绍介简单介绍介绍介简单介绍介绍介简单介绍介绍介简单介绍介绍介绍",
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
        },
        {
          id: "1",
          userName: "Syhn",
          userAvatar:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          postBrief: "简单介绍介绍介简单介绍绍",
          likes: 30,
          comments: ["aaa", "bbb"],
          imgUrls: [
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
          ]
        },
        {
          id: "2",
          userName: "Lihua",
          userAvatar:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          postBrief:
            "简单介绍介绍介简单介绍介绍介简单介绍介绍介简单介绍介绍介简单介绍介绍介绍",
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
    }
  },
  mounted() {
    this.circleInfo = this.$route.params.circleInfo;
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
