import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RESOURCE } from '../../locale';
import { useAuthState } from '../../state';

import { WiwaButton, WiwaSpinner } from '../../component/ui';

const ConfirmPage: React.FC = () => {
    const {token} = useParams();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const authState = useAuthState();

    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>();

    const confirm = async () => {
        setSubmitting(true);
        setError(undefined);
        try {
            if (token) {
                const wiwaError = await authState?.confirm({token});
                if (wiwaError) {
                    setError(t(RESOURCE.PAGE.AUTH.CONFIRM.ERROR_MESSAGE).toString());
                }
            }
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        confirm();
    }, [token]);

    return (
        <section className="w-full">
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center min-h-[480px]">
                    {isSubmitting
                        ?
                        <WiwaSpinner/>
                        :
                        <>
                            {
                                error ? <div className="font-normal m-5 text-red-500">{error}</div>
                                    :
                                    <div
                                        className="font-normal m-5">{t(RESOURCE.PAGE.AUTH.CONFIRM.SUBMITTED_MESSAGE)}
                                    </div>
                            }
                            <WiwaButton onClick={() => navigate('/')}>{t(RESOURCE.ACTION.OK)}</WiwaButton>
                        </>
                    }
                </div>
            </div>
        </section>
    );
}

export default ConfirmPage;
