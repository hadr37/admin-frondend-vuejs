<template>
  <div class="edit-container">
    <h3><i class="fas fa-edit mr-2"></i> Edit Artikel</h3>

    <div v-if="loading" class="loading">Memuat data...</div>

    <form v-else @submit.prevent="updateArticle" class="form-box">
      <div class="form-group">
        <label>Judul Artikel</label>
        <input v-model="form.judul" type="text" @input="generateSlug" required />
      </div>

      <div class="form-group">
        <label>Slug</label>
        <input v-model="form.slug" type="text" readonly />
      </div>

      <div class="form-group">
        <label>Isi Artikel</label>
        <QuillEditor
          v-model:content="form.isi"
          contentType="html"
          theme="snow"
          placeholder="Tulis isi artikel di sini..."
        />
      </div>

      <div class="form-group">
        <label>Cover</label>
        <input type="file" accept="image/*" @change="handleFile" />
        <div v-if="preview" class="preview">
          <img :src="preview" alt="Preview cover" />
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-dark">Perbarui</button>
        <button
          type="button"
          @click="router.push('/article/artikel')"
          class="btn btn-secondary"
        >
          Batal
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const router = useRouter();
const route = useRoute();

const form = ref({
  judul: "",
  slug: "",
  isi: "",
  cover: null,
});
const preview = ref(null);
const loading = ref(false);

const API_URL = "http://localhost:8000/api/artikel";

const getArticle = async () => {
  try {
    loading.value = true;
    const res = await axios.get(`${API_URL}/${route.params.slug}`);
    form.value = {
      judul: res.data.judul,
      slug: res.data.slug,
      isi: res.data.isi,
      cover: null,
    };
    preview.value = res.data.cover
      ? `http://localhost:8000/storage/${res.data.cover}`
      : null;
  } catch (error) {
    console.error(error);
    alert("Gagal memuat artikel.");
  } finally {
    loading.value = false;
  }
};

const generateSlug = () => {
  form.value.slug = form.value.judul
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

const handleFile = (e) => {
  const file = e.target.files[0];
  if (file && file.size > 10 * 1024 * 1024) {
    alert("Ukuran gambar maksimal 10MB!");
    e.target.value = "";
    return;
  }
  form.value.cover = file;
  preview.value = URL.createObjectURL(file);
};

const updateArticle = async () => {
  try {
    loading.value = true;

    if (!form.value.judul || !form.value.isi) {
      alert("Judul dan isi artikel tidak boleh kosong!");
      return;
    }

    const formData = new FormData();
    formData.append("judul", form.value.judul);
    formData.append("slug", form.value.slug);
    formData.append("isi", form.value.isi);

    // Hanya kirim cover jika user memilih file baru
    if (form.value.cover instanceof File) {
      formData.append("cover", form.value.cover);
    }

    await axios.post(`${API_URL}/${route.params.slug}?_method=PUT`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Artikel berhasil diperbarui!");
    router.push("/article/artikel");
  } catch (error) {
    console.error("Error response:", error.response?.data || error.message);
    alert("Gagal memperbarui artikel. Lihat console untuk detail.");
  } finally {
    loading.value = false;
  }
};

onMounted(() => getArticle());
</script>

<style scoped>
.edit-container {
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  min-height: 100vh;
}

h3 {
  margin-bottom: 20px;
  font-weight: bold;
}

.form-box {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: 600;
}

input {
  border: 1px solid #ccc;
  padding: 8px 10px;
  border-radius: 5px;
  font-size: 14px;
}

.ql-editor {
  min-height: 200px;
  font-size: 14px;
  color: #333;
  background: #fff;
  border-radius: 5px;
}

.preview img {
  width: 150px;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn-dark {
  background: #000;
  color: #fff;
}
.btn-dark:hover {
  background: #333;
}

.btn-secondary {
  background: #ccc;
  color: #000;
}
.btn-secondary:hover {
  background: #b5b5b5;
}

.loading {
  text-align: center;
  padding: 50px;
  color: #888;
}
</style>
