import { createClient } from '@supabase/supabase-js';

import { clientKeys } from '../../utils/supabase/client-keys';


export function browserClient() {
    try {
        const { clientUrl, clientAnonKey } = clientKeys();

        if (!clientUrl || !clientAnonKey) throw new Error('Missing clientUrl or clientAnonKey');

        return createClient(clientUrl, clientAnonKey, {
            auth: {
                flowType: 'pkce'
            }
        });
    } catch (error) {
        throw error
    }

}