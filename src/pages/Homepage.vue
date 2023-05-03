<template>
  <div>
    <!-- 头部 -->
    <header>
      <div class="white-mask"></div>
      <el-input
        placeholder="搜索图片"
        v-model="searchKeyword"
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
          @input="searchPics"
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
      <div class="images_show" v-for="post in postList" :key="post.postId">
        <img
          :src="post.imgUrl"
          class="image__lazy"
          alt="图片加载失败"
          @click="showPostDetail = true"
        />
        <!-- 摄影贴详情弹窗 -->
        <el-dialog
          title="摄影贴详情"
          :visible.sync="showPostDetail"
          width="80%"
          :before-close="postDetailClose"
        >
          <post-detail :postId="post.postId"></post-detail>
        </el-dialog>

        <div class="likes">
          <img
            v-if="post.liked"
            src="@/assets/images/icons/liked.svg"
            @click="$common.like(post.postId, false, postList)"
          />
          <img
            v-else
            src="@/assets/images/icons/like.svg"
            @click="$common.like(post.postId, true, postList)"
          />
          <span>{{ post.likes }}</span>
        </div>
        <div class="author_info">
          <img src="@/assets/images/icons/avatar.svg" />
          {{ post.author }}
        </div>
      </div>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="totalNum"
        >
        </el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
import PostDetail from "@/components/PostDetail.vue";
export default {
  name: "Homepage",
  components: { PostDetail },
  data() {
    return {
      totalNum: 0, //帖子总数
      currentPage: 1,
      showPostDetail: false,
      searchKeyword: "",
      listKeyword: "全部",
      keywordList: ["全部", "自然", "人物", "景观", "花卉"],
      postList: [{ imgUrl: "", author: "", avatar: "", likes: 0, liked: false }] // 帖子信息：图片url、作者头像及姓名、帖子点赞数、是否已点赞
    };
  },
  methods: {
    // 搜索图片
    searchPics(searchKeyword, pageNum) {
      // backend 通过图片关键词获取图片组(searchKeyword,pageNum) => postList、帖子总数
      console.log("searchKeyword", searchKeyword);
      this.postList = [
        {
          postId: "0",
          imgUrl:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          author: "abbylolo",
          avatar: "~@/assets/images/icons/avatar.svg",
          likes: 99,
          liked: false
        },
        {
          postId: "1",
          imgUrl:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          author: "abbylolo",
          avatar: "@/assets/images/icons/avatar.svg",
          likes: 88,
          liked: false
        },
        {
          postId: "2",
          imgUrl:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          author: "abbylolo",
          avatar: "",
          likes: 77,
          liked: false
        },
        {
          postId: "3",
          imgUrl:
            "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
          author: "abbylolo",
          avatar: "",
          likes: 77,
          liked: false
        },
        {
          postId: "4",
          imgUrl:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          author: "abbylolo",
          avatar: "",
          likes: 77,
          liked: false
        },
        {
          postId: "5",
          imgUrl:
            "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
          author: "abbylolo",
          avatar: "",
          likes: 77,
          liked: false
        },
        {
          postId: "6",
          imgUrl:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          author: "abbylolo",
          avatar: "",
          likes: 77,
          liked: false
        },
        {
          postId: "7",
          imgUrl:
            "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
          author: "abbylolo",
          avatar: "",
          likes: 77,
          liked: false
        },
        {
          postId: "8",
          imgUrl:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          author: "abbylolo",
          avatar: "~@/assets/images/icons/avatar.svg",
          likes: 99,
          liked: false
        },
        {
          postId: "9",
          imgUrl:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          author: "abbylolo",
          avatar: "@/assets/images/icons/avatar.svg",
          likes: 88,
          liked: false
        },
        {
          postId: "10",
          imgUrl:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          author: "abbylolo",
          avatar: "~@/assets/images/icons/avatar.svg",
          likes: 99,
          liked: false
        },
        {
          postId: "11",
          imgUrl:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          author: "abbylolo",
          avatar: "@/assets/images/icons/avatar.svg",
          likes: 88,
          liked: false
        },
        {
          postId: "12",
          imgUrl:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          author: "abbylolo",
          avatar: "",
          likes: 77,
          liked: false
        },
        {
          postId: "13",
          imgUrl:
            "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
          author: "abbylolo",
          avatar: "",
          likes: 77,
          liked: false
        },
        {
          postId: "14",
          imgUrl:
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          author: "abbylolo",
          avatar: "",
          likes: 77,
          liked: false
        }
      ];
      this.totalNum = 100;
    },
    // 关闭摄影贴详情
    postDetailClose(done) {
      done();
    },
    // 分页请求
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.searchPics(this.searchKeyword || this.listKeyword, val);
    }
  },
  mounted() {
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
