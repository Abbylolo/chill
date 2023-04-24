<template>
  <div class="main">
    <!-- 我加入的摄影圈 -->
    <div class="my_circle_wrap">
      <div class="title_bar">我加入的摄影圈</div>
      <div class="my_circle_detail">
        <div
          class="circle_group"
          v-for="item in myCircleList"
          :key="item.circleId"
        >
          <img :src="item.avatarUrl" alt="图片加载失败" />
          <p>{{ item.name }}</p>
        </div>
        <el-button type="info" round @click="openCreateCircleMsg()"
          ><i class="el-icon-plus el-icon--left"></i>创建</el-button
        >
      </div>
    </div>
    <!-- 发现摄影圈 -->
    <div class="find_circle_wrap">
      <div class="title_bar">发现摄影圈</div>
      <div class="circle_list">
        <div v-for="item in allCircleList" :key="item.circleId">
          <img :src="item.avatarUrl" alt="图片加载失败" />
          <div class="circle_info">
            <p
              style="font-size: 18px; "
              @click="
                $router.push({
                  name: 'PhotoCircleDetail',
                  params: { circleInfo: item }
                })
              "
            >
              {{ item.name }}
            </p>
            <p style="font-size: 12px; margin: 0;">{{ item.fansNum }}粉丝</p>
            <p>简介：{{ item.brief }}</p>
          </div>
          <el-button type="warning" plain
            ><i class="el-icon-plus el-icon--left"></i>加入</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateCircle from "@/components/CreateCircle.vue";
export default {
  name: "PhotoCircle",
  components: { CreateCircle },
  data() {
    return {
      circleId: 1,
      myCircleList: [
        {
          circleId: "",
          avatarUrl: "",
          name: ""
        }
      ], // 我加入的摄影圈
      allCircleList: [
        {
          circleId: "",
          avatarUrl: "",
          name: "",
          fansNum: 0,
          brief: ""
        }
      ]
    };
  },
  methods: {
    // 获取用户加入的摄影圈
    getMyCircleList() {
      // backend 获取用户加入的摄影圈(userId) => 摄影圈列表（摄影圈id，摄影圈头像，摄影圈名字）
      this.myCircleList = [
        {
          circleId: "1",
          avatarUrl:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          name: "汪星人保护队"
        },
        {
          circleId: "2",
          avatarUrl:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          name: "喵星人保护队"
        }
      ];
    },
    // 获取已存在的摄影圈列表
    getAllCircleList() {
      // backend 获取摄影圈列表() => 摄影圈列表（摄影圈id，摄影圈头像，摄影圈名字，摄影圈粉丝数，摄影圈简介）
      this.allCircleList = [
        {
          circleId: "1",
          avatarUrl:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          name: "汪星人保护队",
          fansNum: 2000,
          brief: "啦啦啦啦啦啦啦啦啦啦"
        },
        {
          circleId: "2",
          avatarUrl:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          name: "喵星人保护队",
          fansNum: 3000,
          brief:
            "咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦"
        },
        {
          circleId: "3",
          avatarUrl:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          name: "喵星人保护队",
          fansNum: 3000,
          brief:
            "咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦"
        }
      ];
    },

    // 打开创建摄影圈弹窗
    openCreateCircleMsg() {
      const h = this.$createElement;
      this.$msgbox({
        title: "创建摄影圈",
        message: h(CreateCircle),
        showCancelButton: true,
        confirmButtonText: "创建",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            console.log(this.$refs);
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: "info",
          message: "action: " + action
        });
      });
    }
  },
  mounted() {
    this.getMyCircleList();
    this.getAllCircleList();
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  min-height: 92.8vh;
  background-color: #f7f6cac2;
  padding-top: 60px;
}

.my_circle_wrap,
.find_circle_wrap {
  display: flex;
  margin: 30px 50px;
  flex-direction: column;
}

.my_circle_wrap {
  height: 230px;
}

.find_circle_wrap {
  height: 100%;
}

.title_bar {
  background-color: #fff;
  height: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 0 30px;
  font-weight: bold;
  font-size: 17px;
}

.my_circle_detail,
.circle_list {
  background-color: #fff;
  display: flex;
  padding: 0 30px 30px 30px;
  height: 100%;
}
.my_circle_detail {
  align-items: center;
}

.my_circle_detail >>> .el-button--info.is-round {
  color: #fff;
  background: #333;
  border: none;
}

.my_circle_detail >>> .el-button--info.is-round:focus,
.el-button--info.is-round:hover {
  background: #222;
  color: #fff;
}

.circle_list {
  flex-direction: column;
}

.circle_list > div {
  margin: 30px 0 0 0;
  background: #f5f5dc3d;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

img {
  height: 110px;
  width: 110px;
  border-radius: 7px;
  margin-right: 20px;
}

.my_circle_detail .el-button {
  right: 80px;
  position: absolute;
}

.circle_group {
  display: flex;
  flex-direction: column;
}

.circle_group p {
  margin: 5px;
  font-size: 14px;
}

.circle_info {
  width: 65%;
  text-align: left;
}
</style>
