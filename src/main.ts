import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faFileArrowDown,
  faPlus,
  faMagnifyingGlass,
  faEye,
  faPencil,
  faTrash,
  faUserGroup,
  faBriefcase
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faFileArrowDown,
  faPlus,
  faMagnifyingGlass,
  faEye,
  faPencil,
  faTrash,
  faUserGroup,
  faBriefcase
)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('main')
