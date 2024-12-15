import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import { PageProps as AppPageProps } from './';

export interface ScrollManager {
    position: number;
    enable(): void;
    disable(): void;
}

declare global {
    interface Window {
        axios: AxiosInstance;
        scrollManager: ScrollManager;
    }

    /* eslint-disable no-var */
    var route: typeof ziggyRoute;
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}

export { type ScrollManager };
