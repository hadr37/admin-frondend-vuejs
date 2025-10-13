<script setup>
import { ref, onMounted, watch } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

const categories = ref([])
const allCategories = ref([]) // simpan semua data asli
const searchQuery = ref("")
const router = useRouter()
const API_URL = "http://localhost:8000/api/categories"

const getCategories = async () => {
  try {
    let res = await axios.get(API_URL)
    categories.value = res.data
    allCategories.value = res.data
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

const searchCategory = () => {
  if (searchQuery.value.trim() === "") {
    categories.value = allCategories.value
  } else {
    categories.value = allCategories.value.filter((cat) =>
      cat.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
}

// auto reset kalau input dihapus
watch(searchQuery, (val) => {
  if (val === "") {
    categories.value = allCategories.value
  }
})

onMounted(() => {
  getCategories()
})
</script>

<template>
  <div class="p-6 min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4 flex-wrap gap-3">
      <h3 class="text-xl font-bold text-gray-800">
        <i class="fas fa-list mr-2"></i> Daftar Kategori
      </h3>

      <!-- Bagian kanan (Tombol + Search) -->
      <div class="flex gap-3 items-center flex-wrap">
        <!-- Tombol Tambah -->
        <button
          @click="router.push('/Kategori/KategoriAdd')"
          class="bg-black text-white px-4 py-2 rounded shadow hover:bg-gray-800 text-sm"
        >
          <i class="fas fa-plus"></i> Tambah
        </button>

        <!-- Search Box -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari kategori..."
            class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            @click="searchCategory"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
          >
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
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
