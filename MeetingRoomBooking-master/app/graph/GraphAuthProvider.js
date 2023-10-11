/*
 * Meeting room Booking System
 *
 * Developed by Prishan Maduka on 11/5/19 5:28 PM.
 * Last modified 11/5/19 5:28 PM
 * Copyright (c) 2019. All rights reserved Prishan Maduka
 */

import {AuthManager} from '../auth/AuthManager';

export class GraphAuthProvider {

    getAccessToken = async() => {
        return await AuthManager.getAccessTokenAsync();
    }
}

