<template>
    <div class="properties-table">
        <div class="card">
            <div class="card-header">
                Propriedades Cadastradas
                <a id="get-all" @click.prevent="getAll" class="btn btn-link">Atualizar</a>
            </div>
            <div class="card-body">
                <p v-if="error" class="text-danger">An unexpected error occurred, please try again later.</p>
                <table class="table table-striped" v-else>
                    <thead>
                        <tr>
                            <th @click="switchSort('id')" id="switchSortId">#id</th>
                            <th @click="switchSort('email')" id="switchSortEmail">Email do Proprietário</th>
                            <th @click="switchSort('address')" id="switchSortAddress">Endereço</th>
                            <th @click="switchSort('contracted')" id="switchSortContracted">Contratada</th>
                            <th @click="switchSort('created_at')" id="switchSortCreatedAt">Cadastrada</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="loading">
                            <td colspan="6" class="text-center">
                                <p class="text-info">Carregando...</p>
                            </td>
                        </tr>
                        <tr v-else-if="properties.length === 0">
                            <td colspan="6" class="text-center">
                                <p class="text-muted">Adicione a primeira propriedade!</p>
                            </td>
                        </tr>
                        <tr v-else v-for="(property, key) in sorted" :key="key" id="property.id">
                            <td>#{{ property.id }}</td>
                            <td>{{ property.email }}</td>
                            <td>Rua: {{ property.street }} Nº {{ property.number }}, {{ property.city }}, {{ property.state }}</td>
                            <td><span class="badge" :class="[property.contracted ? 'badge-success' : 'badge-secondary']">{{ property.contracted ? 'Sim' : 'Não' }}</span></td>
                            <td>{{ moment(property.created_at).format('DD/MM/YYYY') }}</td>
                            <td><a href="#" class="text-danger">Remover</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from "moment";

export default {
    data() {
        return {
            properties: [],
            currentSort:'id',
            currentSortDir:'asc',
            loading: false,
            error: false,
            moment
        };
    },

    mounted() {
        this.getAll()
    },

    methods: {
        getAll() {
            let self = this
            this.loading = true
            axios.get('api/properties').then((response) => {
                this.loading = false
                this.properties = response.data           
            }).catch((error) => {
                this.loading = false
                this.error = true
            }); 
        },
        switchSort(column) {
            if(column === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = column;
        }
    },
    computed:{
        sorted: function() {
            return this.properties.sort((a,b) => {
                let modifier = 1
                if(this.currentSortDir === 'desc') {
                    modifier = -1
                }
                if(a[this.currentSort] < b[this.currentSort]) {
                    return -1 * modifier
                }
                if(a[this.currentSort] > b[this.currentSort]) {
                    return 1 * modifier
                }
                return 0;
            });
        }
    }
};
</script>
