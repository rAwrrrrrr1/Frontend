<template>
    <div>
      <h1>Daftar Lapangan Mini Soccer</h1>
      <div class="mini-soccer-container">
        <div class="mini-soccer-box" v-for="miniSoccer in miniSoccers" :key="miniSoccer.id">
          <h3>{{ miniSoccer.nama }}</h3>
          <p>Harga: {{ miniSoccer.harga }}</p>
          <p>{{ miniSoccer.keterangan }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        miniSoccers: []
      };
    },
    mounted() {
      this.fetchMiniSoccers();
    },
    methods: {
      fetchMiniSoccers() {
        axios.get('http://127.0.0.1:8000/api/soccer') // Ubah URL sesuai dengan endpoint mini-soccer Anda
          .then(response => {
            this.miniSoccers = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }
  </script>
  
  <style scoped>
  .mini-soccer-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 20px;
  }
  
  .mini-soccer-box {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    padding: 20px;
    text-align: center;
    transition: transform 0.3s ease;
  }
  
  .mini-soccer-box:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .mini-soccer-box h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
    color: #333;
  }
  
  .mini-soccer-box p {
    font-size: 1rem;
    color: #666;
  }
  </style>
  