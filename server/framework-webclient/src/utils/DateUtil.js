import moment from 'moment';

export function toStringRange(dateRange)
{
	if(dateRange && dateRange instanceof Array && dateRange.length == 2)
	{
		var stringRange = new Array(2);

        for(var i = 0; i < 2; i++)
        {
            var date = dateRange[i];

            if(date)
            {
                var dateString = date.format('YYYY-MM-DD');
                stringRange[i] = dateString;
            }
            else
            {
                stringRange[i] = '';
            }
        }

        return stringRange;
	}
}