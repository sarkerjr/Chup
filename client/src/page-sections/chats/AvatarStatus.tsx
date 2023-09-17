import { useTheme } from '@mui/material/styles';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface AvatarStatusProps {
  status?: string;
  mr?: number;
}

const AvatarStatus: React.FC<AvatarStatusProps> = ({ status, mr }) => {
  const theme = useTheme();
  switch (status) {
    case 'available':
      return (
        <FiberManualRecordIcon
          sx={{
            cursor: 'pointer',
            color: theme.palette.success.dark,
            verticalAlign: 'middle',
            fontSize: '0.875rem',
            mr,
          }}
        />
      );

    case 'do_not_disturb':
      return (
        <FiberManualRecordIcon
          sx={{
            cursor: 'pointer',
            color: theme.palette.warning.dark,
            verticalAlign: 'middle',
            fontSize: '0.875rem',
            mr,
          }}
        />
      );

    case 'offline':
      return (
        <FiberManualRecordIcon
          sx={{
            cursor: 'pointer',
            color: theme.palette.error.dark,
            verticalAlign: 'middle',
            fontSize: '0.875rem',
            mr,
          }}
        />
      );

    default:
      return null;
  }
};

export default AvatarStatus;
