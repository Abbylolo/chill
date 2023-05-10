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
        <el-input v-model.number="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
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
  name: "Login",
  data() {
    var checkUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
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
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        userName: ""
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        userName: [{ validator: checkUserName, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // backend - 登录验证（ruleForm)=>结果
          this.$api
            .login({
              username: this.ruleForm.userName,
              password: this.ruleForm.password
            })
            .then(({ data }) => {
              if (data.status == "200") {
                this.$message({
                  message: data.msg,
                  type: "success"
                });
                // store存储用户数据
                this.$store.commit("LOGIN", data.data);
                // sessionStorage存储用户数据
                window.sessionStorage.setItem("username", data.data.userName);
                window.sessionStorage.setItem("userId", data.data.userId);
                this.$emit("loginRes", data.data);
              } else {
                this.$message({
                  message: data.msg,
                  type: "error"
                });
                this.$emit("loginRes");
              }
            });
        } else {
          this.$message({
            message: "登录失败",
            type: "error"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped></style>
