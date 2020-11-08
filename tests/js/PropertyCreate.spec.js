import moxios from 'moxios'
import { mount } from '@vue/test-utils'
import PropertyCreate from '../../resources/js/components/PropertyCreate'

describe('PropertyCreate', () => {

    let wrapper

    beforeEach(() => {
        moxios.install()

        wrapper = mount(PropertyCreate)
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

            test('should return error when email is empty', done => {

                simulateError('email', 'The email field is required.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The email field is required.')
                    done()
                })
            })

            test('should return error when street is empty', done => {

                simulateError('street', 'The street field is required.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The street field is required.')
                    done()
                })
            })
            
            test('should return error when number is empty', done => {

                simulateError('number', 'The number field is required.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The number field is required.')
                    done()
                })
            })

            test('should return error when neighborhood is empty', done => {

                simulateError('neighborhood', 'The neighborhood field is required.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The neighborhood field is required.')
                    done()
                })
            })

            test('should return error when city is empty', done => {

                simulateError('city', 'The city field is required.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The city field is required.')
                    done()
                })
            })

            test('should return error when state is empty', done => {

                simulateError('state', 'The state field is required.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The state field is required.')
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

        describe('Max', () => {

            test('should return error when the email is longer than 100 characters', done => {

                simulateError('email', 'The email may not be greater than 100 characters.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The email may not be greater than 100 characters.')
                    done()
                })
            });

            test('should return error when the street is longer than 100 characters', done => {

                simulateError('street', 'The street may not be greater than 100 characters.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The street may not be greater than 100 characters.')
                    done()
                })
            });

            test('should return error when the number is longer than 15 characters', done => {

                simulateError('number', 'The number may not be greater than 15 characters.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The number may not be greater than 15 characters.')
                    done()
                })
            });

            test('should return error when the neighborhood is longer than 30 characters', done => {

                simulateError('neighborhood', 'The neighborhood may not be greater than 30 characters.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The neighborhood may not be greater than 30 characters.')
                    done()
                })
            });

            test('should return error when the city is longer than 30 characters', done => {

                simulateError('city', 'The city may not be greater than 30 characters.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The city may not be greater than 30 characters.')
                    done()
                })
            });

            test('should return error when the state is longer than 30 characters', done => {

                simulateError('state', 'The state may not be greater than 30 characters.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The state may not be greater than 30 characters.')
                    done()
                })
            });

        })
    
        describe('String', () => {

            test('should return error when street is not a string', done => {

                simulateError('street', 'The street must be a string.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The street must be a string.')
                    done()
                })
            })

            test('should return error when neighborhood is not a string', done => {

                simulateError('neighborhood', 'The neighborhood must be a string.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The neighborhood must be a string.')
                    done()
                })
            })

            test('should return error when city is not a string', done => {

                simulateError('city', 'The city must be a string.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The city must be a string.')
                    done()
                })
            })

            test('should return error when state is not a string', done => {

                simulateError('state', 'The state must be a string.')
        
                clickIn('button[type="submit"]')
        
                moxios.wait(function () {
                    see('The state must be a string.')
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
                    email: 'any_email@domail.com',
                    street: 'any_street',
                    number: 'any_number',
                    neighborhood: 'any_neighborhood',
                    city: 'any_city',
                    state: 'any_state'
                }
            });

            clickIn('button[type="submit"]')
        
            moxios.wait(function () {
                seeFormEmpty()
                done()
            })

        });
        
        test('must show success message when property is saved', done => {

            simulateSuccess()

            clickIn('button[type="submit"]')
        
            moxios.wait(function () {
                see('Successfully created property.')
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
        seeInput('input[name="email"]', '')
        seeInput('input[name="street"]', '')
        seeInput('input[name="number"]', '')
        seeInput('input[name="neighborhood"]', '')
        seeInput('input[name="city"]', '')
        seeInput('input[name="state"]', '')
    }

    let simulateError = (field, message) => {
        let errors = {}

        errors[field] = [message]

        moxios.stubRequest('api/properties', {
            status: 422,
            response: {
                errors
            }
        })
    }

    let simulateServerError = () => {

        moxios.stubRequest('api/properties', {
            status: 500,
            response: {
                message: "An unexpected error occurred, please try again later."
            }
        })
    }

    let simulateSuccess = () => {

        moxios.stubRequest('api/properties', {
            status: 201,
            response: {
                message: "Successfully created property."
            }
        })
    }
})
