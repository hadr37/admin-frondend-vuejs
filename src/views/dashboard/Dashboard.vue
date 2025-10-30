<template>
  <div class="dashboard p-3">
    <h3 class="fw-bold mb-4">Dashboard</h3>

    <!-- Cards -->
    <div class="row g-3 mb-4">
      <template v-if="isLoading">
        <div v-for="n in 6" :key="n" class="col-md-6 col-lg-3">
          <div class="card h-100 shadow-sm">
            <div class="card-body d-flex justify-content-between align-items-center">
              <div class="w-75">
                <div class="skeleton skeleton-title mb-2"></div>
                <div class="skeleton skeleton-text w-50"></div>
              </div>
              <div class="skeleton skeleton-icon"></div>
            </div>
            <div class="card-footer bg-transparent border-top-0 text-end">
              <div class="skeleton skeleton-footer ms-auto"></div>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div
          v-for="card in cards"
          :key="card.title"
          class="col-md-6 col-lg-3"
        >
          <div
            class="card text-white h-100 shadow-sm card-hover"
            :class="card.bg"
            @click="goTo(card.route)"
            style="cursor:pointer"
          >
            <div class="card-body d-flex justify-content-between align-items-center">
              <div>
                <h2 class="fw-bold mb-1">{{ card.value }}</h2>
                <p class="mb-1">{{ card.title }}</p>
              </div>
              <i :class="card.icon + ' fa-3x opacity-75'"></i>
            </div>
            <div class="card-footer bg-transparent border-top-0 text-end">
              <small>Lihat {{ card.title.split(' ')[1] }} <i class="fas fa-arrow-circle-right"></i></small>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Charts -->
    <div class="row g-3">
      <div class="col-lg-6">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white fw-bold">
            Jumlah Barang per Kategori
          </div>
          <div class="card-body">
            <template v-if="isLoading">
              <div class="skeleton skeleton-chart mb-2"></div>
              <div class="skeleton skeleton-chart-line w-75"></div>
            </template>
            <template v-else>
              <canvas id="chartBarang"></canvas>
            </template>
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="card shadow-sm">
          <div class="card-header bg-danger text-white fw-bold">
            Total Stok per Kategori
          </div>
          <div class="card-body">
            <template v-if="isLoading">
              <div class="skeleton skeleton-chart mb-2"></div>
              <div class="skeleton skeleton-chart-line w-50"></div>
            </template>
            <template v-else>
              <canvas id="chartStok"></canvas>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import Chart from "chart.js/auto"
import { useRouter } from "vue-router"

const router = useRouter()

const isLoading = ref(true)

const cards = ref([
  { title: "Total Barang", value: 0, bg: "bg-info", icon: "fas fa-box", route: "/Barang/barang" },
  { title: "Total Kategori", value: 0, bg: "bg-success", icon: "fas fa-tags", route: "/Kategori/Kategori" },
  { title: "Total User", value: 0, bg: "bg-warning", icon: "fas fa-users", route: "/Users/list" },
  { title: "Total Artikel", value: 0, bg: "bg-secondary", icon: "fas fa-newspaper", route: "/article/artikel" },
  { title: "Total Pesan", value: 0, bg: "bg-pink", icon: "fas fa-envelope", route: "/pesan/list" },
  { title: "Total Penawaran", value: 0, bg: "bg-danger", icon: "fas fa-handshake", route: "/penawaran/list" },
])

const kategoriLabels = ref([])
const jumlahBarang = ref([])
const totalStok = ref([])

const fetchData = async () => {
  try {
    isLoading.value = true
    const [barangRes, kategoriRes, userRes, artikelRes, pesanRes, penawaranRes] = await Promise.all([
      axios.get("http://localhost:8000/api/barang"),
      axios.get("http://localhost:8000/api/categories"),
      axios.get("http://localhost:8000/api/users"),
      axios.get("http://localhost:8000/api/artikel"),
      axios.get("http://localhost:8000/api/pesan"),
      axios.get("http://localhost:8000/api/penawarans"),
    ])

    const barang = barangRes.data?.data || barangRes.data || []
    const kategori = kategoriRes.data?.data || kategoriRes.data || []
    const users = userRes.data?.data || userRes.data || []
    const artikel = artikelRes.data?.data || artikelRes.data || []
    const pesan = pesanRes.data?.data || pesanRes.data || []
    const penawaran = penawaranRes.data?.data || penawaranRes.data || []

    cards.value[0].value = barang.length
    cards.value[1].value = kategori.length
    cards.value[2].value = users.length
    cards.value[3].value = artikel.length
    cards.value[4].value = pesan.length
    cards.value[5].value = penawaran.length

    const kategoriMap = {}
    barang.forEach((b) => {
      const kat = b.kategori?.name || "Tanpa Kategori"
      if (!kategoriMap[kat]) kategoriMap[kat] = { jumlah: 0, stok: 0 }
      kategoriMap[kat].jumlah++
      kategoriMap[kat].stok += b.stok
    })

    kategoriLabels.value = Object.keys(kategoriMap)
    jumlahBarang.value = Object.values(kategoriMap).map((v) => v.jumlah)
    totalStok.value = Object.values(kategoriMap).map((v) => v.stok)

    renderCharts()
  } catch (error) {
    console.error("Gagal memuat data dashboard:", error)
  }
  finally {
    isLoading.value = false
  }
}

const renderCharts = () => {
  const ctx1 = document.getElementById("chartBarang")
  const ctx2 = document.getElementById("chartStok")

  new Chart(ctx1, {
    type: "line",
    data: {
      labels: kategoriLabels.value,
      datasets: [
        {
          label: "Jumlah Barang",
          data: jumlahBarang.value,
          borderColor: "#007bff",
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          fill: true,
          tension: 0.3,
        },
      ],
    },
  })

  new Chart(ctx2, {
    type: "bar",
    data: {
      labels: kategoriLabels.value,
      datasets: [
        {
          label: "Total Stok",
          data: totalStok.value,
          backgroundColor: "rgba(255, 99, 132, 0.7)",
        },
      ],
    },
  })
}

const goTo = (route) => {
  router.push(route)
}

onMounted(fetchData)
</script>

<style scoped>
.card-hover:hover {
  transform: translateY(-4px);
  transition: all 0.2s ease-in-out;
}
.bg-pink {
  background-color: #e83e8c !important;
}
.dashboard {
  background-color: #f5f7fa;
  min-height: 100vh;
}

/* Skeleton Loading */
.skeleton {
  position: relative;
  overflow: hidden;
  background-color: #e9ecef;
  border-radius: 6px;
  height: 14px;
}
.skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150px;
  height: 100%;
  width: 150px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
  animation: shimmer 1.2s infinite;
}

.skeleton-title { height: 28px; width: 60%; }
.skeleton-text { height: 16px; }
.skeleton-icon { height: 48px; width: 48px; border-radius: 50%; }
.skeleton-footer { height: 12px; width: 120px; }
.skeleton-chart { height: 180px; width: 100%; border-radius: 8px; }
.skeleton-chart-line { height: 12px; border-radius: 4px; }

@keyframes shimmer {
  0% { transform: translateX(0); }
  100% { transform: translateX(300%); }
}
</style>
