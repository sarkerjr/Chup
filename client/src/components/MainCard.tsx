import { forwardRef, ReactNode, Ref } from 'react';
import {
  Card,
  CardContent as MuiCardContent,
  CardHeader,
  Divider,
  Typography,
  styled,
} from '@mui/material';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
};

const CardContent = styled(MuiCardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);

interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  children?: ReactNode;
  content?: boolean;
  contentClass?: string;
  contentSX?: Record<string, unknown>;
  darkTitle?: boolean;
  secondary?: ReactNode | string | object;
  shadow?: string | number;
  sx?: Record<string, unknown>;
  title?: ReactNode;
  action?: ReactNode;
}

const MainCard = forwardRef(
  (
    {
      border = false,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      action,
      ...others
    }: MainCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <Card ref={ref} {...others} sx={{ ...sx }}>
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader sx={headerSX} title={title} action={action} />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={headerSX}
            title={<Typography variant="h3">{title}</Typography>}
            action={action}
          />
        )}

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard;
