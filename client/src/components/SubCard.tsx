import { forwardRef, ReactNode, CSSProperties } from 'react';
import {
  useTheme,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';

interface SubCardProps {
  children?: ReactNode;
  content?: boolean;
  contentClass?: string;
  darkTitle?: boolean;
  secondary?: ReactNode | string | object;
  sx?: CSSProperties;
  contentSX?: CSSProperties;
  title?: ReactNode | string | object;
}

const SubCard = forwardRef<HTMLDivElement, SubCardProps>(
  (
    {
      children,
      content = true,
      contentClass = '',
      darkTitle,
      secondary,
      sx = {},
      contentSX = {},
      title,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        sx={{
          border: '1px solid',
          borderColor:
            theme.palette.mode === 'dark'
              ? theme.palette.divider
              : theme.palette.primary.light,
          ':hover': {
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0 2px 14px 0 rgb(33 150 243 / 10%)'
                : '0 2px 14px 0 rgb(32 40 45 / 8%)',
          },
          ...sx,
        }}
        {...others}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          // TODO: Fix this type error
          <CardHeader
            sx={{ p: 2.5 }}
            title={<Typography variant="h5">{title}</Typography>}
            action={secondary}
          />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={{ p: 2.5 }}
            title={<Typography variant="h4">{title}</Typography>}
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && (
          <Divider
            sx={{
              opacity: 1,
              borderColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.divider
                  : theme.palette.primary.light,
            }}
          />
        )}

        {/* card content */}
        {content && (
          <CardContent sx={{ p: 2.5, ...contentSX }} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

export default SubCard;
