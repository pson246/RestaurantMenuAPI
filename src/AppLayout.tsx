import { Layout, LayoutProps } from 'react-admin';
import { JSX } from 'react/jsx-runtime';
import { AppMenu } from './AppMenu';

export const AppLayout = (props: JSX.IntrinsicAttributes & LayoutProps) => <Layout {...props} menu={AppMenu} />;