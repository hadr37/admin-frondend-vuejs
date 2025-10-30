<template>
  <div class="flex">
    <main class="p-6 w-full">
      <!-- Header -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-800">Edit Kategori</h3>
        <p class="text-sm text-gray-500">Perbarui informasi kategori sesuai kebutuhan</p>
      </div>
      <!-- Form -->
      <form @submit.prevent="updateCategory" class="space-y-4 max-w-md mx-auto pb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Kategori</label>
          <input v-model="name" type="text" placeholder="Masukkan nama kategori" required class="form-control" />
        </div>
        <!-- Tombol -->
        <div class="flex gap-2 pt-4 justify-end">
          <button type="button" @click="router.push('/Kategori/Kategori')" class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm">
            Batal
          </button>
          <button type="submit" class="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded text-sm">
            Update
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import axios from "axios"

const route = useRoute()
const router = useRouter()
const name = ref("")
const API_URL = "http://localhost:8000/api/categories"

const getCategory = async () => {
  try {
    const res = await axios.get(`${API_URL}/${route.params.id}`)
    name.value = res.data.name
  } catch (error) {
    console.error(error)
    alert("❌ Gagal mengambil data kategori")
  }
}

const updateCategory = async () => {
  try {
    await axios.put(`${API_URL}/${route.params.id}`, { name: name.value })
    alert("✅ Kategori berhasil diperbarui")
    router.push("/Kategori/Kategori")
  } catch (error) {
    console.error(error)
    alert("❌ Gagal memperbarui kategori")
  }
}

onMounted(() => getCategory())
</script>

<style scoped>
.form-control {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  outline: none;
}
.form-control:focus {
  border-color: black;
  box-shadow: 0 0 0 1px black;
}
</style>
