<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const name = ref("");
const email = ref("");
const role = ref("");
const API_URL = "http://127.0.0.1:8000/api/users";

const tempPasswordShown = ref(""); // show generated password to admin once

const getUser = async () => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    const data = res.data.data || res.data;
    name.value = data.name;
    email.value = data.email;
    role.value = data.role;
  } catch (err) {
    console.error(err);
  }
};

const updateUser = async () => {
  try {
    await axios.put(`${API_URL}/${id}`, { name: name.value, email: email.value, role: role.value });
    alert("User updated");
    router.push("/users/list");
  } catch (err) {
    console.error(err);
    alert("Gagal update user");
  }
};

function generatePassword(len = 12) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let out = "";
  for (let i = 0; i < len; i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
  return out;
}

const resetPassword = async () => {
  if (!confirm("Reset password user dan berikan password sementara?")) return;
  const pw = generatePassword(12);
  try {
    await axios.put(`${API_URL}/${id}`, { password: pw, name: name.value, email: email.value, role: role.value });
    tempPasswordShown.value = pw;
    // copy to clipboard
    try { await navigator.clipboard.writeText(pw); } catch {}
    alert("Password sementara telah dibuat dan disalin ke clipboard. Berikan ke user.");
  } catch (err) {
    console.error(err);
    alert("Gagal reset password");
  }
};

onMounted(getUser);
</script>

<template>
  <div class="main-content">
    <h3 class="mb-4">Edit User</h3>

    <form @submit.prevent="updateUser">
      <div class="mb-3">
        <label>Nama</label>
        <input v-model="name" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Role</label>
        <select v-model="role" class="form-select">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <button class="btn btn-primary" type="submit">Update</button>
      <button type="button" @click="resetPassword" class="btn btn-warning ms-2">Reset Password</button>
      <button type="button" @click="router.push('/users/list')" class="btn btn-secondary ms-2">Batal</button>
    </form>

    <div v-if="tempPasswordShown" class="mt-4 p-3 border rounded bg-light">
      <strong>Password sementara:</strong>
      <div style="display:flex;gap:8px;align-items:center;margin-top:8px">
        <code>{{ tempPasswordShown }}</code>
        <button class="btn btn-sm btn-outline-secondary" @click="navigator.clipboard.writeText(tempPasswordShown)">Salin</button>
      </div>
      <small class="text-muted d-block mt-2">Password hanya ditampilkan sekali. Sarankan user untuk mengganti password setelah login.</small>
    </div>
  </div>
</template>

<style scoped>
.main-content { background: white; padding: 20px; border-radius: 8px; }
</style>
