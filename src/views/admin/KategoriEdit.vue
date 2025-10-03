
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
          class="space-y-4 max-w-md bg-white p-6 rounded shadow"
        >
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
              class="bg-gray-400 text-white px-4 py-2 rounded text-sm shadow hover:bg-gray-500"
            >
              Batal
            </button>
            <button
              type="submit"
              class="bg-black text-white px-4 py-2 rounded text-sm shadow hover:bg-gray-800"
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
    router.push("/admin/Kategori")
  } catch (err) {
    console.error(err)
    alert("❌ Gagal memperbarui kategori")
  }
}

onMounted(() => {
  getCategory()
})
</script>
