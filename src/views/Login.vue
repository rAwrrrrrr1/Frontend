<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-box">
        <div class="login-logo">
          <b>WinsArena</b>
        </div>
        <!-- /.login-logo -->
        <div class="login-box-body">
          <p class="login-box-msg">Log in to start your session</p>

          <form @submit.prevent="login" class="login-form">
            <div class="form-group has-feedback">
              <input type="text" v-model="email" class="form-control" placeholder="Email" required>
              <span class="glyphicon glyphicon-user form-control-feedback"></span>
            </div>
            <br>
            <div class="form-group has-feedback">
              <input type="password" v-model="password" class="form-control" placeholder="Password" required>
              <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="row">
              <div class="col-xs-8">
              </div>
              <!-- /.col -->
              <br>
              <div class="col-xs-4">
                <button type="submit" class="btn btn-primary btn-block btn-flat">Log In</button>
              </div>
              <!-- /.col -->
            </div>
          </form>
        </div>
        <!-- /.login-box-body -->
      </div>
      <!-- /.login-box -->
    </div>
    <!-- /.login-container -->
  </div>
  <!-- /.login-wrapper -->
</template>

<script>
// Import Axios
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        // Kirim permintaan login menggunakan Axios
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
          email: this.email,
          password: this.password
        });

        // Cek status respons
        if (response.status === 200) {
          // Login berhasil
          console.log('Login successful');
          this.error = null;
          // Redirect ke halaman Home
          this.$router.push('home');
        } else {
          // Login gagal karena respons status bukan 200
          console.error('Login failed');
          this.error = 'Invalid username or password';
        }
      } catch (error) {
        // Tangani kesalahan saat melakukan permintaan
        console.error('Error during login:', error);
        this.error = 'An error occurred during login';
      }
    },
  },
};
</script>


<style scoped>
.login-wrapper {
  background-color: #ecf0f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-container {
  width: 360px;
}

.login-box {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.login-logo {
  font-size: 35px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 25px;
  padding: 15px;
  color: #444;
}

.login-box-body {
  padding: 20px;
}

.login-box-msg {
  margin: 0;
  text-align: center;
  font-size: 18px;
  margin-bottom: 20px;
}

.form-control {
  border: 1px solid #d2d6de;
  border-radius: 4px;
  box-shadow: none;
  padding: 12px;
  height: 45px;
}

.checkbox {
  margin-top: 0;
}

.btn-flat {
  border-radius: 4px;
}

.btn-social {
  color: #fff;
}

.btn-facebook {
  background-color: #3b5998;
}

.btn-google {
  background-color: #dd4b39;
}
</style>
