<template>
  <div class="flex">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Content Area -->
    <div class="wrapper d-flex flex-column min-vh-100 w-full bg-gray-100">
      <!-- Header -->
      <AppHeader />

      <!-- Main Content -->
      <main class="p-6">
        <div class="main-content">
          <!-- Header Section -->
          <div class="header-section">
            <h3><i class="cil-tags me-2"></i> Edit Kategori</h3>
          </div>

          <!-- Form Edit -->
          <div class="form-container">
            <form @submit.prevent="updateCategory">
              <!-- Nama Kategori -->
              <div class="form-group">
                <label>Nama Kategori</label>
                <input
                  v-model="name"
                  type="text"
                  placeholder="Masukkan nama kategori"
                  required
                />
              </div>

              <!-- Tombol -->
              <div class="actions">
                <button
                  type="button"
                  @click="router.push('/Kategori/Kategori')"
                  class="btn btn-light"
                >
                  Batal
                </button>
                <button type="submit" class="btn btn-dark">Update</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import axios from "axios"
import AppHeader from "@/components/AppHeader.vue"
import AppSidebar from "@/components/AppSidebar.vue"

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
.main-content {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  min-height: 80vh;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
}

.header-section h3 {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-container {
  background: #fff;
  border-radius: 10px;
  padding: 25px;
  max-width: 450px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
}

.form-group label {
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.form-group input {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
}

.form-group input:focus {
  border-color: #000;
  box-shadow: 0 0 0 1px #000;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: 0.2s;
}

.btn-light {
  background-color: #f2f2f2;
  color: #333;
}

.btn-light:hover {
  background-color: #e0e0e0;
}

.btn-dark {
  background-color: #000;
  color: #fff;
}

.btn-dark:hover {
  background-color: #333;
}
</style>
