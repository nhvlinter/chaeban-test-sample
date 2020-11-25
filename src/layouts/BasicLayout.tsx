import React, { FC, CSSProperties } from 'react';
import { observer } from 'mobx-react-lite';

import { SiderMenuWrapper } from '../components/SiderMenu';
import { HeaderView } from './Header';
import { createMuiTheme, ThemeProvider, ThemeOptions, useTheme } from '@material-ui/core/styles';
import { useStore } from '../stores';

import styles from './BasicLayout.module.scss';

export const BasicLayout: FC = observer(({ children }) => {
    const { sChaeban} = useStore();
    const theme = useTheme();
  return (
    <ThemeProvider key={sChaeban.themeId} theme={sChaeban.theme}>
        <div className={styles.root}>
            <HeaderView />
            <SiderMenuWrapper />
            <main className={styles.content}>
                {children}
            </main>
        </div>
    </ThemeProvider>)
});
