<template>
  <div>
    <h1>Daftar Lapangan Mini Soccer</h1>
    <button type="button" class="btn btn-success" @click="addMiniSoccer">Tambah Lapangan</button>
    <div class="minisoccer-container">
      <div class="minisoccer-box" v-for="minisoccer in minisoccers" :key="minisoccer.id">
        <h3>{{ minisoccer.nama }}</h3>
        <p>Harga: {{ formatCurrency(minisoccer.harga) }}</p>
        <p>{{ minisoccer.keterangan }}</p>
        <img :src="`http://127.0.0.1:8000/storage/${(minisoccer.gambar).substring(7)}`" alt="Gambar Lapangan" width="200px" height="auto" style="margin-bottom: 16px">
        <div>
          <button type="button" class="btn btn-primary" @click="editMinisoccer(minisoccer.id)">Edit</button>
          &nbsp;
          <button type="button" class="btn btn-danger" @click="confirmDelete(minisoccer.id)">Hapus</button>
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
      minisoccers: []
    };
  },
  mounted() {
    this.fetchMinisoccers();
  },
  methods: {
    fetchMinisoccers() {
      axios.get('http://127.0.0.1:8000/api/soccer')
        .then(response => {
          this.minisoccers = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    addMiniSoccer() {
      this.$router.push({ name: 'AddMiniSoccer' });
    },
    editMinisoccer(id) {
      this.$router.push({ name: 'EditMinisoccer', params: { id: id } });
    },
    confirmDelete(id) {
      if (confirm('Apakah Anda yakin ingin menghapus lapangan mini soccer ini?')) {
        this.deleteMinisoccer(id);
      }
    },
    deleteMinisoccer(id) {
      axios.delete(`http://127.0.0.1:8000/api/soccer/${id}`)
        .then(response => {
          console.log('Lapangan mini soccer berhasil dihapus:', response.data);
          this.fetchMinisoccers();
        })
        .catch(error => {
          console.error('Error saat menghapus lapangan mini soccer:', error);
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
.minisoccer-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
}

.minisoccer-box {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;
}

.minisoccer-box:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.minisoccer-box h3 {
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #333;
}

.minisoccer-box p {
  font-size: 1rem;
  color: #666;
}

button.btn-success {
  margin-bottom: 20px;
}
</style>
