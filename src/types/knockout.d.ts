import * as _ko from '../../node_modules/knockout/build/types/knockout'

declare global {
	declare namespace ko {
		export interface Punches {
			enableAll(): void
			interpolationMarkup: punches.InterpolationMarkup
			attributeInterpolationMarkup: punches.AttributeInterpolationMarkup
			textFilter: punches.TextFilter
			namespacedBinding: punches.NamespacedBinding
			wrappedCallback: punches.WrappedCallback
			preprocessBindingProperty: punches.PreprocessBindingProperty
			utils: punches.Utils
			expressionCallback: punches.ExpressionCallback
		}
	
		export namespace punches {
			export interface InterpolationMarkup {
				enable(): void
				wrapExpression(expressionText: string)
				preprocessor(node: Node)
			}
	
			export interface AttributeInterpolationMarkup {
				enable(): void
				attributeBinding(name: string, value: string, node?: any)
				preprocessor(node: Node)
			}
	
			export interface TextFilter {
				enableForBinding(binding: _ko.BindingHandler | string): void
				preprocessor(input: string)
			}
	
			export interface NamespacedBinding {
				enableForBinding(binding: _ko.BindingHandler | string): void
				defaultGetHandler(name: string, namespace: any, namespacedName: string): void
				addDefaultBindingPreprocessor(namespace: any, preprocessFn: (val: string) => string): void
				/**
				 * @deprecated Use addDefaultBindingPreprocessor instead
				 */
				setDefaultBindingPreprocessor: NamespacedBinding['addDefaultBindingPreprocessor']
				preprocessor(value: any, binding: _ko.BindingHandler | string, addBinding: Function): void
			}
	
			export interface WrappedCallback {
				enableForBinding(binding: _ko.BindingHandler | string): void
				preprocessor(val: string): string
			}
	
			export interface PreprocessBindingProperty {
				addPreprocessor(binding: _ko.BindingHandler | string, property: string, preprocessFn: (val: string) => string)
				/**
				 * @deprecated Use addPreprocessor instead
				 */
				setPreprocessor: PreprocessBindingProperty['addPreprocessor']
			}
	
			export interface Utils {
				addBindingPreprocessor(binding: _ko.BindingHandler | string, preprocessFn: (val: string) => string)
				addNodePreprocessor(preprocessFn: (val: string) => string)
				addBindingHandlerCreator(matchRegex: RegExp, callbackFn: (match: RegExpMatchArray, bindingKey: string) => _ko.BindingHandler): _ko.BindingHandler
				/**
				 * @deprecated Use addBindingPreprocessor instead
				 */
				setBindingPreprocessor: Utils['addBindingPreprocessor']
				/**
				 * @deprecated Use addNodePreprocessor instead
				 */
				setNodePreprocessor: Utils['addNodePreprocessor']
			}
	
			export interface ExpressionCallback {
				makePreprocessor(args: string)
				eventPreprocessor(val: string): string
				enableForBinding(binding: _ko.BindingHandler | string, args: string): void
			}
		}
	
		export interface Filter {
			(value: any, ...args: any[]): string
		}
	
		export interface Filters {
			[key: string]: Filter
			uppercase: Filter
			lowercase: Filter
			default: Filter
			replace: Filter
			fit: Filter
			json: Filter
			number: Filter
		}
	
		export interface BindingHandlersOn {
			getNamespacedHandler(event: string): _ko.BindingHandler
		}
	
		export interface BindingHandlers {
			[name: string]: BindingHandler
			on: BindingHandlersOn
		}
	
		export interface BindingProvider {
			instance: bindingProvider.Instance
		}
	
		export namespace bindingProvider {
			export interface Instance {
				preprocessNode(node: Node): void
			}
		}
	
		export let punches: Punches
	
		export let filters: Filters
	
		export let bindingHandlers: BindingHandlers
	
		export let getBindingHandler
	
		export let bindingProvider: BindingProvider
	}
}
