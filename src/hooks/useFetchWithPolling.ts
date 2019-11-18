import { useCallback, useEffect, useState } from 'react';

/**
 *
 * @param uri
 * @param delay
 */
export const useFetchWithPolling = <T>(
    uri: string,
    delay: number = 5000
) => {
    const [data, setData] = useState<null | T>(null);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<null | any>(null);
    const [shallFetch, setShallFetch] = useState(false);

    const doRequest = useCallback(() => setShallFetch(true), []);

    useEffect(() => {
        const abortController = typeof AbortController !== "undefined"
            ? new AbortController()
            : undefined
        ;
        const signal = abortController && abortController.signal;

        /** define the timer **/
        let interval: NodeJS.Timeout;

        const callRequest = () => {
            setLoading(true);
            setFetchError(null);

            fetch(uri, { signal })
                .then(response => response.json())
                .then((data: T) => {
                    setData(data);
                    setLoading(false);
                })
                .catch(e => {
                    if (e.name !== "AbortError") {
                        setFetchError(e);
                        setLoading(false);
                    }
                })
        };

        if (shallFetch) {
            callRequest();
            /** call that function every "delay" time **/
            interval = setInterval(() => {
                callRequest();
            }, delay);
        }

        return () => {
            if (abortController) {
                abortController.abort();
            }
            /** Don't forget to clear the timeout **/
             clearTimeout(interval);
        }
    }, [shallFetch, uri, delay]);

    return {
        data,
        loading,
        fetchError,
        doRequest,
    };
};
