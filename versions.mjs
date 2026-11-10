// The one place documentation versions are defined.
// To add a version: copy the newest folder (e.g. 17/) to a new one (18/), add an
// entry here and move `latest: true` to it. Nothing else needs to change.
export const versions = [
	{ id: '17', label: 'UmbCheckout 17', folder: './17', latest: true },
	{ id: '13', label: 'UmbCheckout 13', folder: './13' },
];

export const latestVersion = versions.find((v) => v.latest) ?? versions[0];
