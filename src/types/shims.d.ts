declare module 'raw-loader!*' {
	// Raw loader
	let text: string
	export default text
}

declare module '*.html' {
	export * from 'raw-loader!*'
}
