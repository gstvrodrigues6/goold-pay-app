import { Href, Link, LinkProps } from 'expo-router';
import { ReactNode } from 'react';
import { Text } from 'react-native';

interface LinkDefaultProps extends Omit<LinkProps, 'children' | 'href'> {
  children: ReactNode;
  href: Href;
}

export const LinkDefault = ({
  children,
  href,
  ...props
}: LinkDefaultProps) => {
  return (
    <Link
      href={href}
      className='rounded-md text-center px-5 py-4 bg-primary'
      {...props}
    >
      <Text className='font-semibold text-white text-lg'>
        {children}
      </Text>
    </Link>
  );
};