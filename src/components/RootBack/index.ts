import './style.scss'

import template from './template.html'
import { components } from 'knockout'

const component = new class implements components.Config {
	name = 'root-back'
	template = template
}

if (!components.isRegistered(component.name))
	components.register(component.name, component)

export default component
	