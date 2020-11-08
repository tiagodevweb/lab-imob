<template>
    <div class="container">
        <div class="card">
            <div class="card-header">Criar Propriedade</div>
            <div class="card-body">
                <form>
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                            <label for="email">Email do Proprietário</label>
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
                            <label for="street">Rua</label>
                            <input
                                type="text"
                                name="street"
                                v-model="form.street"
                                class="form-control" 
                                :class="[errors.has('street') ? 'is-invalid' : '']"
                                :disabled="sending"
                            />
                            <div class="invalid-feedback"
                                v-if="errors.has('street')" 
                                v-text="errors.get('street')">
                            </div>
                        </div>
                        <div class="col-md-2 mb-3">
                            <label for="number">Nº</label>
                            <input
                                type="text"
                                name="number"
                                v-model="form.number"
                                class="form-control"
                                :class="[errors.has('number') ? 'is-invalid' : '']"
                                :disabled="sending"
                            />
                            <div class="invalid-feedback" 
                                v-if="errors.has('number')" 
                                v-text="errors.get('number')">
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                            <label for="neighborhood">Bairro</label>
                            <div class="input-group">
                                <input
                                type="text"
                                name="neighborhood"
                                v-model="form.neighborhood"
                                class="form-control"
                                :class="[errors.has('neighborhood') ? 'is-invalid' : '']"
                                :disabled="sending"
                                />
                                <div class="invalid-feedback" 
                                    v-if="errors.has('neighborhood')" 
                                    v-text="errors.get('neighborhood')">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                        <label for="city">Cidade</label>
                        <input
                            type="text"
                            name="city"
                            v-model="form.city"
                            class="form-control"
                            :class="[errors.has('city') ? 'is-invalid' : '']"
                            :disabled="sending"
                        />
                            <div class="invalid-feedback" 
                                v-if="errors.has('city')" 
                                v-text="errors.get('city')">
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                        <label for="state">Estado</label>
                        <input
                            type="text"
                            name="state"
                            v-model="form.state"
                            class="form-control"
                            :class="[errors.has('state') ? 'is-invalid' : '']"
                            :disabled="sending"
                        />
                            <div class="invalid-feedback" 
                                v-if="errors.has('state')" 
                                v-text="errors.get('state')">
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
    data() {
        return {
            form: {
                email: '',
                street: '',
                number: '',
                neighborhood: '',
                city: '',
                state: ''
            },
            errors: new Errors(),
            sending: false,
            message: {
                show: false,
                success: true,
                value: ''
            }
        };
    },

    methods: {
        submit() {
            let self = this
            this.sending = true
            this.errors.clean()
            axios.post('api/properties', this.form).then((response) => {
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
        }
    },
};
</script>
