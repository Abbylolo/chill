<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" maxlength="10" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="brief">
        <el-input
          type="textarea"
          v-model="form.brief"
          :rows="5"
          maxlength="200"
          show-word-limit
          resize="none"
        ></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="/api/common/uploadPic"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.avatarUrl" :src="form.avatarUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CreateCircle",
  props: {
    formInit: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      form: { name: "", brief: "", avatarUrl: "" },
      rules: {
        name: [
          { required: true, message: "请输入摄影圈名称", trigger: "blur" },
          { max: 20, message: "名称长度不可超过20个字符", trigger: "blur" }
        ],
        brief: [
          { required: true, message: "请输入摄影圈简介", trigger: "blur" },
          { max: 200, message: "名称长度不可超过200个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 头像图片限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt3M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt3M) {
        this.$message.error("上传图片大小不能超过 3MB!");
      }
      return isJPG && isLt3M;
    },
    // 头像上传成功
    handleAvatarSuccess(res, file) {
      this.form.avatarUrl = res.data;
    }
  },
  mounted() {
    if (this.formInit) {
      this.form = Object.assign({}, this.formInit);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.avatar-uploader {
  display: flex;
}

/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
