export const formatPhoneNumber = (phoneNumber: number): string => {
	const phoneNumberString = phoneNumber.toString()
	const areaCode = phoneNumberString.slice(0, 3)
	const prefix = phoneNumberString.slice(3, 6)
	const lineNumber = phoneNumberString.slice(6, 10)

	return `(${areaCode}) ${prefix}-${lineNumber}`
}
