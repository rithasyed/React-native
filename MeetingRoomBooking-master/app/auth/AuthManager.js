/*
 * Meeting room Booking System
 *
 * Developed by Prishan Maduka on 11/4/19 11:07 PM.
 * Last modified 11/4/19 11:07 PM
 * Copyright (c) 2019. All rights reserved Prishan Maduka
 */

import {AuthConfig} from './AuthConfig';
import {authorize, refresh} from 'react-native-app-auth';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

const config = {
    clientId: AuthConfig.appId,
    redirectUrl: Platform.OS === 'ios' ? 'urn:ietf:wg:oauth:2.0:oob' : 'com.meetingrooms://react-native-auth',
    scopes: AuthConfig.appScopes,
    additionalParameters: { prompt: 'select_account' },
    serviceConfiguration: {
        authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
        tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    }
};

export class AuthManager {

    static signInAsync = async () => {
        const result = await authorize(config);
        console.log(result);
        // Store the access token, refresh token, and expiration time in storage
        await AsyncStorage.setItem('userToken', result.accessToken);
        await AsyncStorage.setItem('refreshToken', result.refreshToken);
        await AsyncStorage.setItem('expireTime', result.accessTokenExpirationDate);
    };

    static signOutAsync = async () => {
        // Clear storage
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('expireTime');
    };

    static getAccessTokenAsync = async() => {
        const expireTime = await AsyncStorage.getItem('expireTime');

        if (expireTime !== null) {
            // Get expiration time - 5 minutes
            // If it's <= 5 minutes before expiration, then refresh
            const expire = moment(expireTime).subtract(5, 'minutes');
            const now = moment();

            if (now.isSameOrAfter(expire)) {
                // Expired, refresh
                const refreshToken = await AsyncStorage.getItem('refreshToken');

                const result = await refresh(config, {refreshToken: refreshToken});

                // Store the new access token, refresh token, and expiration time in storage
                await AsyncStorage.setItem('userToken', result.accessToken);
                await AsyncStorage.setItem('refreshToken', result.refreshToken);
                await AsyncStorage.setItem('expireTime', result.accessTokenExpirationDate);

                return result.accessToken;
            }

            // Not expired, just return saved access token
            return await AsyncStorage.getItem('userToken');
        }

        return null;
    }
}


