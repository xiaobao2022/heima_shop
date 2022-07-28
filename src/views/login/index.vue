<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <!-- 登入表单区域 -->
      <el-form ref="form" class="login_form" :model="form" :rules="rules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-man" v-model="form.username" />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-24gf-lock2"
            v-model="form.password"
            type="password"
          />
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="handleLogin">登入</el-button>
          <el-button type="info" @click="resetform">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  data() {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        // 验证用户名是否合法
        username: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 12,
            message: '长度在3到12个字符',
            trigger: 'blur'
          }
        ],
        // 验证密码是否合法
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 12,
            message: '长度在6到12个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登入表单
    resetform() {
      // console.log(this)
      this.$refs.form.resetFields()
    },
    async handleLogin() {
      const form = this.form
      const { data } = await login(form)
      console.log(data)
      try {
        if (data.meta.status === 200) {
          this.$message('账号登入成功')
          console.log('登入成功', data)
          window.sessionStorage.setItem('token', data.data.token)
          this.$router.push('/home')
        } else {
          this.$message('账号密码错误')
          console.log('账号密码错误', data)
          form.username = ''
          form.password = ''
        }
      } catch (err) {
        console.log('登入失败', err)
        this.$message(err?.message || '服务器端错误')
      }
    }
  }
}
</script>

<style scoped lang="less">
.login_container {
  height: 100%;
  background-color: #264b6b;
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      background-color: #fff;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100px;
        border-radius: 50%;
      }
    }
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    .btns {
      display: flex;
      justify-content: right;
    }
  }
}
</style>
