import './style.scss'

import '@babel/polyfill'

import * as ko from 'knockout'
import '@/router'

import {
	altClickBindingHandler,
	ctrlClickBindingHandler,
	metaClickBindingHandler,
	shiftClickBindingHandler,
	draggableBindingHandler,
	toggleBindingHandler,
	formatDateFilter
} from '@profiscience/knockout-contrib'
import Draw from './handlers/draw'

ko.bindingHandlers['click.alt'] = altClickBindingHandler
ko.bindingHandlers['click.ctrl'] = ctrlClickBindingHandler
ko.bindingHandlers['click.meta'] = metaClickBindingHandler
ko.bindingHandlers['click.shift'] = shiftClickBindingHandler
ko.bindingHandlers.draggable = draggableBindingHandler
ko.bindingHandlers.toggle = toggleBindingHandler
ko.bindingHandlers.draw = new Draw

import 'knockout-punches'
ko.punches.enableAll()
ko.filters['date.format'] = formatDateFilter

import '@/shells/app'

function main() {
	ko.applyBindings({})
}

window.addEventListener('load', main)
