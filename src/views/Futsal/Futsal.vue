<template>
  <div>
    <h1>Daftar Lapangan Futsal</h1>
    <button type="button" class="btn btn-success" @click="addFutsal">Tambah Lapangan</button>
    <div class="futsal-container">
      <div class="futsal-box" v-for="futsal in futsals" :key="futsal.id">
        <h3>{{ futsal.nama }}</h3>
        <p>Harga: {{ formatCurrency(futsal.harga) }}</p>
        <p>{{ futsal.keterangan }}</p>
        <img :src="`http://172.20.10.5:8000/storage/${(futsal.gambar).substring(7)}`" alt="Gambar Lapangan" width="200px" height="auto" style="margin-bottom: 16px">
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
      axios.get('http://172.20.10.5:8000/api/futsal')
        .then(response => {
          this.futsals = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },

    addFutsal() {
      // Navigasi ke halaman tambah data lapangan futsal
      this.$router.push({ name: 'AddFutsal' });
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
      axios.delete(`http://172.20.10.5:8000/api/futsal/${id}`)
        .then(response => {
          console.log('Lapangan futsal berhasil dihapus:', response.data);
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

button.btn-success {
  margin-bottom: 20px;
}
</style>
