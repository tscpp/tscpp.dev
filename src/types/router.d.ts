import { Context, IContext } from '@profiscience/knockout-contrib-router'

declare module '@profiscience/knockout-contrib-router' {
	type Ctx = Context & IContext
}