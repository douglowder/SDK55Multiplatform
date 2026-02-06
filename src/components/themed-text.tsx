import { Platform, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?:
    | 'default'
    | 'title'
    | 'small'
    | 'smallBold'
    | 'subtitle'
    | 'link'
    | 'linkPrimary'
    | 'code';
  themeColor?: ThemeColor;
  className?: string;
};

const typeToClassName: Record<NonNullable<ThemedTextProps['type']>, string> = {
  default: 'text-default',
  title: 'text-title',
  small: 'text-small',
  smallBold: 'text-small-bold',
  subtitle: 'text-subtitle',
  link: 'text-link',
  linkPrimary: 'text-link-primary',
  code: 'text-code',
};

export function ThemedText({
  style,
  type = 'default',
  themeColor,
  className,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();
  const typeClassName = typeToClassName[type];
  const combinedClassName = className ? `${typeClassName} ${className}` : typeClassName;

  return (
    <Text
      className={combinedClassName}
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'code' && {
          fontFamily: Fonts.mono,
          fontWeight: Platform.select({ android: 700 }) ?? 500,
        },
        type === 'linkPrimary' && { color: '#3c87f7' },
        style,
      ]}
      {...rest}
    />
  );
}
