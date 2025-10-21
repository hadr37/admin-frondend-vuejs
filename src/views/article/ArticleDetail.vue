<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import axios from "axios"

const route = useRoute()
const router = useRouter()

const artikel = ref(null)
const API_URL = "http://localhost:8000/api/artikel"

const getArtikel = async () => {
  try {
    const res = await axios.get(`${API_URL}/${route.params.slug}`)
    artikel.value = res.data
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => getArtikel())
</script>

<template>
  <div class="detail-container" v-if="artikel">
    <button @click="router.push('/article/artikel')" class="btn btn-secondary mb-3">
      <i class="fas fa-arrow-left"></i> Kembali
    </button>

    <h2 class="title">{{ artikel.judul }}</h2>
    <p class="slug">Slug: {{ artikel.slug }}</p>

    <div v-if="artikel.cover" class="cover">
      <img :src="`http://localhost:8000/storage/${artikel.cover}`" alt="Cover" />
    </div>

    <div class="content" v-html="artikel.isi"></div>
  </div>

  <div v-else class="loading">Memuat artikel...</div>
</template>

<style scoped>
.detail-container {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  min-height: 100vh;
}

.title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 5px;
}

.slug {
  color: #777;
  margin-bottom: 15px;
}

.cover img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
}

.content {
  line-height: 1.7;
  font-size: 16px;
  color: #333;
}

.btn {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn-secondary {
  background: #ccc;
  color: #000;
}
.btn-secondary:hover {
  background: #b5b5b5;
}
.loading {
  text-align: center;
  padding: 50px;
  color: #888;
}
</style>
