<template>
    <div class="not-found">
      <h1>404</h1>
      <h2>Halaman Tidak Ditemukan</h2>
      <router-link to="/login" class="btn-home">Kembali ke Login</router-link>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    background-color: #f8f9fa;
    color: #333;
  }
  
  h1 {
    font-size: 100px;
    margin: 0;
  }
  
  h2 {
    font-size: 24px;
    margin: 10px 0 20px;
  }
  
  .btn-home {
    text-decoration: none;
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    transition: 0.3s;
  }
  
  .btn-home:hover {
    background-color: #0056b3;
  }
  </style>
  