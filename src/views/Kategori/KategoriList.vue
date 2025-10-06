<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

const categories = ref([])
const router = useRouter()
const API_URL = "http://localhost:8000/api/categories"

const getCategories = async () => {
  try {
    let res = await axios.get(API_URL)
    categories.value = res.data
  } catch (error) {
    console.error(error)
  }
}

const deleteCategory = async (id) => {
  if (!confirm("Yakin hapus kategori ini?")) return
  try {
    await axios.delete(`${API_URL}/${id}`)
    getCategories()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getCategories()
})
</script>

<template>
  <div class="p-6 min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold text-gray-800">
        <i class="fas fa-list mr-2"></i> Daftar Kategori
      </h3>
      <button
        @click="router.push('/Kategori/KategoriAdd')"
        class="bg-black text-white px-4 py-2 rounded shadow hover:bg-gray-800 text-sm"
      >
        <i class="fas fa-plus"></i> Tambah
      </button>
    </div>

    <!-- Tabel -->
    <table class="w-full border border-gray-300 text-sm text-gray-800">
      <thead class="bg-gray-200 text-gray-900">
        <tr>
          <th class="px-4 py-2 text-left">Nomer</th>
          <th class="px-4 py-2 text-left">Nama Kategori</th>
          <th class="px-4 py-2 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(cat, index) in categories"
          :key="cat.id"
          class="border-b hover:bg-gray-100"
        >
          <td class="px-4 py-2">{{ index + 1 }}</td>
          <td class="px-4 py-2">{{ cat.name }}</td>
          <td class="px-4 py-2 text-center">
            <div class="flex justify-center gap-2">
<button
  @click="router.push(`/Kategori/KategoriEdit/${cat.id}`)"
  class="bg-black text-white px-3 py-1 rounded mr-2 hover:bg-gray-800"
>
  Edit
</button>

              <button
                @click="deleteCategory(cat.id)"
                class="bg-black text-white px-3 py-1 rounded text-xs shadow hover:bg-gray-800"
              >
                <i class="fas fa-trash"></i> Hapus
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="categories.length === 0">
          <td colspan="3" class="px-4 py-6 text-center text-gray-500">
            Belum ada kategori 🙏
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
