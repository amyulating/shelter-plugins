const {
	flux: { intercept },
} = shelter;

function getRandomArrayMember(arr) {
	if (arr.length === 0) {
		return null;
	}

	const randomIndex = Math.floor(Math.random() * arr.length);

	return arr[randomIndex];
}

function createRandomBullshit(length) {
	let bullshit = ""
	const bullshitChars = 'qwertyuiopasdfghjklzxcvbnm1234567890'.split("")
	for (let i = 0; i <= length; i++) {
		let temp = getRandomArrayMember(bullshitChars)
		if (Math.random() > 0.5) {
			bullshit += temp.toUpperCase()
		} else {
			bullshit += temp
		}
	}
	return bullshit
}

const unintercept = intercept((dispatch) => {
	if (dispatch?.type === "UPLOAD_ATTACHMENT_ADD_FILES") {
		dispatch?.files?.forEach(({ file }) => {
			if (!file?.name) return;

			let newFilename = createRandomBullshit(10)

			if (file.name.includes(".")) {
				const dotIndex = file.name.lastIndexOf(".")

				// append file extension(s)
				newFilename += file.name.slice(dotIndex);
			}

			Object.defineProperty(file, "name", {
				value: newFilename
			});
		});
		return dispatch;
	}
});

export function onUnload() {
	unintercept();
}
