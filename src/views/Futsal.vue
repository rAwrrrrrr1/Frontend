<template>
    <div>
      <h1>Daftar Lapangan Futsal</h1>
      <div class="futsal-container">
        <div class="futsal-box" v-for="futsal in futsals" :key="futsal.id">
          <h3>{{ futsal.nama }}</h3>
          <p>Harga: {{ futsal.harga }}</p>
          <p>{{ futsal.keterangan }}</p>
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
        axios.get('http://127.0.0.1:8000/api/futsal') // Ubah URL sesuai dengan endpoint futsal Anda
          .then(response => {
            this.futsals = response.data;
          })
          .catch(error => {
            console.error(error);
          });
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
  