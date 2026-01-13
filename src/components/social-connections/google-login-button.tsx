import { useEffect } from 'react';
import { supabase } from 'src/api';
import { Image } from 'expo-image';
import Constants from 'expo-constants';
import { Button } from 'src/components/ui';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export function GoogleLogInButton() {
    const scheme = Constants.expoConfig?.scheme;

    function extractParamsFromUrl(url: string) {
        const parsedUrl = new URL(url);
        const hash = parsedUrl.hash.substring(1); // Remove the leading '#'
        const params = new URLSearchParams(hash);

        return {
            access_token: params.get('access_token'),
            expires_in: parseInt(params.get('expires_in') || '0'),
            refresh_token: params.get('refresh_token'),
            token_type: params.get('token_type'),
            provider_token: params.get('provider_token'),
            code: params.get('code')
        };
    }

    async function onSignInButtonPress() {
        console.debug('onSignInButtonPress - start');
        const res = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${scheme}://google-auth`,
                queryParams: { prompt: 'consent' },
                skipBrowserRedirect: true
            }
        });

        const googleOAuthUrl = res.data.url;

        if (!googleOAuthUrl) {
            console.error('no oauth url found!');
            return;
        }

        const result = await WebBrowser.openAuthSessionAsync(googleOAuthUrl, `${scheme}://google-auth`, {
            showInRecents: true
        }).catch(err => {
            console.error('onSignInButtonPress - openAuthSessionAsync - error', { err });
            console.log(err);
        });

        console.debug('onSignInButtonPress - openAuthSessionAsync - result', { result });

        if (result && result.type === 'success') {
            console.debug('onSignInButtonPress - openAuthSessionAsync - success');
            const params = extractParamsFromUrl(result.url);
            console.debug('onSignInButtonPress - openAuthSessionAsync - success', { params });

            if (params.access_token && params.refresh_token) {
                console.debug('onSignInButtonPress - setSession');
                const { data, error } = await supabase.auth.setSession({
                    access_token: params.access_token,
                    refresh_token: params.refresh_token
                });
                console.debug('onSignInButtonPress - setSession - success', { data, error });
                return;
            } else {
                console.error('onSignInButtonPress - setSession - failed');
                // sign in/up failed
            }
        } else {
            console.error('onSignInButtonPress - openAuthSessionAsync - failed');
        }
    }

    // to warm up the browser
    useEffect(() => {
        WebBrowser.warmUpAsync();

        return () => {
            WebBrowser.coolDownAsync();
        };
    }, []);

    return (
        <Button variant="outline" size="sm" className="flex-1" onPress={onSignInButtonPress}>
            <Image
                source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                style={{ width: 16, height: 16 }}
            />
        </Button>
    );
}
