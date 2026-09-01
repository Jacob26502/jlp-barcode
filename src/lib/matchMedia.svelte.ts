import { browser } from '$app/environment';

export function createIsMobile(query = '(max-width: 767px)') {
	let matches = $state(false);
	$effect(() => {
		if (!browser) return;
		const mql = window.matchMedia(query);
		matches = mql.matches;
		const onChange = (e: MediaQueryListEvent) => (matches = e.matches);
		mql.addEventListener('change', onChange);
		return () => mql.removeEventListener('change', onChange);
	});
	return {
		get current() {
			return matches;
		}
	};
}
