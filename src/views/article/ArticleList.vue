<script setup>
import { ref, onMounted, computed } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

const router = useRouter()
const articles = ref([])
const searchQuery = ref("")

const API_URL = "http://localhost:8000/api/artikel"

// Ambil data artikel
const getArticles = async () => {
  try {
    const res = await axios.get(API_URL)
    articles.value = res.data
  } catch (err) {
    console.error(err)
  }
}

// Hapus artikel berdasarkan slug
const deleteArticle = async (slug) => {
  if (!confirm("Yakin ingin menghapus artikel ini?")) return
  try {
    await axios.delete(`${API_URL}/${slug}`)
    getArticles()
    alert("✅ Artikel berhasil dihapus")
  } catch (error) {
    console.error(error)
    alert("❌ Gagal menghapus artikel")
  }
}

// Filter artikel
const filteredArticles = computed(() => {
  return articles.value.filter((a) =>
    a.judul.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

onMounted(() => getArticles())
</script>

<template>
  <div class="main-content">
    <div class="header-section">
      <h3><i class="fas fa-newspaper mr-2"></i> Daftar Artikel</h3>

      <div class="actions">
        <button @click="router.push('/article/artikel/tambah')" class="btn btn-dark">
          <i class="fas fa-plus"></i> Tambah
        </button>

        <div class="search-box">
          <input v-model="searchQuery" type="text" placeholder="Cari artikel..." />
          <button><i class="fas fa-search"></i></button>
        </div>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Cover</th>
            <th>Judul</th>
            <th>Tanggal</th>
            <th class="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in filteredArticles" :key="a.slug">
            <td>
              <img
                v-if="a.cover"
                :src="`http://localhost:8000/storage/${a.cover}`"
                class="gambar"
              />
            </td>
            <td>{{ a.judul }}</td>
            <td>{{ a.created_at ? new Date(a.created_at).toLocaleDateString() : '-' }}</td>
            <td class="text-center">
              <div class="btn-group">
                <!-- Lihat detail -->
                <button
                  class="btn btn-view"
                  title="Lihat Artikel"
                  @click="router.push(`/article/artikel/${a.slug}`)"
                >
                  <i class="fas fa-eye"></i>
                </button>

                <!-- Edit -->
                <button
                  class="btn btn-edit"
                  title="Edit Artikel"
                  @click="router.push(`/article/artikel/edit/${a.slug}`)"
                >
                  <i class="fas fa-edit"></i>
                </button>

                <!-- Hapus -->
                <button
                  class="btn btn-delete"
                  title="Hapus Artikel"
                  @click="deleteArticle(a.slug)"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="filteredArticles.length === 0">
            <td colspan="5" class="text-center text-gray">Tidak ada artikel 🙏</td>
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

/* ===== Header ===== */
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

/* ===== Actions ===== */
.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.btn {
  border: none;
  border-radius: 5px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
}
.btn-dark {
  background: #000;
  color: #fff;
}
.btn-dark:hover {
  background: #333;
}

/* ===== Search ===== */
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

/* ===== Table ===== */
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
th,
td {
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
  border-radius: 4px;
  border: 1px solid #ddd;
}

/* ===== Button Group ===== */
.btn-group {
  display: flex;
  justify-content: center;
  gap: 8px;
}
.btn-view {
  background: #007bff;
  color: white;
}
.btn-view:hover {
  background: #0069d9;
}
.btn-edit {
  background: #ffc107;
  color: #000;
}
.btn-edit:hover {
  background: #e0a800;
}
.btn-delete {
  background: #dc3545;
  color: white;
}
.btn-delete:hover {
  background: #c82333;
}
</style>
