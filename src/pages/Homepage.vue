<template>
  <div>
    <!-- 头部 -->
    <header>
      <div class="white-mask"></div>
      <el-input
        placeholder="搜索图片"
        v-model="keyword"
        class="search"
        maxlength="20"
        @change="searchPics"
      >
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <div class="keywordList">
        <el-radio-group
          v-for="(item, index) in keywordList"
          :key="index"
          v-model="listKeyword"
          @input="searchPics(listKeyword)"
        >
          <el-radio
            :label="item"
            border
            size="small"
            style="margin-right: 5px;"
            >{{ item }}</el-radio
          >
        </el-radio-group>
      </div>
    </header>
    <!-- 主页面 -->
    <main>
      <div class="images_show" v-for="(post, index) in postList" :key="index">
        <img
          :src="post.imgUrl"
          class="image__lazy"
          alt="图片加载失败"
          @click="
            showPostDetail = true;
            clickPostId = post.postId;
          "
        />
        <div class="likes">
          <img
            v-if="!userId"
            src="@/assets/images/icons/liked.svg"
            style="cursor:default;"
          />
          <img
            v-else-if="post.liked"
            src="@/assets/images/icons/liked.svg"
            @click="$common.like(post.postId, false, postList, userId)"
          />
          <img
            v-else
            src="@/assets/images/icons/like.svg"
            @click="$common.like(post.postId, true, postList, userId)"
          />
          <span>{{ post.liker.length }}</span>
        </div>
        <div class="author_info">
          <!-- <img src="@/assets/images/icons/avatar.svg" /> -->
          <img :src="post.avatarUrl" />
          {{ post.userName }}
        </div>
      </div>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="totalNum"
        >
        </el-pagination>
      </div>
    </main>
    <!-- 摄影贴详情弹窗 -->
    <div v-if="showPostDetail">
      <el-dialog
        title="摄影贴详情"
        :visible.sync="showPostDetail"
        width="80%"
        :before-close="postDetailClose"
        :close-on-click-modal="false"
      >
        <post-detail :postId="clickPostId"></post-detail>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PostDetail from "@/components/PostDetail.vue";
export default {
  name: "Homepage",
  components: { PostDetail },
  data() {
    return {
      clickPostId: 0,
      userId: 0,
      totalNum: 0, //帖子总数
      pageSize: 20,
      currentPage: 1,
      showPostDetail: false,
      keyword: "",
      listKeyword: "全部",
      keywordList: ["全部", "自然", "人物", "景观", "花卉"],
      postList: [
        { imgUrl: "", userName: "", avatarUrl: "", liker: [], liked: false }
      ] // 帖子信息：图片url、作者头像及姓名、帖子点赞数、是否已点赞
    };
  },
  methods: {
    // 搜索图片
    searchPics(keyword) {
      // backend 通过图片关键词获取图片组(keyword,this.currentPage,this.pageSize) => postList、帖子总数
      console.log("keyword", keyword);
      this.$api
        .getPostListByKeyword({
          userId: this.userId,
          keyword,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
          if (res.data.code == 200) {
            this.postList = res.data.postList;
            this.totalNum = res.data.totalNum;
          }
        });
    },
    // 关闭摄影贴详情
    postDetailClose(done) {
      done();
    },
    // 分页请求
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.searchPics(this.keyword || this.listKeyword, val);
    }
  },
  mounted() {
    this.userId = Number(window.sessionStorage.getItem("userId"));
    this.searchPics(this.keywordList[0], 1);
  }
};
</script>

<style lang="less" scoped>
/* 头部样式 */
.white-mask {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 11;
  background: linear-gradient(to top, #ffff, #fff0);
}
header {
  height: 20%;
  width: 100%;
  top: 60px;
  position: fixed;
  background: url("~@/assets/images/background.jpg") no-repeat center center;
  background-size: cover;
  z-index: 10;
}

.search {
  width: 35%;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 12;
}

/deep/ .el-input__inner {
  border: 1px solid #2c2c2cab;
  border-radius: 10px;
}

.keywordList {
  z-index: 12;
  left: 50%;
  position: absolute;
  transform: translate(-50%);
  bottom: 20px;
}

.el-radio.is-bordered.is-checked {
  border-color: #333;
  background-color: #333;
  color: #fff;
}

/deep/ .el-radio__input {
  display: none;
}

/deep/ .el-radio__input.is-checked + .el-radio__label {
  color: #fff;
}

/deep/ .el-radio.is-bordered {
  border: none;
}

/deep/.el-input.is-active .el-input__inner,
/deep/ .el-input__inner:focus {
  border-color: #333;
  outline: 0;
}

/* 主页面样式 */
main {
  /* overflow: auto; */
  position: absolute;
  top: 30%;
  margin: 10px 20px;
  width: 98%;
  height: 70%;
}

.image__lazy {
  height: 180px;
  margin: 6px;
}

.images_show img {
  cursor: pointer;
}

.likes,
.author_info {
  z-index: 8;
  position: absolute;
  display: inline;
  color: #fff;
}
.likes {
  right: 12px;
  top: 12px;
  height: 20px;
}
.likes img {
  cursor: pointer;
}

.likes img,
.author_info img {
  width: 20px;
  height: 20px;
  margin-bottom: -3px;
  border-radius: 10px;
}

.author_info {
  left: 12px;
  bottom: -7px;
  height: 30px;
}

.images_show {
  height: 180px;
  display: inline-block;
  position: relative;
}

// 摄影圈详情弹出框样式
/deep/ .el-dialog__header {
  padding: 20px 20px 10px;
  text-align: left;
  border-bottom: 1px solid #bbbbbbab;
}

/deep/ .el-dialog {
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.3);
}
</style>
