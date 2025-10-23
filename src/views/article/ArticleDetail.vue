<template>
  <div class="artikel-admin-detail" v-if="artikel">
    <div class="container">

      <button @click="router.push('/article/artikel')" class="btn-back">
        <i class="fas fa-arrow-left"></i> Kembali ke Daftar Artikel
      </button>

      <h2 class="title">{{ artikel.judul }}</h2>
      <p class="slug">Slug: {{ artikel.slug }}</p>
      <p class="date">Tanggal dibuat: {{ formatDate(artikel.created_at) }}</p>

  
      <div v-if="artikel.cover" class="cover">
        <img
          :src="`http://localhost:8000/storage/${artikel.cover}`"
          alt="Cover Artikel"
        />
      </div>


      <div class="content" v-html="artikel.isi"></div>
    </div>
  </div>

  <div v-else class="loading">Memuat artikel...</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const artikel = ref(null);
const API_URL = "http://localhost:8000/api/artikel";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const getArtikel = async () => {
  try {
    const res = await axios.get(`${API_URL}/${route.params.slug}`);
    artikel.value = res.data;
  } catch (err) {
    console.error("Gagal memuat artikel:", err);
  }
};

onMounted(() => getArtikel());
</script>

<style>

.container {
  max-width: 900px;
  margin: 0 auto;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
}


.btn-back {
  background: #6c757d;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 20px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background 0.3s;
}
.btn-back:hover {
  background: #5a6268;
}


.title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #222;
  margin-bottom: 8px;
}

.slug {
  color: #888;
  margin-bottom: 5px;
}

.date {
  color: #777;
  margin-bottom: 20px;
  font-size: 0.95rem;
}

/* === Gambar Cover === */
.cover img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 25px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

/* === Isi Artikel === */
.content {
  line-height: 1.8;
  font-size: 1rem;
  color: #333;
  word-wrap: break-word;
}

.content p {
  margin-bottom: 1rem;
}

.content strong {
  font-weight: bold;
  color: #000;
}

.content em {
  font-style: italic;
}

.content u {
  text-decoration: underline;
}

.content ul,
.content ol {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.content li {
  margin-bottom: 0.4rem;
}

.content a {
  color: #4c6ef5;
  text-decoration: underline;
}
.content a:hover {
  color: #c89c36;
}


.content :deep(img) {
  display: block !important;
  margin: 0 auto 1rem 0 !important; 
  width: 200px !important;          
  height: auto !important;
  border-radius: 10px !important;
  object-fit: cover !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}


.content p {
  clear: both;
  text-align: justify;
  line-height: 1.8;
  color: #444;
  margin-bottom: 1rem;
}


@media (max-width: 768px) {
  .content :deep(img) {
    width: 100% !important;
    max-width: 250px !important;
    margin: 0 auto 1rem auto !important;
  }
}

/* === Loading === */
.loading {
  text-align: center;
  padding: 60px;
  font-size: 1.1rem;
  color: #777;
}
</style>
