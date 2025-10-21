<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import { useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()

const form = ref({
  judul: "",
  slug: "",
  isi: "",
  cover: null,
})
const preview = ref(null)

const API_URL = "http://localhost:8000/api/artikel"

// Ambil data artikel
const getArticle = async () => {
  try {
    const res = await axios.get(`${API_URL}/${route.params.slug}`)
    form.value = {
      judul: res.data.judul,
      slug: res.data.slug,
      isi: res.data.isi,
      cover: null,
    }
    preview.value = `http://localhost:8000/storage/${res.data.cover}`
  } catch (error) {
    console.error(error)
  }
}

// Otomatis update slug dari judul
const generateSlug = () => {
  form.value.slug = form.value.judul
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

// Upload file baru
const handleFile = (e) => {
  const file = e.target.files[0]
  if (file && file.size > 10 * 1024 * 1024) {
    alert("Ukuran gambar maksimal 10MB!")
    e.target.value = ""
    return
  }
  form.value.cover = file
  preview.value = URL.createObjectURL(file)
}

// Update artikel
const updateArticle = async () => {
  try {
    const formData = new FormData()
    for (const key in form.value) {
      formData.append(key, form.value[key])
    }

    await axios.post(`${API_URL}/${route.params.slug}?_method=PUT`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    alert("Artikel berhasil diperbarui!")
    router.push("/article/list")
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => getArticle())
</script>

<template>
  <div class="edit-container">
    <h3><i class="fas fa-edit mr-2"></i> Edit Artikel</h3>

    <form @submit.prevent="updateArticle" class="form-box">
      <div class="form-group">
        <label>Judul Artikel</label>
        <input v-model="form.judul" type="text" @input="generateSlug" required />
      </div>

      <div class="form-group">
        <label>Slug</label>
        <input v-model="form.slug" type="text" readonly />
      </div>

      <div class="form-group">
        <label>Isi Artikel</label>
        <textarea v-model="form.isi" rows="6"></textarea>
      </div>

      <div class="form-group">
        <label>Cover</label>
        <input type="file" accept="image/*" @change="handleFile" />
        <div v-if="preview" class="preview">
          <img :src="preview" />
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-dark">Perbarui</button>
        <button type="button" @click="router.push('/article/artikel')" class="btn btn-secondary">
          Batal
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.edit-container {
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  min-height: 100vh;
}

h3 {
  margin-bottom: 20px;
  font-weight: bold;
}

.form-box {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: 600;
}

input,
textarea {
  border: 1px solid #ccc;
  padding: 8px 10px;
  border-radius: 5px;
  font-size: 14px;
}

textarea {
  resize: vertical;
}

.preview img {
  width: 150px;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn-dark {
  background: #000;
  color: #fff;
}
.btn-dark:hover {
  background: #333;
}

.btn-secondary {
  background: #ccc;
  color: #000;
}
.btn-secondary:hover {
  background: #b5b5b5;
}
</style>
