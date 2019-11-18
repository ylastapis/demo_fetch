import { useCallback, useEffect, useState } from 'react';

/**
 * Will fetch only when doRequest is called
 */
export const useFetch = <T>(
    uri: string
) => {
    const [data, setData] = useState<null | T>(null);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<null | any>(null);

    /** add a new boolean here to toggle when to fetch, used as a prop of the useEffect **/
    const [shallFetch, setShallFetch] = useState(false);

    /** create a custom method that will toggle a boolean to indicate to the useEffect when to fetch **/
    const doRequest = useCallback(() => setShallFetch(true), []);

    useEffect(() => {
        const callRequest = () => {
            setLoading(true);
            setFetchError(null);
            /** toggle the boolean to avoid another call if any of the parameters is changed **/
            setShallFetch(false);

            fetch(uri)
                .then(response => response.json())
                .then((data: T) => {
                    setData(data);
                    setLoading(false);
                })
                .catch(e => {
                    setFetchError(e);
                    setLoading(false);
                })
            ;
        };

        /** only fetch when requested to **/
        if (shallFetch) {
            callRequest();
        }
    }, [uri, shallFetch]);

    return {
        data,
        loading,
        fetchError,
        doRequest,
    };
};
