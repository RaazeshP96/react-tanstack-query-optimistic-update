export let currentColor: string = '#ffffff'

const delay = (ms: number) => new Promise<void>((res) => setTimeout(res, ms))

export async function fetchColor(): Promise<string> {
	await delay(400)
	return currentColor
}

export async function setColor(nextColor: string): Promise<string> {
	await delay(800)
	if (Math.random() < 0.3) {
		throw new Error('Failed to update color')
	}
	currentColor = nextColor
	return currentColor
}
