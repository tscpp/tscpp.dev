import {
	Route,
	Router,
	withRoutePlugin,
	redirectRoutePlugin,
	componentRoutePlugin,
	componentInitializerRoutePlugin,
	childrenRoutePlugin,
	componentsRoutePlugin,
	createTitleRoutePlugin,
	createScrollPositionMiddleware,
	Ctx
} from '@profiscience/knockout-contrib'

const title = document.title

Router.setConfig({
	hashbang: true
})

Route.usePlugin(
	// static (do not move)
	withRoutePlugin,
	redirectRoutePlugin,
	componentRoutePlugin,
	componentInitializerRoutePlugin,

	childrenRoutePlugin,
	componentsRoutePlugin,
	createTitleRoutePlugin(
		(titleSegments: string[]) => `${title} | ${titleSegments.join(' > ')}`
	)
)

Router.use(
	createScrollPositionMiddleware()
)

import Home from '@/views/home'
import Projects from '@/views/projects'
import Empty from '@/views/empty'

Router.useRoutes({
	'/': Home.id,
	'/home': (ctx: Ctx) => ctx.redirect('/'),
	'/projects': Projects.id,
	'/blog': Empty.id
})

export default Router
