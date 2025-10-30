<template>
    <div class="login-page">
      <div class="login-box">
        <h2>Login Panel Admin</h2>
  
        <form @submit.prevent="login">
          <div class="form-group">
            <label>Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="Masukkan email"
              required
            />
          </div>
  
          <div class="form-group password-group">
            <label>Password</label>
            <div class="password-wrapper">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Masukkan password"
                required
              />
              <button type="button" class="toggle-btn" @click="togglePassword">
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>
  
          <button type="submit" class="btn-login" :disabled="loading">
            {{ loading ? 'Memproses...' : 'Login' }}
          </button>
  
          <p v-if="error" class="error">{{ error }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const loading = ref(false)
  const showPassword = ref(false)
  const router = useRouter()
  
  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }
  
  const login = async () => {
    loading.value = true
    error.value = ''
  
    try {
      const res = await axios.post('http://localhost:8000/api/login', {
        email: email.value,
        password: password.value,
      })
  
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.user.role)
  
      if (res.data.user.role === 'admin') {
        router.push('/dashboard')
      } else {
        alert('Akses ditolak. Anda bukan admin.')
        localStorage.clear()
      }
    } catch (err) {
      error.value = 'Email atau password salah'
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #a8e063, #56ab2f);
  }
  

  .login-box {
    background: #fff;
    padding: 40px 50px;
    border-radius: 20px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    width: 380px;
    text-align: center;
    animation: fadeIn 0.6s ease-in-out;
  }
  
  h2 {
    margin-bottom: 25px;
    color: #2e7d32;
    font-weight: 700;
  }
    .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
    color: #2e7d32;
  }
  
  input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #bdbdbd;
    border-radius: 10px;
    outline: none;
    transition: all 0.2s ease;
    font-size: 15px;
  }
  
  input:focus {
    border-color: #43a047;
    box-shadow: 0 0 5px rgba(67, 160, 71, 0.4);
  }
    .password-wrapper {
    display: flex;
    align-items: center;
    position: relative;
  }
  
  .toggle-btn {
    position: absolute;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #43a047;
  }
  

  .btn-login {
    width: 100%;
    padding: 12px;
    background-color: #43a047;
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s ease;
  }
  
  .btn-login:hover {
    background-color: #2e7d32;
  }
  
  .error {
    color: #d32f2f;
    margin-top: 15px;
    font-weight: 600;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  