import { mount } from '@vue/test-utils'
import ExampleComponent from '../../resources/js/components/ExampleComponent'

test('it works', () => {
    expect(1 + 1).toBe(2)
})

test('should mount without crashing', () => {
    let wrapper = mount(ExampleComponent)
    
    expect(wrapper.html()).toContain('Example Component')
})