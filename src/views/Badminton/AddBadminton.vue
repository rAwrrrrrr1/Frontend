<template>
    <div>
      <h1>Tambah Lapangan Badminton</h1>
      <form @submit.prevent="submitForm" enctype="multipart/form-data">
        <div class="form-group">
          <label for="nama">Nama Lapangan</label>
          <input type="text" id="nama" v-model="form.nama" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="harga">Harga</label>
          <input type="number" id="harga" v-model="form.harga" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="keterangan">Keterangan</label>
          <textarea id="keterangan" v-model="form.keterangan" class="form-control" required></textarea>
        </div>
        <div class="form-group">
          <label for="gambar">Gambar</label>
          <input type="file" id="gambar" @change="handleFileUpload" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-success">Simpan</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        form: {
          nama: '',
          harga: '',
          keterangan: '',
          gambar: null
        }
      };
    },
    methods: {
      handleFileUpload(event) {
        this.form.gambar = event.target.files[0];
      },
      submitForm() {
        let formData = new FormData();
        formData.append('nama', this.form.nama);
        formData.append('harga', this.form.harga);
        formData.append('keterangan', this.form.keterangan);
        formData.append('gambar', this.form.gambar);
  
        axios.post('http://127.0.0.1:8000/api/badminton', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log('Lapangan badminton berhasil ditambahkan:', response.data);
          this.$router.push({ name: 'badminton' }); // Navigate back to the list page
        })
        .catch(error => {
          console.error('Error saat menambahkan lapangan badminton:', error);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  
  button.btn-success {
    margin-top: 20px;
  }
  </style>
  