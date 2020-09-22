import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { getLockdownStatus } from '../../Utils/LockdownUtils';
import AvailableHelpersModal from './AvailableHelpersModal';
import HelperModal from '../Request/HelperModal';
import ApproveStartModal from './ApproveStartModal';
import PayModal from './PayModal';

export const WAITING_FOR_OFFERS = 'WAITING_FOR_OFFERS';
export const WAITING_FOR_HELPER_START = 'WAITING_FOR_HELPER_START';
export const WAITING_FOR_CLIENT_APPROVAL = 'WAITING_FOR_CLIENT_APPROVAL';
export const WAITING_FOR_FINISH_REQUEST = 'WAITING_FOR_FINISH_REQUEST';
export const WAITING_FOR_CLIENT_PAYMENT = 'WAITING_FOR_CLIENT_PAYMENT';

const LockdownManager = () => {
    const [lockdown, setLockdown] = useState({ isLockedDown: false });
    let mount = useRef(true);

    useEffect(
        () => {
            compareLockdown();
            setRefresh();
            return () => { mount.current = false };
        },
        []
    )
    let lastLockdown = useRef({ isLockedDown: false });
    const compareLockdown = async () => {
        return await getLockdownStatus().then(
            (res) => {
                if (mount.current && (res.type != lastLockdown.current.type)) {
                    setLockdown(res)
                    lastLockdown.current = res
                }
            }
        )
            .catch(
                (err) => {
                    //handle error
                    if (mount.current) {

                        setLockdown({ isLockedDown: false });
                    }
                }
            )
    }
    const setRefresh = () => {
        let timerId = setInterval(
            () => {
                if (mount.current)
                    compareLockdown();
                else
                    clearInterval(timerId);
            }
            , 1000
        )
    }
    if (!lockdown.isLockedDown) {
        return <View></View>;
    }
    switch (lockdown.type) {
        case WAITING_FOR_OFFERS: {
            return <AvailableHelpersModal />
        }
        case WAITING_FOR_HELPER_START: {
            return <HelperModal header="" />
        }
        case WAITING_FOR_CLIENT_APPROVAL: {

            return <ApproveStartModal />
        }
        case WAITING_FOR_FINISH_REQUEST: {
            return <HelperModal header="Request in progress" />
        }
        case WAITING_FOR_CLIENT_PAYMENT: {

            return <PayModal />
        }

        default:
            {

                return <Text>Lockdown Error</Text>
            }
    }
}
const styles = StyleSheet.create({

});

export default LockdownManager;