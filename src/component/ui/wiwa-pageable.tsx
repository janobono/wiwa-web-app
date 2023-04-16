import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, SkipBack, SkipForward } from 'react-feather';

import { RESOURCE } from '../../locale';

import { WiwaButton } from './index';

interface WiwaPageableProps {
    disabled: boolean;
    page: number,
    totalPages: number,
    setPage: (value: number) => void
}

const WiwaPageable: React.FC<WiwaPageableProps> = (props) => {
    const {t} = useTranslation();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [captchaImage, setCaptchaImage] = useState('');

    useEffect(() => {
    }, []);

    return (
        <div className="flex flex-row gap-1">
            <WiwaButton
                size="xs"
                disabled={props.disabled || props.totalPages <= 0 || props.page <= 0}
                title={t(RESOURCE.ACTION.FIRST).toString()}
                onClick={() => props.setPage(0)}
            >
                <SkipBack size="18"/>
            </WiwaButton>

            <WiwaButton
                size="xs"
                disabled={props.disabled || props.page <= 0}
                title={t(RESOURCE.ACTION.PREVIOUS).toString()}
                onClick={() => props.setPage(props.page - 1)}
            >
                <ChevronLeft size="18"/>
            </WiwaButton>

            <div className="flex text-center items-center mx-5">
                {`${props.page + 1}`}
            </div>

            <WiwaButton
                size="xs"
                disabled={props.disabled || props.totalPages <= 0 || props.page >= props.totalPages - 1}
                title={t(RESOURCE.ACTION.NEXT).toString()}
                onClick={() => props.setPage(props.page + 1)}
            >
                <ChevronRight size="18"/>
            </WiwaButton>

            <WiwaButton
                size="xs"
                disabled={props.disabled || props.totalPages <= 0 || props.page >= props.totalPages - 1}
                title={t(RESOURCE.ACTION.LAST).toString()}
                onClick={() => props.setPage(props.totalPages - 1)}
            >
                <SkipForward size="18"/>
            </WiwaButton>
        </div>
    );
}

export default WiwaPageable;
