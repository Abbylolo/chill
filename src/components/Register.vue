<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatarUrl">
        <!-- 头像上传 -->
        <el-upload
          class="avatar-uploader"
          action="/api/common/uploadPic"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers="headers"
        >
          <img
            v-if="ruleForm.avatarUrl"
            :src="ruleForm.avatarUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="简介" prop="brief">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="ruleForm.brief"
          maxlength="50"
          :show-word-limit="true"
          resize="none"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var checkUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else if (value.length > 10) {
        return callback(new Error("用户名不能超过10个字"));
      }
      // setTimeout(() => {
      //   if (!Number.isInteger(value)) {
      //     callback(new Error("请输入数字值"));
      //   } else{
      //     callback();
      //   }
      // }, 1000);
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length > 12) {
        return callback(new Error("密码不能超过12位数"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      headers: {
        token: localStorage.getItem("userId") || "" //携带自己的token
      },
      ruleForm: {
        password: "",
        checkPass: "",
        userName: "",
        brief: "",
        avatarUrl: ""
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        userName: [{ validator: checkUserName, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // backend - 注册验证（ruleForm)=>结果
          this.$api
            .register({
              username: this.ruleForm.userName,
              password: this.ruleForm.password,
              brief: this.ruleForm.brief,
              avatarUrl: this.ruleForm.avatarUrl
            })
            .then(({ data }) => {
              if (data.code == "200") {
                console.log(data.data, "data.data");
                this.$message({
                  message: data.msg,
                  type: "success"
                });
                // store存储用户数据
                this.$store.commit("LOGIN", data.data);
                // sessionStorage存储用户数据
                window.sessionStorage.setItem("username", data.data.userName);
                window.sessionStorage.setItem("userId", data.data.userId);
                window.sessionStorage.setItem("avatarUrl", data.data.avatarUrl);
                window.sessionStorage.setItem("brief", data.data.brief);
                this.$emit("registerRes", data.data);
              } else {
                this.$message({
                  message: data.msg,
                  type: "error"
                });
                this.$emit("registerRes");
              }
            });
        } else {
          this.$message({
            message: "注册失败",
            type: "error"
          });
          return false;
        }
      });
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 头像图片预检
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 上传头像图片成功
    handleAvatarSuccess(res, file) {
      console.log(res, "sss");
      if (res.code == "200") {
        this.$set(this.ruleForm, "avatarUrl", res.data);
      } else {
        this.$message({
          message: "上传失败",
          type: "error"
        });
      }
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.avatar-uploader {
  display: flex;
}

/deep/.avatar-uploader .el-upload {
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
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
