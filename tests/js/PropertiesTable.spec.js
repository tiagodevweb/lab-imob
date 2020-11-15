import faker, { fake } from 'faker'
import moxios from 'moxios'
import { mount } from '@vue/test-utils'
import PropertiesTable from '../../resources/js/components/PropertiesTable'
import { Collapse } from 'bootstrap'

describe('PropertiesTable', () => {

    let wrapper

    beforeEach(() => {
        moxios.install()

        wrapper = mount(PropertiesTable)
    });

    afterEach(function () {
        moxios.uninstall()
    })

    test('initial state', done => {

        expect(wrapper.vm.properties).toHaveLength(0)
        expect(wrapper.vm.loading).toBeTruthy()
        expect(wrapper.vm.error).toBeFalsy()

        let email = faker.internet.email()
        let street = faker.address.streetName()
        let number = faker.random.number()
        let city = faker.address.city()
        let state = faker.address.state()

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: [
                    {
                        id: 1,
                        email: email,
                        street: street,
                        number: number,
                        city: city,
                        state: state
                }
                ]
            }).then(() => {
                see('#1')
                see(email)
                see(`Rua: ${street} Nº ${number}, ${city}, ${state}`)
                done()
            })
        })
    });

    test('should show error message when status is not in the 200\'s', done => {
        
        moxios.stubRequest('api/properties', {
            status: 500,
            response: {
                message: "An unexpected error occurred, please try again later."
            }
        })

        clickIn('#get-all')
        
        moxios.wait(() => {
            see('An unexpected error occurred, please try again later.')
            done()
        })
    });

    test('must show loading before showing properties', () => {
        
        moxios.stubRequest('api/properties', {
            status: 200,
            response: [
                {
                    email: "email1@email.com",
                    street: "Street 1",
                    number: "123",
                    city: 'City 1',
                    state: 'State 1'
            },
                {
                    email: "email2@email.com",
                    street: "Street 2",
                    number: "456",
                    city: 'City 2',
                    state: 'State 2'
            }
            ]
        })

        clickIn('#get-all')

        see('Carregando...')
    });

    test('must sort by descending id when clicking on the head of the id column', done => {

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: [
                    {
                        id: 1,
                        email: faker.internet.email(),
                        street: faker.address.streetName(),
                        number: faker.random.number(),
                        city: faker.address.city(),
                        state: faker.address.state()
                },
                    {
                        id: 2,
                        email: faker.internet.email(),
                        street: faker.address.streetName(),
                        number: faker.random.number(),
                        city: faker.address.city(),
                        state: faker.address.state()
                }
                ]
            }).then(() => {
                expect(wrapper.find('td:nth-of-type(1)').text()).toBe('#1')

                clickIn('#switchSortId')

                wrapper.vm.$nextTick(() => {
                    expect(wrapper.find('td:nth-of-type(1)').text()).toBe('#2')
                })

                done()
            })
        })
    });

    test('must delete property in the database', done => {

        let email = faker.internet.email()
        let street = faker.address.streetName()
        let number = faker.random.number()
        let city = faker.address.city()
        let state = faker.address.state()
        let contracted = faker.random.boolean()

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: [
                    {
                        id: 1,
                        email: email,
                        street: street,
                        number: number,
                        city: city,
                        state: state,
                        contracted
                }
                ]
            }).then(() => {
                clickIn('td:nth-of-type(6) > a')

                wrapper.vm.$nextTick(() => {
                    see('Deseja excluir definitivamente a propriedade abaixo?')
                    see(`Proprietário: ${email}`)
                    see(`Endereço: Rua: ${street} Nº ${number}, ${city}, ${state}`)
                    see(`Contratada: ${contracted ? 'Sim' : 'Não'}`)
    
                    clickIn('button#delete')
            
                    moxios.wait(() => {
                        let request = moxios.requests.mostRecent()
                        request.respondWith({
                            status: 204
                        }).then(() => {
                            expect(wrapper.html()).not.toContain(email)
                            see('Adicione a primeira propriedade!')
                            done()
                        })
                    })
                })
            })
        })
    });

    let clickIn = (selector) => {
        wrapper.find(selector).trigger('click')
    }

    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper

        expect(wrap.html()).toContain(text)
    }
})
