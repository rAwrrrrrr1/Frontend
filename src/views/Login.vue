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

          <!-- Tampilkan pesan error jika ada -->
          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <form @submit.prevent="login" class="login-form">
            <div class="form-group has-feedback">
              <input
                type="text"
                v-model="email"
                class="form-control"
                placeholder="Username"
                required
              />
              <span class="glyphicon glyphicon-user form-control-feedback"></span>
            </div>
            <br />
            <div class="form-group has-feedback">
              <input
                type="password"
                v-model="password"
                class="form-control"
                placeholder="Password"
                required
              />
              <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="row">
              <div class="col-xs-8"></div>
              <!-- /.col -->
              <br />
              <div class="col-xs-4">
                <button type="submit" class="btn btn-primary btn-block btn-flat">
                  Log In
                </button>
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
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        // Kirim permintaan login menggunakan Axios
        const response = await axios.post("http://172.20.10.5:8000/api/login", {
          email: this.email,
          password: this.password,
        });

        // Cek status respons
        if (response.status === 200 && response.data.access_token) {
          // Login berhasil
          console.log("Login successful");
          this.error = null;

          // Simpan access_token ke localStorage
          localStorage.setItem("access_token", response.data.access_token);

          // Redirect ke halaman Home
          this.$router.push("home");
        } else {
          // Login gagal
          this.error = "Invalid username or password";
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Tangani error login dari API (contoh: 401 Unauthorized)
          this.error = "Invalid username or password";
        } else {
          // Tangani kesalahan lainnya
          console.error("Error during login:", error);
          this.error = "An error occurred during login";
        }
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

.alert {
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}

.btn-flat {
  border-radius: 4px;
}

.glyphicon {
  position: absolute;
  top: 12px;
  right: 15px;
  color: #999;
}
</style>
