<template>
  <div>
    <h1>Daftar Lapangan Badminton</h1>
    <button type="button" class="btn btn-success" @click="addBadminton">Tambah Lapangan</button>
    <div class="badminton-container">
      <div class="badminton-box" v-for="badminton in badmintons" :key="badminton.id">
        <h3>{{ badminton.nama }}</h3>
        <p>Harga: {{ formatCurrency(badminton.harga) }}</p>
        <p>{{ badminton.keterangan }}</p>
        <img :src="`http://172.20.10.5:8000/storage/${(badminton.gambar).substring(7)}`" 
          alt="Gambar Lapangan" width="200px" height="auto" style="margin-bottom: 16px">
        <div>
          <button type="button" class="btn btn-primary" @click="editBadminton(badminton.id)">Edit</button>
          &nbsp;
          <button type="button" class="btn btn-danger" @click="confirmDelete(badminton.id)">Hapus</button>
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
      badmintons: []
    };
  },
  mounted() {
    this.fetchBadmintons();
  },
  methods: {
    fetchBadmintons() {
      axios.get('http://172.20.10.5:8000/api/badminton')
        .then(response => {
          this.badmintons = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    addBadminton() {
      this.$router.push({ name: 'AddBadminton' });
    },
    editBadminton(id) {
      this.$router.push({ name: 'EditBadminton', params: { id: id } });
    },
    confirmDelete(id) {
      if (confirm('Apakah Anda yakin ingin menghapus lapangan badminton ini?')) {
        this.deleteBadminton(id);
      }
    },

    deleteBadminton(id) {
      axios.delete(`http://172.20.10.5:8000/api/badminton/${id}`)
        .then(response => {
          console.log('Lapangan badminton berhasil dihapus:', response.data);
          this.fetchBadmintons();
        })
        .catch(error => {
          console.error('Error saat menghapus lapangan badminton:', error);
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
.badminton-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
}

.badminton-box {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;
}

.badminton-box:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.badminton-box h3 {
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #333;
}

.badminton-box p {
  font-size: 1rem;
  color: #666;
}

button.btn-success {
  margin-bottom: 20px;
}
</style>