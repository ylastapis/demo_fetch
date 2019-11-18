import { useCallback, useEffect, useState } from 'react';

/**
 * Same as useFetchOnDemand plus implementation of the AbortController
 */
export const useFetchWithAbortController = <T>(
    uri: string
) => {
    const [data, setData] = useState<null | T>(null);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<null | any>(null);
    const [shallFetch, setShallFetch] = useState(false);

    const doRequest = useCallback(() => setShallFetch(true), []);

    useEffect(() => {
        /** in case Abort controller is not defined ==> IE 11 obviously **/
        const abortController = typeof AbortController !== "undefined"
            ? new AbortController()
            : undefined
        ;
        /** get a signal that is an AbortInstance object, used to cancel the request **/
        const signal = abortController && abortController.signal;

        const callRequest = () => {
            setLoading(true);
            setFetchError(null);

            /** give the fetch call an init object, containing the signal **/
            fetch(uri, { signal })
                .then(response => response.json())
                .then((data: T) => {
                    setData(data);
                    setLoading(false);
                })
                .catch(e => {
                    /** beware to catch the AbortError to avoid setState on unmounted Component **/
                    if (e.name !== "AbortError") {
                        setFetchError(e);
                        setLoading(false);
                    }
                })
        };

        if (shallFetch) {
            callRequest();
        }
        return () => {
            if (abortController) {
                /** cancel the request **/
                abortController.abort();
            }
        }
    }, [uri, shallFetch]);

    return {
        data,
        loading,
        fetchError,
        doRequest,
    };
};

