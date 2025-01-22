<template>
  <div class="user-list">
    <h1>User List</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <table v-if="filteredUsers.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.nama }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.telepon }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>No users to display</div>
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
  computed: {
    filteredUsers() {
      // Filter users to display only those with ID > 1
      return this.users.filter(user => user.id > 1);
    }
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await axios.get('http://172.20.10.5:8000/api/users');
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
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #e3f2fd, #f9fbe7);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

h1 {
  text-align: center;
  color: #2e7d32;
  font-size: 2.5em;
  margin-bottom: 20px;
}

.loading, .error {
  text-align: center;
  margin: 20px 0;
  font-size: 1.5em;
  color: #ff5252;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 15px;
  text-align: left;
}

th {
  background-color: #66bb6a;
  color: white;
  font-size: 1.1em;
}

td {
  font-size: 0.95em;
  color: #333;
}

tr:nth-child(even) {
  background-color: #f1f8e9;
}

tr:hover {
  background-color: #c8e6c9;
  cursor: pointer;
}

.error {
  color: #d32f2f;
  font-weight: bold;
}
</style>
