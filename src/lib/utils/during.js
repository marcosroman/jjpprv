function duringProcessString(process) {
	switch (process) {
		case 'pr':
			return 'Proceso';
			break;
		case 'ia':
			return 'Auditoria Interna';
			break;
		case 'ea':
			return 'Auditoria Externa';
			break;
		default:
			return 'Error (process)';
	}
}

export default duringProcessString;
