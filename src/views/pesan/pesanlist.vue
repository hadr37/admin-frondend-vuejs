<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const pesan = ref([]);
const API_URL = "http://127.0.0.1:8000/api/pesan";

const showModal = ref(false);
const selectedPesan = ref(null);

// Ambil data pesan dari API
const getPesan = async () => {
  try {
    const res = await axios.get(API_URL);
    pesan.value = res.data.data || res.data;
  } catch (err) {
    console.error("Gagal memuat pesan:", err);
  }
};

// Hapus pesan
const deletePesan = async (id) => {
  if (confirm("Yakin ingin menghapus pesan ini?")) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      getPesan();
    } catch (err) {
      console.error("Gagal menghapus pesan:", err);
    }
  }
};

// Tampilkan modal untuk melihat pesan lengkap
const lihatPesan = (item) => {
  selectedPesan.value = item;
  showModal.value = true;
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

onMounted(() => getPesan());
</script>

<template>
  <div class="main-content">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3><i class="fas fa-envelope mr-2"></i> Daftar Pesan Customer</h3>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered align-middle">
        <thead class="table-light">
          <tr>
            <th style="width: 50px; text-align: center">No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Whatsapp</th>
            <th>Pesan</th>
            <th>Waktu Kirim</th>
            <th class="text-center" style="width: 120px">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in pesan" :key="item.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td>{{ item.nama }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.telepon }}</td>

            <td class="pesan-text" :title="item.pesan">
              {{ item.pesan.length > 50 ? item.pesan.slice(0, 50) + "..." : item.pesan }}
            </td>

            <td>{{ formatDate(item.created_at) }}</td>
            <td class="text-center">
              <!-- Tombol lihat pesan -->
              <button
                class="btn btn-info btn-sm me-2"
                @click="lihatPesan(item)"
                title="Lihat Pesan"
              >
                <i class="fas fa-eye"></i>
              </button>

              <!-- Tombol hapus -->
              <button
                @click="deletePesan(item.id)"
                class="btn btn-danger btn-sm"
                title="Hapus Pesan"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>

          <tr v-if="pesan.length === 0">
            <td colspan="7" class="text-center text-muted">
              Belum ada pesan yang masuk.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Lihat Pesan -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h5><i class="fas fa-eye me-2"></i>Detail Pesan</h5>
        <hr />
        <div class="modal-body">
          <p><strong>Nama:</strong> {{ selectedPesan.nama }}</p>
          <p><strong>Email:</strong> {{ selectedPesan.email }}</p>
          <p><strong>Telepon:</strong> {{ selectedPesan.telepon || '-' }}</p>
          <p><strong>Waktu Kirim:</strong> {{ formatDate(selectedPesan.created_at) }}</p>
          <p><strong>Pesan:</strong></p>
          <p class="isi-pesan">{{ selectedPesan.pesan }}</p>
        </div>
        <div class="text-end mt-3">
          <button class="btn btn-secondary btn-sm" @click="showModal = false">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

/* Table */
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  font-weight: 600;
  background-color: #f8f9fa;
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

/* Modal */
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


.modal-content {
  background: #fff;
  padding: 20px 25px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto; 
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease;

}

.modal-body p {
  margin-bottom: 8px;
}

.isi-pesan {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  white-space: pre-wrap;
  word-wrap: break-word; 
  max-height: 250px; 
  overflow-y: auto; 
  border: 1px solid #e0e0e0;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
