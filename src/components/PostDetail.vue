<template>
  <div>
    <main>
      <!-- 图片走马灯 -->
      <el-carousel
        indicator-position="outside"
        :autoplay="false"
        arrow="always"
        style="width:65%;margin-right: 40px;"
      >
        <el-carousel-item v-for="(item, index) in post.imgUrls" :key="index">
          <img :src="item" alt="图片加载失败" style="height: 300px;" />
        </el-carousel-item>
      </el-carousel>
      <!-- 帖子信息 -->
      <div>
        <div class="author_info">
          <img :src="post.avatarUrl" />
          <div>
            <div>{{ post.userName }}</div>
            <div>{{ post.createTime }}</div>
          </div>
        </div>
        <div class="brief">
          <div style="font-weight: bold;width:50px">简介：</div>
          <div>
            <div style="margin-bottom: 10px;">{{ post.brief }}</div>
            <div>
              <span
                v-for="(item, index) in post.tags"
                :key="index"
                style="color: #F5BB08;"
              >
                #{{ item }}&nbsp;&nbsp;
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div>
        <img src="@/assets/images/icons/camera.svg" alt="图片加载失败" />
        <span>{{ post.cameraInfo }}</span>
      </div>
      <div>
        <img src="@/assets/images/icons/parameter.svg" alt="图片加载失败" />
        <span>{{ post.parameter }}</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "PostDetail",
  props: {
    postId: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      post: {
        userName: "",
        avatarUrl: "",
        createTime: "",
        brief: "",
        tags: [""],
        imgUrls: [""],
        cameraInfo: "",
        parameter: ""
      }
    };
  },
  methods: {
    // 获取摄影贴详情
    getPostDetail() {
      // backend - 获取摄影贴详情（摄影贴postId）=》摄影贴详情
      this.$api.getPostDetail({ postId: this.postId }).then(res => {
        if (res.data.code == 200) {
          this.post = res.data.data;
        }
      });
    }
  },
  mounted() {
    this.getPostDetail();
  }
};
</script>

<style scoped>
main {
  display: flex;
}

/* 右侧信息 */
.author_info {
  display: flex;
}

.author_info img {
  width: 40px;
  margin-right: 15px;
}

.author_info div {
  text-align: left;
}

.brief {
  display: flex;
  flex-direction: row;
  margin: 30px 0px 0px 6px;
  text-align: left;
}

/* 走马灯样式 */
/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
.el-carousel__item {
  background-color: #f0f0f0;
}

/* 尾部样式 */
footer {
  /* margin-top: 20px; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

footer img {
  width: 24px;
  margin: 10px 20px;
}

footer > div {
  display: flex;
  align-items: center;
}
</style>
