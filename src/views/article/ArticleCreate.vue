<template>
  <div class="create-container">
    <h3><i class="fas fa-plus-circle mr-2"></i> Tambah Artikel</h3>

    <form @submit.prevent="submitForm" class="form-box">
     
      <div class="form-group">
        <label>Judul Artikel</label>
        <input
          v-model="form.judul"
          type="text"
          placeholder="Masukkan judul artikel"
          @input="generateSlug"
          required
        />
      </div>

     
      <div class="form-group">
        <label>Slug</label>
        <input
          v-model="form.slug"
          type="text"
          placeholder="slug-otomatis-dari-judul"
          readonly
        />
      </div>

      <!-- Isi Artikel -->
      <div class="form-group">
        <label>Isi Artikel</label>
        <QuillEditor
          v-model:content="form.isi"
          content-type="html"
          theme="snow"
          class="quill-editor"
        />
      </div>

      <!-- Cover -->
      <div class="form-group">
        <label>Cover (max 10MB)</label>
        <input type="file" accept="image/*" @change="handleFile" />
      </div>

      <!-- Tombol -->
      <div class="form-actions">
        <button type="submit" class="btn btn-dark">Simpan</button>
        <button
          type="button"
          @click="router.push('/article/artikel')"
          class="btn btn-secondary"
        >
          Batal
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import { QuillEditor } from "@vueup/vue-quill"
import "@vueup/vue-quill/dist/vue-quill.snow.css"

const router = useRouter()

const form = ref({
  judul: "",
  slug: "",
  isi: "",
  cover: null,
})

const API_URL = "http://localhost:8000/api/artikel"

// Otomatis buat slug dari judul
const generateSlug = () => {
  form.value.slug = form.value.judul
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

// Handle file upload
const handleFile = (e) => {
  const file = e.target.files[0]
  if (file && file.size > 10 * 1024 * 1024) {
    alert("Ukuran gambar maksimal 10MB!")
    e.target.value = ""
    return
  }
  form.value.cover = file
}

// Kirim data ke backend
const submitForm = async () => {
  try {
    const formData = new FormData()
    for (const key in form.value) {
      formData.append(key, form.value[key])
    }

    await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    alert("Artikel berhasil ditambahkan!")
    router.push("/article/artikel")
  } catch (error) {
    console.error(error)
    alert("Gagal menyimpan artikel!")
  }
}
</script>

<style scoped>
.create-container {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  min-height: 100vh;
  max-width: 900px;
  margin: 0 auto;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 22px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-box {
  display: flex;
  flex-direction: column;
  gap: 18px;
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
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 14px;
}

input:focus,
textarea:focus {
  border-color: #4c6ef5;
  outline: none;
}

.quill-editor {
  background: #fff;
  border-radius: 8px;
  height: 300px;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 15px;
}

.btn {
  padding: 10px 16px;
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
