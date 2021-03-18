import * as ko from 'knockout'

type MaybePromise<T> = Promise<T> | T

type E = HTMLCanvasElement
type T = {
	init?(ctx: RenderingContext, canvas: HTMLCanvasElement): MaybePromise<void>
	update?(ctx: RenderingContext, delta: number, canvas: HTMLCanvasElement): MaybePromise<void>
	once?: boolean
	type?: '2d' | 'bitmaprenderer' | 'webgl' | 'webgl2'
}

export default class implements ko.BindingHandler {
	init(element: E, valueAccessor: () => ko.MaybeObservable<T>): void {
		const options = ko.unwrap(valueAccessor())

		const canvas = element
		const ctx = canvas.getContext(options.type ?? '2d') as RenderingContext

		if (!ctx)
			throw new Error('Unable to get 2d context from canvas.')

		let draw = false

		async function start(): Promise<void> {
			if (draw) return
			draw = true

			let timeBefore: number

			while (options.once !== true && options.update && draw) {
				if (blur && Date.now() - lastMouseMovement > 5000)
					draw = false

				await new Promise<MaybePromise<void>>(resolve =>
					window.requestAnimationFrame(time => {
						const delta = timeBefore ? time - timeBefore : 0
						timeBefore = time
						resolve(options.update?.(ctx, delta, canvas))
					})
				)
			}
		}

		function stop(): void {
			draw = false
		}

		let blur = false
		let lastMouseMovement = Date.now()

		window.addEventListener('mousemove', () => {
			lastMouseMovement = Date.now()
			if (blur) start()
		})
		window.addEventListener('focus', () => {
			blur = false
			start()
		})
		window.addEventListener('blur', () => {
			blur = true
			stop()
		})

		async function main(): Promise<void> {
			await options.init?.(ctx, canvas)

			start()
		}

		main()
	}
}