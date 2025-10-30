<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"
import { QuillEditor } from "@vueup/vue-quill"
import "@vueup/vue-quill/dist/vue-quill.snow.css"

const router = useRouter()

// URL API
const API_URL = "http://localhost:8000/api/barang"
const CAT_URL = "http://localhost:8000/api/categories"

// State form
const kode_barang = ref("")
const nama_barang = ref("")
const kategori_id = ref("")
const deskripsi = ref("")
const stok = ref(0)
const harga = ref(0)
const gambar = ref(null)
const categories = ref([])

// Ambil kategori dari backend
const getCategories = async () => {
  try {
    let res = await axios.get(CAT_URL)
    categories.value = res.data
    console.log("✅ Data kategori:", res.data)
  } catch (err) {
    console.error("❌ Gagal load kategori:", err)
  }
}

const handleFileUpload = (e) => {
  if (e.target.files && e.target.files[0]) {
    gambar.value = e.target.files[0]
  }
}

const addBarang = async () => {
  try {
    const formData = new FormData()
    formData.append("kode_barang", kode_barang.value)
    formData.append("nama_barang", nama_barang.value)
    formData.append("kategori_id", parseInt(kategori_id.value))
    formData.append("deskripsi", deskripsi.value)
    formData.append("stok", parseInt(stok.value))
    formData.append("harga", parseInt(harga.value))

    if (gambar.value) {
      formData.append("gambar", gambar.value)
    }

    await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    alert("✅ Barang berhasil ditambahkan!")
    router.push("/Barang/barang")
  } catch (error) {
    if (error.response) {
      console.error("⚠️ Laravel validation errors:", error.response.data.errors)
      alert(
        "❌ Gagal menambah barang:\n" +
          JSON.stringify(error.response.data.errors, null, 2)
      )
    } else {
      console.error("❌ Error:", error)
    }
  }
}

onMounted(() => {
  getCategories()
})
</script>

<template>
  <div class="flex">
    <main class="p-6 w-full">

      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-800">Tambah Produk</h3>
        <p class="text-sm text-gray-500">Isi form untuk menambahkan produk baru</p>
      </div>

      <form @submit.prevent="addBarang" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Kode Barang / Barcode</label>
          <input
            v-model="kode_barang"
            type="text"
            placeholder="Opsional, contoh: A0001, 883384990"
            class="form-control"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Nama Barang</label>
          <input
            v-model="nama_barang"
            type="text"
            placeholder="Masukkan nama barang"
            class="form-control"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi Produk</label>
          <QuillEditor
            theme="snow"
            v-model:content="deskripsi"
            contentType="html"
            style="height: 200px; background: white; border-radius: 6px;"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Kategori</label>
          <select v-model="kategori_id" class="form-control" required>
            <option disabled value="">Pilih Kategori</option>
            <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Stok</label>
          <input v-model="stok" type="number" min="0" class="form-control" required />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Harga (IDR)</label>
          <input v-model="harga" type="number" min="0" class="form-control" required />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Gambar Produk</label>
          <input type="file" @change="handleFileUpload" class="form-control" />
        </div>

        <div class="flex gap-2 pt-4">
          <button
            type="button"
            @click="router.push('/Barang/barang')"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm"
          >
            Kembali ke Daftar
          </button>
          <button
            type="submit"
            class="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded text-sm"
          >
            Simpan Produk
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<style scoped>
.form-control {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  outline: none;
}
.form-control:focus {
  border-color: black;
  box-shadow: 0 0 0 1px black;
}
</style>
