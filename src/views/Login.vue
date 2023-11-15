<template>
  <div class="login-wrapper">
    <div class="login-container">
      <h2 class="login-header">Login</h2>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" v-model="username" class="form-input" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" class="form-input" required>
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
      <router-link :to="{ name: 'home' }">Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    login() {
      // Implement logic for login here
      if (this.username === 'user' && this.password === 'password') {
        // Contoh login berhasil
        console.log('Login successful');
        this.error = null;
        // Redirect ke halaman lain jika diperlukan
      } else {
        // Contoh login gagal
        console.error('Login failed');
        this.error = 'Invalid username or password';
      }
    },
  },
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-container {
  max-width: 300px;
  padding: 20px;
  border: 1px solid #3498db;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px #3498db;
}

.login-header {
  color: #3498db;
  text-align: center;
}

.login-form {
  margin-top: 15px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #3498db;
  border-radius: 3px;
}

.login-button {
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #2980b9;
}
</style>
