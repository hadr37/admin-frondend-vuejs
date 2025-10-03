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
    router.push("/admin/Kategori")
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
        <label class="block mb-1 font-medium">Nama Kategori</label>
        <input
          v-model="name"
          type="text"
          required
          placeholder="Masukkan nama kategori"
          class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-gray-500 focus:outline-none"
        />
      </div>

      <div class="flex gap-2">
        <button
          type="button"
          @click="router.push('/admin/Kategori')"
          class="bg-black text-white px-4 py-2 rounded text-sm shadow hover:bg-gray-800"
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
