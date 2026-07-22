import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Shared = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'sm';
  className?: string;
};

type ButtonAsButton = Shared &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
    href?: undefined;
  };

type ButtonAsLink = Shared &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button(props: ButtonProps) {
  const { children, variant = 'primary', size = 'md', className = '', ...rest } = props;
  const classes = `btn btn-${variant}${size === 'sm' ? ' btn-sm' : ''} ${className}`.trim();

  if ('href' in props && props.href) {
    const anchorProps = rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'>;
    return (
      <a href={props.href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { type = 'button', ...buttonProps } = rest as Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'className'
  >;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
