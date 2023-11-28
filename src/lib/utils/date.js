export function dateString(date) {
	// Get individual components
	var year = date.getFullYear();
	var month = date.getMonth() + 1; // Months are zero-based, so add 1
	var day = date.getDate();

	// Format the date part
	var formattedDate = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '-' +  '/' +  year;

	return formattedDate;

	//return date.toISOString().split('T')[0];
}
