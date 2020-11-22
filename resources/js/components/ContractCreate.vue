<template>
    <div class="contract-create">
        <div class="card">
            <div class="card-header">Criar Contrato</div>
            <div class="card-body">
                <form>
                    <div class="form-row">
                        <div class="col-md-6 mb-3">
                            <label for="property_id">Propriedade</label>
                            <select class="form-control" 
                                name="property_id" 
                                id="property_id"
                                v-model="form.property_id"
                                :class="[errors.has('property_id') ? 'is-invalid' : '']"
                                :disabled="sending || loading"
                            >
                                <option v-for="(property, key) in properties" :key="key" :value="property.id">{{ formatedAddress(property) }}</option>
                            </select>
                            <div class="invalid-feedback"
                                v-if="errors.has('property_id')" 
                                v-text="errors.get('property_id')">
                            </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label for="person">Pessoa</label>
                            <select class="form-control" 
                                name="person" 
                                id="person"
                                v-model="form.person"
                                @change="personOnChange" 
                                :class="[errors.has('person') ? 'is-invalid' : '']"
                                :disabled="sending"
                            >
                                <option value="Física" selected>Física</option>
                                <option value="Jurídica">Jurídica</option>
                            </select>
                            <div class="invalid-feedback" 
                                v-if="errors.has('person')" 
                                v-text="errors.get('person')">
                            </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label for="document">Documento</label>
                                <input
                                    type="text"
                                    name="document"
                                    v-mask="resolveDocumentMask"
                                    v-model="form.document"
                                    class="form-control"
                                    :class="[errors.has('document') ? 'is-invalid' : '']"
                                    :disabled="sending"
                                />
                                <div class="invalid-feedback" 
                                    v-if="errors.has('document')" 
                                    v-text="errors.get('document')">
                                </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-6 mb-3">
                            <label for="email">Email do Contratante</label>
                            <input
                                type="text"
                                name="email"
                                v-model="form.email"
                                class="form-control" 
                                :class="[errors.has('email') ? 'is-invalid' : '']"
                                :disabled="sending"
                            />
                            <div class="invalid-feedback"
                                v-if="errors.has('email')" 
                                v-text="errors.get('email')">
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="full_name">Nome Completo do Contratante</label>
                            <input
                                type="text"
                                name="full_name"
                                v-model="form.full_name"
                                class="form-control"
                                :class="[errors.has('full_name') ? 'is-invalid' : '']"
                                :disabled="sending"
                            />
                            <div class="invalid-feedback" 
                                v-if="errors.has('full_name')" 
                                v-text="errors.get('full_name')">
                            </div>
                        </div>
                    </div>
                    <button 
                        class="btn btn-primary" 
                        type="submit" 
                        @click.prevent="submit" 
                        :disabled="sending">
                        Salvar
                        <img :src="'/img/ajax-loader.gif'" alt="Salvando..." v-if="sending">
                    </button>
                    <strong 
                    class="ml-2" 
                    :class="[message.success ? 'text-success' : 'text-danger']"
                    id="message"
                    v-show="message.show"
                    v-text="message.value">
                    </strong>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Errors from "../utils/Errors";
import axios from 'axios'

export default {
    props: ['properties'],
    data() {
        return {
            form: {
                property_id: '',
                person: '',
                document: '',
                email: '',
                full_name: ''
            },
            documentMask: {
                cpf: '###.###.###-##',
                cnpf: '##.###.###/####-##'
            },
            loading: false,
            errors: new Errors(),
            sending: false,
            message: {
                show: false,
                success: true,
                value: ''
            }
        };
    },

    mounted() {
        this.getAllProperties()
    },

    methods: {
        submit() {
            let self = this
            this.sending = true
            this.errors.clean()
            axios.post('api/contracts', this.form).then((response) => {
                self.onSuccess(response)              
            }).catch((error) => {
                self.onFail(error)
            }); 
        },
        onSuccess(response) {
            this.formClean()
            this.message.value = response.data.message
            this.message.show = true
            this.sending = false
        },
        onFail(error) {
            if (error.response.status == 422) {
                this.errors.record(error.response.data.errors)
            } else {
                this.message.success = false
                this.message.value = error.response.data.message
                this.message.show = true
            }
            this.sending = false
        },
        formClean() {
            for(let key in this.form) {
                Object.defineProperty(this.form, key, {
                        value: '',
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }
                );
            }            
        },
        formatedAddress(property) {
            return `Rua: ${property.street } Nº ${property.number }, ${property.city }`
        },
        personOnChange() {
            this.form.document = ''
        }
    },

    computed: {
        resolveDocumentMask: function () {
            return this.form.person === 'Física' ? 
                this.documentMask.cpf : 
                this.form.person === 'Jurídica' ? 
                this.documentMask.cnpf : 
                ''
        }
    }
};
</script>
