<template>
  <div>
    <!-- Content Container -->
    <div class="container mt-3">
      <!-- Page Title -->
      <h2>{{ pageTitle }}</h2>

      <!-- Calendar Component -->
      <div class="calendar">
        <div class="header">
          <button @click="previousMonth">&lt;</button>
          <h2>{{ currentMonth }}</h2>
          <button @click="nextMonth">&gt;</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Minggu</th>
              <th>Senin</th>
              <th>Selasa</th>
              <th>Rabu</th>
              <th>Kamis</th>
              <th>Jumat</th>
              <th>Sabtu</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, index) in calendar" :key="index">
              <td v-for="(day, idx) in week" :key="idx" @click="selectDate(day)">
                <span v-if="day">{{ day.date }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Show Selected Day Data -->
      <div v-if="selectedDate">
        <h3>Data untuk {{ selectedDate.toLocaleDateString('id-ID') }}</h3>
        <!-- Tampilkan data sesuai kebutuhan, misalnya tabel data transaksi untuk hari itu -->
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Tanggal</th>
              <!-- Add more table headers as needed -->
            </tr>
          </thead>
          <tbody>
            <!-- Iterate through your data to generate rows -->
            <tr v-for="item in getDataForSelectedDate(selectedDate)" :key="item.id" class="table-row">
              <td>{{ item.id }}</td>
              <td>{{ item.nama }}</td>
              <td>{{ item.tanggal }}</td>
              <!-- Add more table cells as needed -->
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Router View -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: 'Transaksi',
      currentDate: new Date(),
      selectedDate: null,
      tableData: [
        { id: 1, nama: 'John Doe', tanggal: '2023-11-11' },
        { id: 2, nama: 'Jane Doe', tanggal: '2023-11-12' },
        // Add more data objects as needed
      ],
    };
  },
  computed: {
    currentMonth() {
      const options = { month: 'long', year: 'numeric' };
      return this.currentDate.toLocaleDateString('id-ID', options);
    },
    calendar() {
      const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

      const startDayOfWeek = firstDayOfMonth.getDay(); // Mendapatkan hari pertama dalam minggu
      const totalDaysOfMonth = lastDayOfMonth.getDate(); // Mendapatkan total hari dalam bulan

      const weeks = [];
      let currentWeek = [];

      // Tambahkan hari kosong sebelum hari pertama dalam bulan
      for (let i = 0; i < startDayOfWeek; i++) {
        currentWeek.push(null);
      }

      // Iterasi untuk menambahkan tanggal-tanggal dalam bulan
      for (let day = 1; day <= totalDaysOfMonth; day++) {
        currentWeek.push({ date: day, isCurrentMonth: true });
        if (currentWeek.length === 7) {
          weeks.push(currentWeek);
          currentWeek = [];
        }
      }

      // Tambahkan hari kosong setelah tanggal terakhir dalam bulan
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }

      weeks.push(currentWeek);

      return weeks;
    },
  },
  methods: {
    previousMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    },
    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    },
    selectDate(day) {
      if (day && day.isCurrentMonth) {
        this.selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day.date);
        // Do something with the selected date
        console.log('Selected Date:', this.selectedDate.toISOString());
      }
    },
    getDataForSelectedDate(selectedDate) {
      // Contoh: Ambil data transaksi untuk tanggal tertentu
      // Gantilah ini dengan logika yang sesuai dengan kebutuhan aplikasi Anda
      const formattedDate = selectedDate.toISOString().split('T')[0];
      return this.tableData.filter(item => item.tanggal === formattedDate);
    },
  },
};
</script>

<style scoped>
.calendar {
  max-width: 600px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.5rem;
  text-align: center;
  border: 1px solid #ddd;
}

td:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}

th {
  background-color: #f2f2f2;
}

/* Add margin or padding to create separation between table rows */
.table-row {
  margin-bottom: 10px; /* Adjust the value based on your preference */
}
</style>
