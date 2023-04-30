<template>
  <div style="display: flex;">
    <div class="left">
      <p>作品简介</p>
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="post.brief"
        maxlength="50"
        :show-word-limit="true"
        resize="none"
      >
      </el-input>
      <p>作品标签</p>
      <div style="display: flex;">
        <el-tag
          :key="tag"
          v-for="tag in post.tags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <div v-show="post.tags.length <= 9">
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ New Tag</el-button
          >
        </div>
      </div>
      <p>
        设备信息
        <img src="@/assets/images/icons/camera.svg" alt="图片加载失败" />
      </p>
      <el-input v-model="post.cameraInfo" clearable> </el-input>
      <p>
        照片调参
        <img src="@/assets/images/icons/parameter.svg" alt="图片加载失败" />
      </p>
      <el-input v-model="post.parameter" clearable> </el-input>
    </div>
    <div class="right">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :limit="9"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="图片加载失败" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublishPost",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      post: {
        brief: "",
        cameraInfo: "",
        parameter: "",
        tags: [],
        imgUrls: []
      },
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleClose(tag) {
      this.post.tags.splice(this.post.tags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.post.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  }
};
</script>

<style lang="less" scoped>
.right {
  width: 60%;
  display: flex;
}

.left {
  background-color: #fafbc89f;
  width: 30%;
  height: 50vh;
  padding: 20px;
  margin: 0 30px;
}

.left > p {
  text-align: left;
}

.left > p > img {
  width: 16px;
  margin-bottom: -3px;
}

/deep/.el-input__inner,
/deep/.el-textarea__inner {
  border: 1px solid #eeebebae;
}

/deep/.el-tag {
  margin-right: 8px;
}
</style>
