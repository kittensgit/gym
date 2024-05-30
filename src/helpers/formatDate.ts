import { format, formatDistanceStrict } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDate = (date: Date) => {
    return format(date, 'd MMMM, yyyy', {
        locale: ru,
    });
};

export const distanceDate = (date: Date) => {
    return formatDistanceStrict(new Date(), date, {
        locale: ru,
    });
};
