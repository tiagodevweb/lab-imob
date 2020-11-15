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
                            <td><a href="#" class="text-danger" @click.prevent="tryToRemove(property)">Remover</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="showModal" class="modal modal-custom" style="display: block">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="float-left">Atenção!</h4>
                        <button type="button" @click.prevent="closeModal" class="close">
                            <span>&times;</span>
                        </button>
                    </div>
                
                    <div class="modal-body">
                        <p>Deseja excluir definitivamente a propriedade abaixo?</p>
                        <ul>
                            <li>Proprietário: {{ propertyToBeDeleted.email }}</li>
                            <li>Endereço: {{ formatedAddress(propertyToBeDeleted) }}</li>
                            <li>Contratada: {{ formatedContracted(propertyToBeDeleted) }}</li>
                        </ul>                       
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click.prevent="closeModal">Cancelar</button>
						<button type="button" class="btn btn-danger" id="delete" @click.prevent="remove(propertyToBeDeleted.id)">Confirmar Exclusão</button>
                    </div>
                </div>
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
            moment,
            showModal: false,
            propertyToBeDeleted: {}
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
        },
        formatedAddress(property) {
            return `Rua: ${property.street } Nº ${property.number }, ${property.city }, ${property.state }`
        },
        formatedContracted: function (property) {
            return property.contracted ? 'Sim' : 'Não'
        },
        tryToRemove(property) {
            this.propertyToBeDeleted = property

            this.showModal = true
        },
        remove(id) {
            axios.delete(`api/properties/${id}`).then((response) => {
                this.properties = this.properties.filter(function(property) {
                    return property.id !== id;
                });
                this.closeModal()
            }).catch((error) => {
                console.log(error.response)
            }); 
        },
        closeModal() {
            this.propertyToBeDeleted = {}
            this.showModal = false
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

<style>
.modal-custom {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}
</style>
