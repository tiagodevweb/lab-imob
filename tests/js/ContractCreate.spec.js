import moxios from 'moxios'
import { mount, createLocalVue } from '@vue/test-utils'
import ContractCreate from '../../resources/js/components/ContractCreate'
import VueMask from 'v-mask'

const localVue = createLocalVue();
localVue.use(VueMask);

describe('ContractCreate', () => {

    let wrapper

    beforeEach(() => {
        moxios.install()

        wrapper = mount(ContractCreate, {
            localVue
        })
    });

    afterEach(function () {
        moxios.uninstall()
    })

    describe('Initial State', () => {

        test('form must be empty', () => {
            seeFormEmpty()
        });

        test('there should be no validation error', () => {
            expect(wrapper.find('div.invalid-feedback').exists()).toBe(false)
        });

        test('there should be no api return message', () => {
            expect(wrapper.find('strong#message').isVisible()).toBe(false)
        });
        
    });

    describe('Validation', () => {

        describe('Required', () => {

            test('should return error when property_id is empty', done => {

                simulateError('property_id', 'The property_id field is required.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The property_id field is required.')
                    done()
                })
            })
            
            test('should return error when person is empty', done => {

                simulateError('person', 'The person field is required.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The person field is required.')
                    done()
                })
            })

            test('should return error when document is empty', done => {

                simulateError('document', 'The document field is required.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The document field is required.')
                    done()
                })
            })

            test('should return error when email is empty', done => {

                simulateError('email', 'The email field is required.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The email field is required.')
                    done()
                })
            })

            test('should return error when full name is empty', done => {

                simulateError('full_name', 'The full_name field is required.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The full_name field is required.')
                    done()
                })
            })
        })

        describe('Email', () => {

            test('should return error when email is invalid', done => {

                simulateError('email', 'The email must be a valid email address.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The email must be a valid email address.')
                    done()
                })
            })

        })

        describe('Valid Document', () => {

            test('should return error when CPF is invalid', done => {

                simulateError('document', 'The document must be a valid CPF.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The document must be a valid CPF.')
                    done()
                })
            })

            test('should return error when CNPJ is invalid', done => {

                simulateError('document', 'The document must be a valid CNPJ.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The document must be a valid CNPJ.')
                    done()
                })
            })

        })

        describe('Max', () => {

            test('should return error when the property_id is longer than 255 characters', done => {

                simulateError('property_id', 'The property_id may not be greater than 255 characters.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The property_id may not be greater than 255 characters.')
                    done()
                })
            });

            test('should return error when the person is longer than 15 characters', done => {

                simulateError('person', 'The person may not be greater than 15 characters.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The person may not be greater than 15 characters.')
                    done()
                })
            });

            test('should return error when the email is longer than 100 characters', done => {

                simulateError('email', 'The email may not be greater than 100 characters.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The email may not be greater than 100 characters.')
                    done()
                })
            });

            test('should return error when the full name is longer than 30 characters', done => {

                simulateError('full_name', 'The full_name may not be greater than 30 characters.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The full_name may not be greater than 30 characters.')
                    done()
                })
            });

        })
    
        describe('String', () => {

            test('should return error when property_id is not a string', done => {

                simulateError('property_id', 'The property_id must be a string.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The property_id must be a string.')
                    done()
                })
            })

            test('should return error when person is not a string', done => {

                simulateError('person', 'The person must be a string.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The person must be a string.')
                    done()
                })
            })

            test('should return error when document is not a string', done => {

                simulateError('document', 'The document must be a string.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The document must be a string.')
                    done()
                })
            })

            test('should return error when full name is not a string', done => {

                simulateError('full_name', 'The full_name must be a string.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The full_name must be a string.')
                    done()
                })
            })

        })
    })

    describe('Server Error', () => {
        
        test('should show error message when an unexpected error occurs', done => {

            simulateServerError()

            clickIn('button[type="submit"]')
        
            moxios.wait(function () {
                expect(wrapper.find('#message').classes('text-danger')).toBe(true)
                see('An unexpected error occurred, please try again later.')
                done()
            })
        })
    })

    describe('Store', () => {

        test('must must clear form when property is saved', done => {
            
            simulateSuccess()

            wrapper.setData({
                form: {
                    property: 'any_property',
                    person: 'any_person',
                    document: 'any_document',
                    email: 'any_email@domail.com',
                    full_name: 'any_full_name'
                }
            });

            clickIn('button[type="submit"]')
        
            moxios.wait(function () {
                seeFormEmpty()
                done()
            })

        });
        
        test('must show success message when contract is saved', done => {

            simulateSuccess()

            clickIn('button[type="submit"]')
        
            moxios.wait(function () {
                see('Successfully created contract.')
                done()
            })
        })
    })

    let clickIn = (selector) => {
        wrapper.find(selector).trigger('click')
    }

    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper

        expect(wrap.html()).toContain(text)
    }

    let seeInput = (selector, value) => {
        expect(wrapper.find(selector).element.value).toBe(value)
    }

    let seeFormEmpty = () => {
        seeInput('select[name="property_id"]', '')
        seeInput('select[name="person"]', '')
        seeInput('input[name="document"]', '')
        seeInput('input[name="email"]', '')
        seeInput('input[name="full_name"]', '')
    }

    let simulateError = (field, message) => {
        let errors = {}

        errors[field] = [message]

        moxios.stubRequest('api/contracts', {
            status: 422,
            response: {
                errors
            }
        })
    }

    let simulateServerError = () => {

        moxios.stubRequest('api/contracts', {
            status: 500,
            response: {
                message: "An unexpected error occurred, please try again later."
            }
        })
    }

    let simulateSuccess = () => {

        moxios.stubRequest('api/contracts', {
            status: 201,
            response: {
                message: "Successfully created contract."
            }
        })
    }
})
