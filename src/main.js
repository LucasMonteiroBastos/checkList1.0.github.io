import Vue from 'vue'
import App from './App.vue'
import FirebaseVue from './firebase'
import VueMask from 'v-mask'
import vueResource from 'vue-resource'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'


// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)
Vue.use(VueMask);
Vue.use(FirebaseVue)
Vue.use(vueResource)
Vue.use(VueFormWizard)


// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css';


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// Vuesax Admin Filters
import './filters/filters'

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'


// Feather font icon
require('./assets/css/iconfont.css')


Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
