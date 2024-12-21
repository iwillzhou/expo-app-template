import { Href, router } from 'expo-router';

export function reset(href: Href) {
    while (router.canGoBack()) {
        router.back();
    }
    router.replace(href);
}
