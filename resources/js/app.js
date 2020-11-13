require('./bootstrap');

window.Vue = require('vue');

Vue.component('properties-table', require('./components/PropertiesTable.vue').default);
Vue.component('property-create', require('./components/PropertyCreate.vue').default);

const app = new Vue({
    el: '#app',
});
