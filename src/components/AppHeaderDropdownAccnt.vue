<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import avatar from '@/assets/images/avatars/akun.png'

const router = useRouter()
const username = ref('Admin')
const userEmail = ref('admin@example.com')

// Ambil data user yang sedang login saat komponen dimuat
onMounted(async () => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (!token || role !== 'admin') {
    router.push('/login')
    return
  }

  try {
    // Ambil data user dari API backend Laravel
    const res = await axios.get('http://localhost:8000/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    username.value = res.data.name
    userEmail.value = res.data.email

    // Simpan ke localStorage agar tidak hilang saat refresh
    localStorage.setItem('name', res.data.name)
    localStorage.setItem('email', res.data.email)
  } catch (error) {
    console.warn('⚠️ Gagal mengambil data user:', error)
    username.value = localStorage.getItem('name') || 'Admin'
    userEmail.value = localStorage.getItem('email') || 'admin@example.com'
  }
})

// Fungsi logout
const logout = async () => {
  const token = localStorage.getItem('token')

  try {
    await axios.post(
      'http://localhost:8000/api/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (error) {
    console.error('Gagal logout:', error)
  }

  // Bersihkan semua data localStorage
  localStorage.clear()

  // Arahkan kembali ke halaman login
  router.push('/login')
}
</script>

<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" class="cursor-pointer border border-success shadow-sm" />
    </CDropdownToggle>

    <CDropdownMenu class="pt-0">
      <CDropdownHeader
        component="h6"
        class="bg-success text-white fw-semibold mb-2 rounded-top text-center"
      >
        Akun Saya
      </CDropdownHeader>

      <!-- Info akun -->
      <div class="px-3 pb-3 text-center border-bottom">
        <CAvatar :src="avatar" size="xl" class="mb-2 border border-success shadow-sm" />
        <h6 class="mb-0 text-success">{{ username }}</h6>
        <p class="text-muted mb-0" style="font-size: 0.85rem;">{{ userEmail }}</p>
      </div>

      <!-- Menu -->
      <CDropdownItem>
        <CIcon icon="cil-user" class="me-2 text-success" /> Profil
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-settings" class="me-2 text-success" /> Pengaturan
      </CDropdownItem>

      <CDropdownDivider />

      <CDropdownItem class="text-danger fw-semibold" @click="logout">
        <CIcon icon="cil-lock-locked" class="me-2" /> Logout
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<style scoped>
h6 {
  font-weight: 600;
  color: #2e7d32;
}

.text-muted {
  color: #6b7280;
}

.cursor-pointer {
  cursor: pointer;
  transition: all 0.2s ease;
}

.cursor-pointer:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
}
</style>
