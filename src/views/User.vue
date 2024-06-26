<template>
  <div class="user-list">
    <h1>User List</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <table v-if="users.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.nama }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.telepon }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      loading: false,
      error: ''
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users');
        this.users = response.data.users;
      } catch (error) {
        this.error = 'Failed to load users';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.user-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.loading, .error {
  text-align: center;
  margin: 20px 0;
  font-size: 1.2em;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px; /* Menambahkan gap bawah */
}

th, td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
  color: #333;
}

td {
  text-align: center;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
