import './style.scss'
import template from './template.html'
import ViewModel from './viewmodel'
import { components } from 'knockout'

const component = new class implements components.Config {
	name = 'shells/app'
	template = template
	viewModel = ViewModel
}

if (!components.isRegistered(component.name))
	components.register(component.name, component)

export default component
	