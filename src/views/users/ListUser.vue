<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const users = ref([]);
const router = useRouter();
const API_URL = "http://127.0.0.1:8000/api/users";

const getUsers = async () => {
  try {
    const res = await axios.get(API_URL);
    users.value = res.data.data || res.data;
  } catch (err) {
    console.error(err);
  }
};

const deleteUser = async (id) => {
  if (confirm("Yakin ingin menghapus user ini?")) {
    await axios.delete(`${API_URL}/${id}`);
    getUsers();
  }
};

onMounted(() => getUsers());
</script>

<template>
  <div class="main-content">
    <div class="d-flex justify-content-between align-items-center mb-3">
       <h3><i class="fas fa-user mr-2"></i> Daftar User</h3>
      <button class="btn-link" @click="router.push('/users/add')"> + Tambah User</button>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered align-middle">
        <thead class="table-light">
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Role</th>
            <th class="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td class="text-center">
              <button
                @click="router.push(`/users/edit/${user.id}`)"
                class="btn btn-warning btn-sm"
              >
                Edit
              </button>
              <button
                @click="deleteUser(user.id)"
                class="btn btn-danger btn-sm ms-2"
              >
                Hapus
              </button>
            </td>
          </tr>

          <tr v-if="users.length === 0">
            <td colspan="4" class="text-center text-muted">Belum ada data user.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.main-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

/* Tombol link-style di kanan atas */
.btn-link {
  background: none;
  border: none;
  color: #007bff;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  font-size: 15px;
  padding: 0;
}

.btn-link:hover {
  text-decoration: underline;
}
</style>
