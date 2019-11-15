/*
 * Copyright Innov'ATM all rights reserved. This software is the property of Innov'ATM and may not be used in any
 * manner except under a license agreement signed with Innov'ATM.
 */

import moment from 'moment';

export const getMoment = (dt?: Date | number | null | string | moment.Moment) =>
    (dt === undefined || dt === null)
        ? moment(Date.now()).utc()
        : (typeof dt === 'number')
            ? moment.unix(dt).utc() // assuming that all dates passed here are in seconds
            : moment(dt).utc()
;
