import "express";

type TApiKeys = {
    api_key: string,
    id: string,
    profile_id: string,
    project_id: string,
    project_code: string,
    created_at: string,
    updated_at: string
}


declare module "express" {
    export interface Request {
        apiKey?: TApiKeys;
    }
}

