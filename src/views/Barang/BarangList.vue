<script setup>
import { ref, onMounted, computed } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

const barang = ref([])
const categories = ref([])
const router = useRouter()

const API_URL = "http://localhost:8000/api/barang"
const CAT_URL = "http://localhost:8000/api/categories"

// Pencarian & filter
const searchQuery = ref("")
const selectedCategory = ref("")

// Ambil data barang
const getBarang = async () => {
  try {
    const res = await axios.get(API_URL)
    barang.value = res.data
  } catch (err) {
    console.error(err)
  }
}

// Ambil kategori
const getCategories = async () => {
  try {
    const res = await axios.get(CAT_URL)
    categories.value = res.data
  } catch (err) {
    console.error(err)
  }
}

// Hapus barang
const deleteBarang = async (id) => {
  if (!confirm("Yakin hapus barang ini?")) return
  try {
    await axios.delete(`${API_URL}/${id}`)
    getBarang()
  } catch (error) {
    console.error(error)
  }
}

// Filter barang berdasarkan pencarian & kategori
const filteredBarang = computed(() => {
  return barang.value.filter((b) => {
    const matchName = b.nama_barang
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
    const matchCategory = selectedCategory.value
      ? b.kategori?.id === selectedCategory.value
      : true
    return matchName && matchCategory
  })
})

onMounted(() => {
  getBarang()
  getCategories()
})
</script>

<template>
  <div class="flex">
    <main class="p-6 w-full">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold text-gray-800">
          <i class="fas fa-box mr-2"></i> Daftar Barang
        </h3>
        <button
          @click="router.push('/Barang/barangadd')"
          class="bg-black text-white px-4 py-2 rounded shadow hover:bg-gray-800 text-sm"
        >
          <i class="fas fa-plus"></i> Tambah Barang
        </button>
      </div>

      <!-- Filter & Pencarian (versi Flexbox, tanpa <table>) -->
      <div class="flex mb-4 gap-4">
        <!-- Kolom kiri: Search -->
        <div class="flex items-center w-1/2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari barang..."
            class="border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 flex-grow"
          />
          <button
            class="bg-black text-white px-4 py-2 rounded-r hover:bg-gray-800"
          >
            <i class="fas fa-search"></i>
          </button>
        </div>

        <!-- Kolom kanan: Dropdown kategori -->
        <div class="w-1/2">
          <select
            v-model="selectedCategory"
            class="border border-gray-300 rounded px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="">Semua Kategori</option>
            <option v-for="c in categories" :key="c.id" :value="c.id">
              {{ c.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Tabel Barang -->
      <table class="w-full border border-gray-300 text-sm text-gray-800">
        <thead class="bg-gray-200 text-gray-900">
          <tr>
            <th class="px-4 py-2">Kode</th>
            <th class="px-4 py-2">Nama</th>
            <th class="px-4 py-2">Kategori</th>
            <th class="px-4 py-2">Deskripsi</th>
            <th class="px-4 py-2">Harga</th>
            <th class="px-4 py-2">Stok</th>
            <th class="px-4 py-2">Gambar</th>
            <th class="px-4 py-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="b in filteredBarang"
            :key="b.id"
            class="border-b hover:bg-gray-100"
          >
            <td class="px-4 py-2">{{ b.kode_barang }}</td>
            <td class="px-4 py-2">{{ b.nama_barang }}</td>
            <td class="px-4 py-2">{{ b.kategori?.name }}</td>
            <td class="px-4 py-2 w-64 truncate">{{ b.deskripsi }}</td>
            <td class="px-4 py-2">Rp {{ b.harga }}</td>
            <td class="px-4 py-2">{{ b.stok }}</td>
            <td class="px-4 py-2">
              <img
                v-if="b.gambar"
                :src="`http://localhost:8000/storage/${b.gambar}`"
                class="custom-small-img"
              />
            </td>
            <td class="px-4 py-2 text-center">
              <button
                @click="router.push(`/Barang/Barang/Edit/${b.id}`)"
                class="bg-black text-white px-3 py-1 rounded text-xs hover:bg-gray-800 mr-2"
              >
                Edit
              </button>
              <button
                @click="deleteBarang(b.id)"
                class="bg-black text-white px-3 py-1 rounded text-xs hover:bg-gray-800"
              >
                Hapus
              </button>
            </td>
          </tr>
          <tr v-if="filteredBarang.length === 0">
            <td colspan="8" class="px-4 py-6 text-center text-gray-500">
              Tidak ada barang 🙏
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<style scoped>
.custom-small-img {
  height: 90px;
  width: auto;
  border-radius: 0.25rem;
  border: 1px solid #e5e7eb;
}
</style>
