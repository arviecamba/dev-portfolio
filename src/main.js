import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import About from './views/About.vue'
import Projects from './views/Projects.vue'
import ProjectDetail from './views/ProjectDetail.vue'
import Experience from './views/Experience.vue'
import Skills from './views/Skills.vue'
import Contact from './views/Contact.vue'
import Resume from './views/Resume.vue'
import { reveal } from './motion'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: About },
    { path: '/projects', component: Projects },
    { path: '/projects/:slug', component: ProjectDetail, props: true },
    { path: '/experience', component: Experience },
    { path: '/skills', component: Skills },
    { path: '/contact', component: Contact },
    { path: '/resume', component: Resume },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

// Links from the old one-page layout (/#experience, /#contact) open the matching file.
router.beforeEach(to => {
  if (to.path === '/' && ['#experience', '#contact'].includes(to.hash)) return to.hash.replace('#', '/')
})

createApp(App).use(router).directive('reveal', reveal).mount('#app')
