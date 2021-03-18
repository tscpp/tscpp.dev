import '@/components/RootBack'
import './style.scss'

import template from './template.html'
import ViewModel from './viewmodel'
import { components } from 'knockout'

const component = new class implements components.Config {
	id = 'views_projects'
	template = template
	viewModel = ViewModel
}

if (!components.isRegistered(component.id))
	components.register(component.id, component)

export default component
