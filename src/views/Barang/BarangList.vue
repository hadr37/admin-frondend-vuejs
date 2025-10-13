<script setup>
import { ref, onMounted, computed } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

const barang = ref([])
const categories = ref([])
const searchQuery = ref("")
const selectedCategory = ref("")
const router = useRouter()

const API_URL = "http://localhost:8000/api/barang"
const CAT_URL = "http://localhost:8000/api/categories"

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
      ? b.kategori_id == selectedCategory.value
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
  <div class="main-content">
    <!-- Header -->
    <div class="header-section">
      <h3><i class="fas fa-box mr-2"></i> Daftar Barang</h3>

      <div class="actions">
        <button @click="router.push('/Barang/barangadd')" class="btn btn-dark">
          <i class="fas fa-plus"></i> Tambah
        </button>

        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari barang..."
          />
          <button>
            <i class="fas fa-search"></i>
          </button>
        </div>

        <select v-model="selectedCategory" class="filter-select">
          <option value="">Semua Kategori</option>
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Tabel Barang -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Kode</th>
            <th>Nama</th>
            <th>Kategori</th>
            <th>Deskripsi</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Gambar</th>
            <th class="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="b in filteredBarang"
            :key="b.id"
          >
            <td>{{ b.kode_barang }}</td>
            <td>{{ b.nama_barang }}</td>
            <td>{{ b.kategori?.name }}</td>
            <td class="truncate-2">{{ b.deskripsi }}</td>
            <td>Rp {{ b.harga }}</td>
            <td>{{ b.stok }}</td>
            <td>
              <img
                v-if="b.gambar"
                :src="`http://localhost:8000/storage/${b.gambar}`"
                class="gambar"
              />
            </td>
            <td class="text-center">
              <button
                @click="router.push(`/Barang/Barang/Edit/${b.id}`)"
                class="btn btn-sm btn-dark me-2"
              >
                Edit
              </button>
              <button
                @click="deleteBarang(b.id)"
                class="btn btn-sm btn-danger"
              >
                Hapus
              </button>
            </td>
          </tr>

          <tr v-if="filteredBarang.length === 0">
            <td colspan="8" class="text-center text-gray">
              Tidak ada barang 🙏
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.main-content {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  min-height: 100vh;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.header-section h3 {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 14px;
}

.btn-dark {
  background-color: #000;
  color: #fff;
}

.btn-dark:hover {
  background-color: #333;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.filter-select {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 6px 10px;
  font-size: 14px;
  outline: none;
}

.search-box {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.search-box input {
  border: none;
  padding: 6px 10px;
  outline: none;
  font-size: 14px;
}

.search-box button {
  background: none;
  border: none;
  padding: 6px 8px;
  cursor: pointer;
  color: #666;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

thead {
  background: #f5f5f5;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  vertical-align: middle;
}

.text-center {
  text-align: center;
}

.text-gray {
  color: #888;
}

.gambar {
  height: 70px;
  width: auto;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
