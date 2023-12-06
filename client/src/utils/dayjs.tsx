import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default dayjs;

export const formatMessageTime = (timestamp) => {
  const now = dayjs();
  const messageDate = dayjs(timestamp);
  const diffInDays = now.diff(messageDate, 'day');

  if (diffInDays < 1) {
    // It's today
    return messageDate.fromNow();
  } else if (diffInDays === 1) {
    // It's yesterday
    return 'Yesterday';
  } else {
    // It's older than yesterday
    return messageDate.format('MM/DD/YYYY');
  }
};
