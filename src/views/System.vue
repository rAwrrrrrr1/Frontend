<template>
  <div>
    <h1>ADMIN SYSTEM</h1>

    <!-- Notification -->
    <div v-if="notificationMessage" class="notification">
      {{ notificationMessage }}
    </div>

    <div class="row button-container">
      <div class="col">
        <button
          class="btn btn-primary w-100"
          :disabled="loadingGenerateThisMonth"
          @click="generateJadwalThisMonth"
        >
          <span v-if="loadingGenerateThisMonth" class="spinner"></span>
          <span v-else>Generate Jadwal Bulan Ini</span>
        </button>
      </div>
      <div class="col">
        <button
          class="btn btn-primary w-100"
          :disabled="loadingGenerateNextMonth"
          @click="generateJadwalNextMonth"
        >
          <span v-if="loadingGenerateNextMonth" class="spinner"></span>
          <span v-else>Generate Jadwal Bulan Depan</span>
        </button>
      </div>
    </div>

    <div class="row button-container mt-3">
      <div class="col">
        <button
          class="btn btn-primary w-100"
          :disabled="loadingClearCache"
          @click="clearCache"
        >
          <span v-if="loadingClearCache" class="spinner"></span>
          <span v-else>Clear Cache</span>
        </button>
      </div>
    </div>

    <div class="row button-container mt-4">
      <!-- <div class="col">
        <button
          class="btn btn-toggle"
          :class="{ 'btn-active': switch1 }"
          @click="toggleSwitch1"
        >
          Maintenance
        </button>
      </div> -->
      <!-- <div class="col">
        <button
          class="btn btn-toggle"
          :class="{ 'btn-active': switch2 }"
          @click="toggleSwitch2"
        >
          Allow Booking
        </button>
      </div> -->
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
      notificationMessage: '',
      loadingGenerateThisMonth: false,
      loadingGenerateNextMonth: false, 
      loadingClearCache: false, 
    };
  },
  methods: {
    showNotification(message) {
      this.notificationMessage = message;
      setTimeout(() => {
        this.notificationMessage = '';
      }, 5000);
    },
    async generateJadwalThisMonth() {
      this.loadingGenerateThisMonth = true;
      try {
        const response = await axios.post('http://172.20.10.5:8000/api/generateJadwalThisMonth');
        this.showNotification('Jadwal bulan ini berhasil digenerate');
        console.log('Jadwal bulan ini berhasil digenerate:', response.data);
      } catch (error) {
        console.error('Error generating jadwal bulan ini:', error);
      } finally {
        this.loadingGenerateThisMonth = false;
      }
    },
    async generateJadwalNextMonth() {
      this.loadingGenerateNextMonth = true;
      try {
        const response = await axios.post('http://172.20.10.5:8000/api/generateJadwalNextMonth');
        this.showNotification('Jadwal bulan depan berhasil digenerate');
        console.log('Jadwal bulan depan berhasil digenerate:', response.data);
      } catch (error) {
        console.error('Error generating jadwal bulan depan:', error);
      } finally {
        this.loadingGenerateNextMonth = false;
      }
    },
    async clearCache() {
      this.loadingClearCache = true;
      try {
        const response = await axios.delete('http://172.20.10.5:8000/api/clearCache');
        this.showNotification('Cache berhasil dikosongkan');
        console.log('Cache berhasil dikosongkan:', response.data);
      } catch (error) {
        console.error('Error clearing cache:', error);
      } finally {
        this.loadingClearCache = false;
      }
    },
    async toggleSwitch1() {
        try {
            // Get the current maintenance status
            const getStatusResponse = await axios.get('http://172.20.10.5:8000/api/maintenance/getStatus');
            let currentStatus = getStatusResponse.data.maintenance;

            // Toggle the status: if 1, set to 0; if 0, set to 1
            const newStatus = currentStatus === 1 ? 0 : 1;

            // Update the maintenance mode status
            const response = await axios.put('http://172.20.10.5:8000/api/maintenance', {
                maintenance: newStatus,
            });

            // Update the local state
            this.switch1 = newStatus === 1;

            this.showNotification(`Maintenance mode ${newStatus === 1 ? 'enabled' : 'disabled'}`);
            console.log('Maintenance mode status:', response.data);
        } catch (error) {
            console.error('Error toggling maintenance mode:', error);
        }
    },

    async toggleSwitch2() {
        this.switch2 = !this.switch2;
        try {
        const response = await axios.put('http://172.20.10.5:8000/api/allowBooking', {
            allowBooking: this.switch2,
        });
        this.showNotification(`Booking ${this.switch2 ? 'allowed' : 'disallowed'}`);
        console.log('Booking status:', response.data);
        } catch (error) {
        console.error('Error toggling booking status:', error);
        }
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

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Notification Style */
.notification {
  background-color: #4CAF50;
  color: white;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  text-align: center;
}

/* Spinner Style */
.spinner {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid #3498db;
  width: 14px;
  height: 14px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
}

/* Spin Animation */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
