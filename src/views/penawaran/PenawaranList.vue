<template>
  <div class="main-content">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3><i class="fas fa-tags me-2"></i> Daftar Penawaran Produk</h3>
    </div>

    <!-- Tabel -->
    <div class="table-responsive">
      <table class="table table-bordered align-middle">
        <thead class="table-light">
          <tr>
            <th style="width: 60px" class="text-center">No</th>
            <th>Produk</th>
            <th>Nama Pengirim</th>
            <th>Email</th>
            <th>Telepon</th>
            <th>Pesan</th>
            <th>Waktu Kirim</th>
            <th style="width: 120px" class="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in penawarans" :key="item.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td>{{ item.barang?.nama_barang || "-" }}</td>
            <td>{{ item.nama }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.telepon }}</td>
            <td class="pesan-text" :title="item.pesan">
              {{ item.pesan && item.pesan.length > 50 ? item.pesan.slice(0, 50) + "..." : item.pesan || "-" }}
            </td>
            <td>{{ formatDate(item.created_at) }}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-info me-2" @click="lihatDetail(item)">
                <i class="fas fa-eye"></i>
              </button>
              <button class="btn btn-sm btn-danger" @click="hapusPenawaran(item.id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>

          <tr v-if="penawarans.length === 0">
            <td colspan="8" class="text-center text-muted">
              Belum ada penawaran yang masuk.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Detail -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-box">
        <h5 class="mb-3"><i class="fas fa-eye me-2"></i> Menunggu Detail Produk</h5>
        <p><strong>Nama:</strong> {{ selectedItem.nama }}</p>
        <p><strong>Email:</strong> {{ selectedItem.email }}</p>
        <p><strong>Telepon:</strong> {{ selectedItem.telepon }}</p>
        <p><strong>Produk:</strong> {{ selectedItem.barang?.nama_barang || "-" }}</p>
        <p><strong>Pesan:</strong></p>
        <div class="pesan-detail">{{ selectedItem.pesan }}</div>
        <p class="text-muted mt-2">
          <strong>Waktu Kirim:</strong> {{ formatDate(selectedItem.created_at) }}
        </p>
        <div class="text-end mt-3">
          <button class="btn btn-secondary" @click="closeModal">Tutup</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const penawarans = ref([]);
const API_URL = "http://127.0.0.1:8000/api/penawarans";

const showModal = ref(false);
const selectedItem = ref({});

// Ambil data penawaran
const getPenawaran = async () => {
  try {
    const res = await axios.get(API_URL);
    penawarans.value = res.data.data || res.data;
  } catch (err) {
    console.error("Gagal memuat data penawaran:", err);
  }
};

// Format tanggal
const formatDate = (date) =>
  new Date(date).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

// Lihat detail pesan
const lihatDetail = (item) => {
  selectedItem.value = item;
  showModal.value = true;
};

// Tutup modal
const closeModal = () => {
  showModal.value = false;
};

// Hapus penawaran
const hapusPenawaran = async (id) => {
  if (!confirm("Yakin ingin menghapus penawaran ini?")) return;
  try {
    await axios.delete(`${API_URL}/${id}`);
    penawarans.value = penawarans.value.filter((p) => p.id !== id);
  } catch (err) {
    console.error("Gagal menghapus penawaran:", err);
  }
};

onMounted(() => getPenawaran());
</script>

<style scoped>
.main-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* Table */
.table th {
  background-color: #f8f9fa;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
}

.table td {
  vertical-align: middle;
}

/* Potong teks pesan */
.pesan-text {
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* === Modal === */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-box {
  background: white;
  padding: 25px;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
}

.pesan-detail {
  background: #f9f9f9;
  padding: 10px;
  border-radius: 6px;
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 200px;
  overflow-y: auto;
}
</style>
