import { parseISO, format } from 'date-fns';
import { es } from 'date-fns/locale';

export function dateString(date) {
	if (date) {
		const formattedDate =  format(parseISO(date), 'dd/MMMM/yyyy', { locale: es });

		return formattedDate;
	} else return "";
}

