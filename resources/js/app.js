require('./bootstrap');

window.Vue = require('vue');

Vue.component('properties-table', require('./components/PropertiesTable.vue').default);
Vue.component('property-create', require('./components/PropertyCreate.vue').default);
Vue.component('contract-create', require('./components/ContractCreate.vue').default);

import VueMask from 'v-mask'
Vue.use(VueMask);

const app = new Vue({
    el: '#app',
});
