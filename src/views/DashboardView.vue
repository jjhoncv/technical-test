<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-left p20">
      <div class="dashboard-logo">
        <img src="./../assets/imgs/logo-dark.svg" alt="logo" />
      </div>
      <div class="dashboard-nav-wrapper">
        <nav class="dashboard-nav p20">
          <div class="dashboard-nav-item active">
            <font-awesome-icon class="icon-text" icon="fa-solid fa-user-group" />
            <span>Empleados</span>
          </div>
          <div class="dashboard-nav-item">
            <font-awesome-icon width="20px" class="icon-text" icon="fa-solid fa-briefcase" />
            <span>Reclutamiento</span>
          </div>
        </nav>
      </div>
      <button @click="logout" class="dashboard-button-logout button fullwidth outline">
        Salir
      </button>
    </div>
    <div class="dashboard-right">
      <div class="dashboard-header p20">
        <div class="dashboard-user">{{ auth.fullName }}</div>
      </div>
      <div class="page p20">
        <template v-if="employes.length > 0">
          <div class="page-header">
            <div class="page-header-left">
              <h4>Empleados</h4>
              <p>Gestiona tus empleados</p>
            </div>
            <div class="page-header-right">
              <button class="button outline">
                <font-awesome-icon class="icon-text" icon="fa-solid fa-file-arrow-down" />
                <span>Descargar</span>
              </button>
              <button class="button">
                <font-awesome-icon class="icon-text" icon="fa-solid fa-plus" />
                <span>Nuevo</span>
              </button>
            </div>
          </div>
          <div class="page-options">
            <div class="search-bar">
              <input class="field" type="search" name="" id="" placeholder="Buscar empleado" />
              <button class="button-search">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
              </button>
            </div>
            <div class="filters">
              <div class="field">
                <select class="dropdown" name="" id="">
                  <option value="">Nombre del cargo</option>
                  <option value="">Departamento</option>
                </select>
              </div>
            </div>
          </div>
          <div class="page-grid">
            <div class="grid-row header">
              <div>Nombre</div>
              <div>Nombre cargo</div>
              <div>Departamento</div>
              <div>Oficina</div>
              <div>Cuenta</div>
              <div class="options">Acciones</div>
            </div>

            <div v-for="employe in employes" :key="employe.id" class="grid-row">
              <div class="grid-col-name">
                <strong>{{ employe.nombre }}</strong>
                <span>{{ employe.correo }}</span>
              </div>
              <div>{{ employe.cargo }}</div>
              <div>{{ employe.departamento }}</div>
              <div>{{ employe.oficina }}</div>
              <div>{{ employe.estadoCuenta }}</div>
              <div class="options">
                <button class="button-icon">
                  <font-awesome-icon color="#27A376" icon="fa-solid fa-eye" />
                </button>
                <button class="button-icon">
                  <font-awesome-icon color="#2F78EE" icon="fa-solid fa-pencil" />
                </button>
                <button class="button-icon">
                  <font-awesome-icon color="#E03137" icon="fa-solid fa-trash" />
                </button>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="page-header">
            <div class="page-header-left">
              <h4>Empleados</h4>
            </div>
            <div class="page-header-right">
              <div class="loading"></div>
            </div>
          </div>
          <div class="page-options">
            <div class="loading"></div>
            <div class="loading"></div>
            <div class="loading"></div>
          </div>
          <div class="page-grid">
            <div class="grid-row">
              <div><div class="loading"></div></div>
              <div><div class="loading"></div></div>
              <div><div class="loading"></div></div>
              <div><div class="loading"></div></div>
              <div><div class="loading"></div></div>
              <div class="options"><div class="loading"></div></div>
            </div>

            <div v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]" :key="item" class="grid-row">
              <div><div class="loading"></div></div>
              <div><div class="loading"></div></div>
              <div><div class="loading"></div></div>
              <div><div class="loading"></div></div>
              <div><div class="loading"></div></div>
              <div class="options">
                <div class="loading"></div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAuth } from '@/stores/auth.js'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

import http from '@/services/http.js'

const auth = useAuth()
const router = useRouter()

const employes = reactive([])

const logout = () => {
  auth.clear()
  router.push({ name: 'login' })
}

fetchEmployes()

async function fetchEmployes() {
  const token = localStorage.getItem('token')
  try {
    const {
      data: { data, status }
    } = await http.get('/empleados?limit=8&page=4', {
      headers: { ...http.defaults.headers, Authorization: `Bearer ${token}` }
    })
    if (status === 'success') {
      employes.push(...data)
    }
  } catch (error) {
    console.log(error?.response?.data.message)
  }
}
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  min-height: 100vh;
}
.dashboard-logo {
  text-align: center;
}
.dashboard-left {
  width: 280px;
  border-right: 1px solid #e9eaec;
  position: relative;
}
.dashboard-right {
  width: 100%;
  background-color: #fafafa;
}
.dashboard-header {
  height: 56px;
  border-bottom: 1px solid #e9eaec;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: white;
}
.dashboard-nav-wrapper {
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
}
.dashboard-nav-item {
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 700;
  line-height: 22.4px;
  letter-spacing: 0.2px;
}
.dashboard-nav-item.active {
  color: #00a19b;
}
.dashboard-button-logout {
  position: absolute;
  bottom: 20px;
  width: calc(100% - 40px);
}
</style>
