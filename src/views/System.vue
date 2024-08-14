<template>
  <div>
    <h1>ADMIN SYSTEM</h1>
    
    <div class="row button-container">
      <div class="col">
        <button class="btn btn-primary w-100" @click="generateJadwalThisMonth">Generate Jadwal Bulan Ini</button>
      </div>
      <div class="col">
        <button class="btn btn-primary w-100" @click="generateJadwalNextMonth">Generate Jadwal Bulan Depan</button>
      </div>
    </div>

    <div class="row button-container mt-3">
      <div class="col">
        <button class="btn btn-primary w-100" @click="generateNoBooking">Generate No Booking</button>
      </div>
      <div class="col">
        <button class="btn btn-primary w-100" @click="clearCache">Clear Cache</button>
      </div>
    </div>

    <div class="row button-container mt-4">
      <div class="col">
        <button
          class="btn btn-toggle"
          :class="{ 'btn-active': switch1 }"
          @click="toggleSwitch1"
        >
          Maintenance
        </button>
      </div>
      <div class="col">
        <button
          class="btn btn-toggle"
          :class="{ 'btn-active': switch2 }"
          @click="toggleSwitch2"
        >
          Allow Booking
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminSystem',
  data() {
    return {
      switch1: false,
      switch2: false,
    };
  },
  methods: {
    async generateJadwalThisMonth() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/generateJadwalThisMonth');
        console.log('Jadwal bulan ini berhasil digenerate:', response.data);
      } catch (error) {
        console.error('Error generating jadwal bulan ini:', error);
      }
    },
    async generateJadwalNextMonth() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/generateJadwalNextMonth');
        console.log('Jadwal bulan depan berhasil digenerate:', response.data);
      } catch (error) {
        console.error('Error generating jadwal bulan depan:', error);
      }
    },
    async generateNoBooking() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/generateNoBooking');
        console.log('No booking berhasil digenerate:', response.data);
      } catch (error) {
        console.error('Error generating no booking:', error);
      }
    },
    async clearCache() {
      try {
        const response = await axios.delete('http://127.0.0.1:8000/api/clearCache');
        console.log('Cache berhasil dikosongkan:', response.data);
      } catch (error) {
        console.error('Error clearing cache:', error);
      }
    },
    toggleSwitch1() {
      this.switch1 = !this.switch1;
    },
    toggleSwitch2() {
      this.switch2 = !this.switch2;
    },
  },
};
</script>

<style scoped>
.button-container {
  margin-top: 50px;
}

button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

/* Button-like Switch Style */
.btn-toggle {
  background-color: #ccc;
  color: #000;
  border: none;
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
  padding: 10px;
  transition: background-color 0.3s;
}

.btn-toggle.btn-active {
  background-color: #2196F3;
  color: white;
}
</style>
