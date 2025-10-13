<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("user");
const showPassword = ref(false);
const API_URL = "http://127.0.0.1:8000/api/users";

function generatePassword(len = 10) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
}

const onGenerate = () => {
  password.value = generatePassword(12);
  showPassword.value = true;
  // optional: copy to clipboard automatically
  navigator.clipboard?.writeText(password.value).catch(() => {});
  alert("Password sementara dibuat dan disalin ke clipboard. Simpan dengan aman.");
};

const copyPassword = async () => {
  if (!password.value) return;
  try {
    await navigator.clipboard.writeText(password.value);
    alert("Password disalin ke clipboard");
  } catch {
    alert("Gagal menyalin password");
  }
};

const saveUser = async () => {
  try {
    await axios.post(API_URL, {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value,
    });
    alert("User berhasil ditambahkan. Berikan password sementara ke user.");
    router.push("/users/list");
  } catch (err) {
    console.error(err.response?.data || err);
    alert("Gagal menyimpan user. Cek console untuk detail.");
  }
};
</script>

<template>
  <div class="main-content">
    <h3 class="mb-4">Tambah User</h3>

    <form @submit.prevent="saveUser">
      <div class="mb-3">
        <label>Nama</label>
        <input v-model="name" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Password</label>
        <div style="display:flex;gap:8px;align-items:center">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            class="form-control"
            required
          />
          <button type="button" class="btn btn-secondary" @click="showPassword = !showPassword">
            {{ showPassword ? "Sembunyikan" : "Tampilkan" }}
          </button>
          <button type="button" class="btn btn-outline-secondary" @click="onGenerate">
            Generate
          </button>
          <button type="button" class="btn btn-outline-secondary" @click="copyPassword">
            Salin
          </button>
        </div>
        <small class="text-muted">Password akan di-hash di server. Simpan password sementara ini dengan aman.</small>
      </div>

      <div class="mb-3">
        <label>Role</label>
        <select v-model="role" class="form-select">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <button class="btn btn-primary" type="submit">Simpan</button>
      <button type="button" @click="router.push('/users/list')" class="btn btn-secondary ms-2">
        Batal
      </button>
    </form>
  </div>
</template>

<style scoped>
.main-content { background: white; padding: 20px; border-radius: 8px; }
</style>
