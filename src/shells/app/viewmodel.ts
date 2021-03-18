// import * as ko from 'knockout'
// import { observableArray } from 'knockout-decorators'

class Star {
	constructor(
		public x: number,
		public y: number,
		public d: number
	) { }

	static size = 1.5
	static minSize = 0.58
	static speed = 0.0075
	static distance = 1
	static movementImpact = 0.015
}

export default class {
	stars: Star[] = []

	banner = {
		movementX: 0,
		movementY: 0,

		init: (_ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void => {
			canvas.width = screen.width
			canvas.height = screen.height

			if (this.stars.length <= 0)
				this.stars = new Array(Math.floor(screen.width / 2)).fill(0).map(() => new Star(
					Math.random() * -(canvas.width * 4) + canvas.width,
					Math.random() * -(canvas.height * 4) + canvas.width,
					Math.random()
				))

			window.addEventListener('mousemove', event => {
				if (event.movementX == null || event.movementY == null)
					return

				this.banner.movementX += event.movementX
				this.banner.movementY += event.movementY
			})

			window.addEventListener('resize', () => {
				if (canvas.width < document.body.offsetWidth)
					canvas.width = document.body.offsetWidth
				if (canvas.height < document.body.offsetHeight)
					canvas.height = document.body.offsetHeight
			})
		},

		update: (ctx: CanvasRenderingContext2D, delta: number, canvas: HTMLCanvasElement): void => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			ctx.fillStyle = 'white'

			for (const star of this.stars) {
				ctx.beginPath()
				ctx.arc(star.x, star.y, Math.max(star.d, Star.minSize) * Star.distance * Star.size, 0, Math.PI * 2, false)
				ctx.fill()

				const dis = Math.floor(delta) * Star.speed * star.d * Star.distance

				star.x += dis
				star.y -= dis

				star.x -= this.banner.movementX * Star.movementImpact * star.d
				star.y -= this.banner.movementY * Star.movementImpact * star.d

				if (star.y < -10 || star.x > canvas.width + 10) {
					star.x = -100
					star.y = -100
				}
			}

			this.banner.movementX = 0
			this.banner.movementY = 0
		}
	}
}