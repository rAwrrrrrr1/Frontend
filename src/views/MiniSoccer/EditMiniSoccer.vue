<template>
    <div>
      <h1>Edit Data Lapangan Mini Soccer</h1>
      <!-- Tombol kembali ke halaman sebelumnya -->
      <button class="back-button" @click="goBack">&#8592; Kembali</button>
      
      <form @submit.prevent="updateMiniSoccer">
        <label for="nama">Nama Lapangan:</label>
        <input type="text" id="nama" v-model="editedMiniSoccer.nama" required>
        
        <label for="harga">Harga:</label>
        <input type="number" id="harga" v-model="editedMiniSoccer.harga" required>
        
        <label for="keterangan">Keterangan:</label>
        <textarea id="keterangan" v-model="editedMiniSoccer.keterangan" required></textarea>
        
        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        editedMiniSoccer: {
          id: null,
          nama: '',
          harga: null,
          keterangan: ''
        }
      };
    },
    mounted() {
      const id = this.$route.params.id;
      this.fetchMiniSoccer(id);
    },
    methods: {
      fetchMiniSoccer(id) {
        axios.get(`http://127.0.0.1:8000/api/soccer/${id}`)
          .then(response => {
            this.editedMiniSoccer = response.data.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      updateMiniSoccer() {
        axios.put(`http://127.0.0.1:8000/api/soccer/${this.editedMiniSoccer.id}`, this.editedMiniSoccer)
          .then(response => {
            console.log('Data berhasil diperbarui:', response.data);
            // Redirect atau navigasi ke halaman lain setelah perubahan disimpan
            this.$router.push('/minisoccer');
          })
          .catch(error => {
            console.error(error);
          });
      },
      goBack() {
        this.$router.go(-1); // Kembali ke halaman sebelumnya
      }
    }
  }
  </script>
  
  <style scoped>
  label {
    display: block;
    margin-bottom: 10px;
  }
  
  input[type="text"],
  input[type="number"],
  textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .back-button {
    background-color: transparent;
    border: 1px solid #007bff;
    color: #007bff;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .back-button:hover {
    background-color: #007bff;
    color: white;
  }
  </style>
  