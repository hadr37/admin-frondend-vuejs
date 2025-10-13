<script setup>
import { ref, onMounted, watch } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

const categories = ref([])
const allCategories = ref([])
const searchQuery = ref("")
const router = useRouter()
const API_URL = "http://localhost:8000/api/categories"

const getCategories = async () => {
  try {
    const res = await axios.get(API_URL)
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

watch(searchQuery, (val) => {
  if (val === "") categories.value = allCategories.value
})

onMounted(() => getCategories())
</script>

<template>
  <div class="main-content">
    <div class="header-section">
      <h3><i class="fas fa-list mr-2"></i> Daftar Kategori</h3>

      <div class="actions">
        <button @click="router.push('/Kategori/KategoriAdd')" class="btn btn-dark">
          <i class="fas fa-plus"></i> Tambah
        </button>

        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari kategori..."
          />
          <button @click="searchCategory">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Tabel -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Nomer</th>
            <th>Nama Kategori</th>
            <th class="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cat, index) in categories" :key="cat.id">
            <td>{{ index + 1 }}</td>
            <td>{{ cat.name }}</td>
            <td class="text-center">
              <button
                @click="router.push(`/Kategori/KategoriEdit/${cat.id}`)"
                class="btn btn-sm btn-dark me-2"
              >
                Edit
              </button>
              <button
                @click="deleteCategory(cat.id)"
                class="btn btn-sm btn-danger"
              >
                Hapus
              </button>
            </td>
          </tr>

          <tr v-if="categories.length === 0">
            <td colspan="3" class="text-center text-gray">Belum ada kategori 🙏</td>
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
}

.text-center {
  text-align: center;
}

.text-gray {
  color: #888;
}
</style>
