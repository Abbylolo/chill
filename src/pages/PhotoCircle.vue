<template>
  <div class="main">
    <!-- 我创立的摄影圈 -->
    <div class="my_circle_wrap">
      <div class="title_bar">我创立的摄影圈</div>
      <div class="my_circle_detail">
        <div v-if="myCircleList.length == 0">
          <span>快来创建摄影圈吧！</span>
        </div>
        <div
          class="circle_group"
          v-for="item in myCircleList"
          :key="item.circleId"
          v-else
        >
          <img :src="item.avatarUrl" alt="图片加载失败" />
          <p
            style="cursor: pointer;"
            @click="
              $router.push({
                name: 'PhotoCircleDetail',
                params: { circleInfo: item }
              })
            "
          >
            {{ item.name }}
          </p>
        </div>
        <el-button type="info" round @click="openCreateCircleMsg()"
          ><i class="el-icon-plus el-icon--left"></i>创建</el-button
        >
      </div>
    </div>
    <!-- 我加入的摄影圈 -->
    <div class="my_circle_wrap">
      <div class="title_bar">我加入的摄影圈</div>
      <div class="my_circle_detail">
        <div v-if="joinedCircleList.length == 0">
          <span>还没有加入摄影圈喔！</span>
        </div>
        <div
          class="circle_group"
          v-for="item in joinedCircleList"
          :key="item.circleId"
          v-else
        >
          <img :src="item.avatarUrl" alt="图片加载失败" />
          <p
            style="cursor: pointer;"
            @click="
              $router.push({
                name: 'PhotoCircleDetail',
                params: { circleInfo: item }
              })
            "
          >
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
    <!-- 发现摄影圈 -->
    <div class="find_circle_wrap">
      <div class="title_bar">发现摄影圈</div>
      <div class="circle_list">
        <div v-for="item in notJoinedCircleList" :key="item.circleId">
          <img :src="item.avatarUrl" alt="图片加载失败" />
          <div class="circle_info">
            <p
              style="font-size: 18px; cursor: pointer;"
              @click="
                $router.push({
                  name: 'PhotoCircleDetail',
                  params: { circleInfo: item }
                })
              "
            >
              {{ item.name }}
            </p>
            <p style="font-size: 12px; margin: 0;">{{ item.fansNum }}圈友</p>
            <p>简介：{{ item.brief }}</p>
          </div>
          <el-button type="warning" plain @click="joinCircle(item)"
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
      userId: 0,
      circleId: 1,
      // 我创立的摄影圈
      myCircleList: [],
      // 我加入的摄影圈
      joinedCircleList: [],
      // 我未加入的摄影圈
      notJoinedCircleList: [],
      // 所有摄影圈列表
      allCircleList: [
        {
          circleId: "",
          avatarUrl: "",
          name: "",
          fansNum: 0,
          brief: "",
          state: 0 // 0-未加入的的；1-加入的；2-用户创建的
        }
      ]
    };
  },
  methods: {
    // 获取所有摄影圈列表
    getAllCircleList() {
      // 重置摄影圈列表
      this.myCircleList = [];
      this.joinedCircleList = [];
      this.notJoinedCircleList = [];

      // backend 获取摄影圈列表getAllCircleList() => 摄影圈列表（摄影圈id，摄影圈头像，摄影圈名字，摄影圈圈友数，摄影圈简介,状态）
      this.$api.getAllCircleList({ userId: this.userId }).then(res => {
        if (res.data.code == 200) {
          this.allCircleList = res.data.allCircleList;
          // 根据状态对摄影圈进行归类
          this.allCircleList.forEach(item => {
            if (item.state == 2) {
              this.myCircleList.push(item);
            } else if (item.state == 1) {
              this.joinedCircleList.push(item);
            } else {
              this.notJoinedCircleList.push(item);
            }
          });
        }
      });
      /*  this.allCircleList = [
        {
          circleId: "1",
          avatarUrl:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          name: "汪星人保护队",
          fansNum: 2000,
          brief: "啦啦啦啦啦啦啦啦啦啦",
          state: 1
        },
        {
          circleId: "2",
          avatarUrl:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          name: "喵星人保护队",
          fansNum: 3000,
          brief:
            "咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦",
          state: 0
        },
        {
          circleId: "3",
          avatarUrl:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          name: "喵星人保护队",
          fansNum: 3000,
          brief:
            "咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦咯啦啦啦咯哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦咯啦啦啦咯哦哦哦哦哦哦哦哦哦",
          state: 2
        },
        {
          circleId: "4",
          avatarUrl:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          name: "汪星人保护队",
          fansNum: 2000,
          brief: "啦啦啦啦啦啦啦啦啦啦",
          state: 0
        },
        {
          circleId: "5",
          avatarUrl:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          name: "汪星人保护队",
          fansNum: 2000,
          brief: "啦啦啦啦啦啦啦啦啦啦",
          state: 0
        }
      ]; */
    },

    // 打开创建摄影圈弹窗
    openCreateCircleMsg() {
      const h = this.$createElement;
      this.$msgbox({
        title: "创建摄影圈",
        message: h("create-circle", { ref: "createCircle" }),
        showCancelButton: true,
        confirmButtonText: "创建",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          const form = this.$refs.createCircle.form || {
            name: "",
            brief: "",
            avatarUrl: ""
          };
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
              // 提交创建新摄影圈
              // backend - circleCreate创建新摄影圈（userid,...form）=>摄影圈编号
              this.$api
                .createCircle({ userId: this.userId, ...form })
                .then(res => {
                  if (res.data.code == 200) {
                    this.$message({
                      type: "success",
                      message: res.data.msg
                    });
                    // 如果创立成功更新摄影圈状态
                    this.getAllCircleList();
                  }
                });
              done();
              instance.confirmButtonLoading = false;
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
      let { circleId, fans, name } = circleInfo;

      if (fans == null) {
        fans = [];
      }
      fans.push(this.userId.toString());
      // backend - joinCircle用户加入摄影圈（circleId,fans) => 状态
      this.$api.changeCircleFans({ circleId, fans }).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: `成功加入摄影圈"${name}"`,
            type: "success"
          });
        }
        this.getAllCircleList();
      });
    }
  },
  mounted() {
    this.userId = Number(window.sessionStorage.getItem("userId"));
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
  height: 100%;
}
.my_circle_detail {
  align-items: center;
  padding: 0 30px;
}

.circle_list {
  flex-direction: column;
  padding: 0 30px 30px 30px;
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
}

.my_circle_detail .el-button {
  right: 80px;
  position: absolute;
}

.circle_group {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
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
