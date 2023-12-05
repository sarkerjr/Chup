import * as React from 'react';
import Avatar, { AvatarProps } from '@/components/Avatar';

interface LetterAvatarProps extends AvatarProps {
  name: string;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string?.length; i += 1) {
    hash = string?.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  const trimmedName = name?.trim();
  const nameParts = trimmedName ? trimmedName.split(' ') : [];

  // Get the first character of each part of the name if available
  const firstInitial = nameParts.length > 0 ? nameParts[0][0] : '';
  const secondInitial = nameParts.length > 1 ? nameParts[1][0] : firstInitial; // Use the first initial if there's no second part

  if (!firstInitial) {
    return null;
  }

  return {
    sx: {
      bgcolor: stringToColor(trimmedName),
    },
    children: `${firstInitial}${secondInitial}`,
  };
}

const LetterAvatar: React.FC<LetterAvatarProps> = ({ name, size }) => {
  return <Avatar size={size} {...stringAvatar(name)} />;
};

export default LetterAvatar;
