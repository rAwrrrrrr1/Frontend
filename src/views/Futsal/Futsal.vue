<template>
  <div>
    <h1>Daftar Lapangan Futsal</h1>
    <div class="futsal-container">
      <div class="futsal-box" v-for="futsal in futsals" :key="futsal.id">
        <h3>{{ futsal.nama }}</h3>
        <p>Harga: {{ formatCurrency(futsal.harga) }}</p>
        <p>{{ futsal.keterangan }}</p>
        <div>
          <button type="button" class="btn btn-primary" @click="editFutsal(futsal.id)">Edit</button>
          &nbsp;
          <button type="button" class="btn btn-danger" @click="confirmDelete(futsal.id)">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      futsals: []
    };
  },
  mounted() {
    this.fetchFutsals();
  },
  methods: {
    fetchFutsals() {
      axios.get('http://127.0.0.1:8000/api/futsal')
        .then(response => {
          this.futsals = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    editFutsal(id) {
      // Navigasi ke halaman edit data lapangan futsal
      this.$router.push({ name: 'EditFutsal', params: { id: id } });
    },
    confirmDelete(id) {
      if (confirm('Apakah Anda yakin ingin menghapus lapangan futsal ini?')) {
        this.deleteFutsal(id);
      }
    },
    deleteFutsal(id) {
      // Kirim permintaan DELETE ke API
      axios.delete(`http://127.0.0.1:8000/api/futsal/${id}`)
        .then(response => {
          console.log('Lapangan futsal berhasil dihapus:', response.data);
          // Setelah berhasil dihapus, ambil ulang data lapangan futsal
          this.fetchFutsals();
        })
        .catch(error => {
          console.error('Error saat menghapus lapangan futsal:', error);
        });
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(amount);
    }
  }
}
</script>

<style scoped>
.futsal-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
}

.futsal-box {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;
}

.futsal-box:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.futsal-box h3 {
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #333;
}

.futsal-box p {
  font-size: 1rem;
  color: #666;
}
</style>
