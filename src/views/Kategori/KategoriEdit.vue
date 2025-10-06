<template>
  <div class="flex">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Content Area -->
    <div class="wrapper d-flex flex-column min-vh-100">
      <!-- Header -->
      <AppHeader />

      <!-- Main Content -->
      <main class="p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">
          <i class="fas fa-edit mr-2"></i> Edit Kategori
        </h3>

        <form
          @submit.prevent="updateCategory"
          class="space-y-4 max-w-md bg-white p-6 rounded-xl shadow-md"
        >
          <!-- Nama Kategori -->
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

          <!-- Tombol -->
          <div class="flex gap-2 pt-4">
            <button
              type="button"
              @click="router.push('/Kategori/Kategori')"
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm shadow"
            >
              Batal
            </button>
            <button
              type="submit"
              class="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded text-sm shadow"
            >
              Update
            </button>
          </div>
        </form>
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
    let res = await axios.get(`${API_URL}/${route.params.id}`)
    name.value = res.data.name
  } catch (err) {
    console.error(err)
    alert("❌ Gagal mengambil data kategori")
  }
}

const updateCategory = async () => {
  try {
    await axios.put(`${API_URL}/${route.params.id}`, { name: name.value })
    alert("✅ Kategori berhasil diperbarui")
    router.push("/Kategori/Kategori")
  } catch (err) {
    console.error(err)
    alert("❌ Gagal memperbarui kategori")
  }
}

onMounted(() => {
  getCategory()
})
</script>

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
