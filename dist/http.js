// Every generated client issues its requests through this module.
//
// Credentials are handled in one place: the project token expires and changes when
// the active project changes, so setting the Authorization header at each call site
// would scatter the refresh logic and surface as intermittent 401s.
import axios from 'axios';
let instance;
let provider;
/** configure initialises the SDK. Call it once before use. */
export function configure(options) {
    provider = options.getToken;
    instance = axios.create({
        baseURL: options.baseURL,
        timeout: options.timeout ?? 30_000,
    });
}
/** request is the entry point used by the generated code. */
export async function request(config) {
    if (!instance) {
        throw new Error('SDK not initialised: call configure({ baseURL }) first');
    }
    const token = provider ? await provider() : '';
    const response = await instance.request({
        ...config,
        headers: {
            ...config.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    return response.data;
}
