<template>
  <div>
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div class="container">
        <router-link :to="{ name: 'home' }" class="navbar-brand">HOME</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="{ name: 'transaksi' }" class="nav-link active" aria-current="page">TRANSAKSI</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Content Container -->
    <div class="container mt-3">
      <!-- Judul Halaman -->
      <h2>{{ pageTitle }}</h2>

      <!-- Input Tanggal -->
      <div class="mb-3">
        <label for="selectedDate" class="form-label">Pilih Tanggal</label>
        <input type="date" id="selectedDate" v-model="selectedDate" @change="updateSchedule" class="form-control">
      </div>

      <!-- Input Kategori Olahraga -->
      <div class="mb-3">
        <label for="selectedCategory" class="form-label">Pilih Kategori Olahraga</label>
        <select id="selectedCategory" v-model="selectedCategory" @change="updateSchedule" class="form-select">
          <option value="all">Semua Kategori</option>
          <option value="badminton">Badminton</option>
          <option value="mini soccer">Mini Soccer</option>
          <option value="futsal">Futsal</option>
        </select>
      </div>

      <!-- Tabel Jadwal -->
      <table class="table">
        <thead>
          <tr>
            <th>Jam</th>
            <th>Sesi Olahraga</th>
          </tr>
        </thead>
        <tbody>
          <!-- Iterate through time slots to generate rows -->
          <tr v-for="(session, index) in sportsSessions" :key="index" class="table-row">
            <td>{{ session.time }}</td>
            <td>{{ session.activity }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Render router view -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: 'Jadwal',
      selectedDate: new Date().toISOString().substr(0, 10),
      selectedCategory: 'all',
      sportsSessions: [],
    };
  },
  mounted() {
    // Generate sports sessions for the day
    this.generateSportsSessions();
  },
  methods: {
    generateSportsSessions() {
      const startTime = 8;
      const endTime = 20;
      const sessionDuration = 2;

      this.sportsSessions = [];

      for (let i = startTime; i <= endTime; i += sessionDuration) {
        const startTimeString = `${String(i).padStart(2, '0')}:00`;
        const endTimeString = `${String(i + sessionDuration).padStart(2, '0')}:00`;

        if (this.selectedCategory === 'all' || this.selectedCategory === 'Nama Aktivitas') {
          this.sportsSessions.push({
            time: `${startTimeString} - ${endTimeString}`,
            activity: 'Nama Aktivitas',
          });
        }
      }
    },
    updateSchedule() {
      this.generateSportsSessions();
      // Tambahkan logika untuk memuat data sesuai tanggal dan kategori jika diperlukan
      // Contoh: axios.get(`/api/schedule?date=${this.selectedDate}&category=${this.selectedCategory}`).then(response => {
      //   this.sportsSessions = response.data;
      // });
    },
  },
};
</script>

<style scoped>
/* Add CSS styles as needed */

/* Table Styles */
.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
}

/* Table Header Styles */
.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

/* Table Body Styles */
.table tbody td {
  vertical-align: middle;
  border-top: 1px solid #dee2e6;
}

/* Optional: Hover effect on table rows */
.table tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.05);
}

/* Add margin or padding to create separation between table rows */
.table-row {
  margin-bottom: 10px;
}
</style>
