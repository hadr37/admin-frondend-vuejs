<script setup>
import { ref } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

const name = ref("")
const router = useRouter()
const API_URL = "http://localhost:8000/api/categories"

const saveCategory = async () => {
  try {
    await axios.post(API_URL, { name: name.value })
    alert("✅ Kategori berhasil ditambahkan")
    router.push("/Kategori/Kategori")
  } catch (error) {
    console.error(error)
    alert("❌ Gagal menambah kategori")
  }
}
</script>

<template>
  <div class="p-6 min-h-screen">
    <h3 class="text-xl font-bold text-gray-800 mb-4">
      <i class="fas fa-plus-circle mr-2"></i> Tambah Kategori
    </h3>

    <form @submit.prevent="saveCategory" class="space-y-4 max-w-md text-gray-800">
      <div>
        <label class="block text-sm font-medium text-gray-700">Nama Kategori</label>
        <input
          v-model="name"
          type="text"
          placeholder="Masukkan nama kategori"
          class="form-control"
          required
        />
      </div>

      <div class="flex gap-2">
        <button
          type="button"
          @click="router.push('/Kategori/Kategori')"
          class="bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm shadow hover:bg-gray-300"
        >
          Batal
        </button>
        <button
          type="submit"
          class="bg-black text-white px-4 py-2 rounded text-sm shadow hover:bg-gray-800"
        >
          Simpan
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-control {
  width: 100%;
  border: 1px solid #d1d5db; /* abu-abu */
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  outline: none;
  transition: 0.2s;
}
.form-control:focus {
  border-color: black;
  box-shadow: 0 0 0 1px black;
}
</style>
