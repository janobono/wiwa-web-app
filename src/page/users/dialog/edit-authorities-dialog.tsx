import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Authority } from '../../../client/model';
import { RESOURCE } from '../../../locale';
import { PieChart, Settings, ShoppingCart, Tool } from 'react-feather';
import { WiwaButton, WiwaCheckBox } from '../../../component/ui';
import { containsAuthority } from '../../../state';

interface EditAuthoritiesDialogProps {
    showDialog: boolean
    setShowDialog: (showDialog: boolean) => void,
    authorities: Authority[],
    onAuthoritiesEditHandler: (authorities: Authority[]) => void
}

const EditAuthoritiesDialog: React.FC<EditAuthoritiesDialogProps> = (props) => {
    const {t} = useTranslation();

    const [customer, setCustomer] = useState(false);
    const [employee, setEmployee] = useState(false);
    const [manager, setManager] = useState(false);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        setCustomer(containsAuthority(props.authorities, Authority.W_CUSTOMER));
        setEmployee(containsAuthority(props.authorities, Authority.W_EMPLOYEE));
        setManager(containsAuthority(props.authorities, Authority.W_MANAGER));
        setAdmin(containsAuthority(props.authorities, Authority.W_ADMIN));
    }, []);

    const handleSubmit = () => {
        const authorities = [];
        if (customer) {
            authorities.push(Authority.W_CUSTOMER);
        }
        if (employee) {
            authorities.push(Authority.W_EMPLOYEE);
        }
        if (manager) {
            authorities.push(Authority.W_MANAGER);
        }
        if (admin) {
            authorities.push(Authority.W_ADMIN);
        }
        props.onAuthoritiesEditHandler(authorities);
        props.setShowDialog(false);
    }

    return (
        <Transition appear show={props.showDialog} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => props.setShowDialog(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="w-full max-w-md transform overflow-hidden bg-white p-5 text-left align-middle shadow-xl transition-all">
                                <div className="text-lg md:text-xl font-bold text-center mb-5">
                                    {t(RESOURCE.PAGE.USERS.DIALOG.EDIT_AUTHORITIES.TITLE)}
                                </div>
                                <form
                                    onSubmit={(event => {
                                        event.preventDefault();
                                        handleSubmit();
                                    })}>

                                    <div className="mb-2">
                                        <WiwaCheckBox
                                            name="customer"
                                            value={customer}
                                            setValue={setCustomer}
                                            message=""
                                            disabled={false}
                                            required={false}
                                        >
                                        <span className="flex flex-row items-center justify-center gap-2">
                                            <ShoppingCart size="18"/>
                                            {t(RESOURCE.PAGE.USERS.DIALOG.EDIT_AUTHORITIES.FORM.CUSTOMER.LABEL)}
                                        </span>
                                        </WiwaCheckBox>
                                    </div>

                                    <div className="mb-2">
                                        <WiwaCheckBox
                                            name="employee"
                                            value={employee}
                                            setValue={setEmployee}
                                            message=""
                                            disabled={false}
                                            required={false}
                                        >
                                        <span className="flex flex-row items-center justify-center gap-2">
                                            <Tool size="18"/>
                                            {t(RESOURCE.PAGE.USERS.DIALOG.EDIT_AUTHORITIES.FORM.EMPLOYEE.LABEL)}
                                        </span>
                                        </WiwaCheckBox>
                                    </div>

                                    <div className="mb-2">
                                        <WiwaCheckBox
                                            name="manager"
                                            value={manager}
                                            setValue={setManager}
                                            message=""
                                            disabled={false}
                                            required={false}
                                        >
                                        <span className="flex flex-row items-center justify-center gap-2">
                                            <PieChart size="18"/>
                                            {t(RESOURCE.PAGE.USERS.DIALOG.EDIT_AUTHORITIES.FORM.MANAGER.LABEL)}
                                        </span>
                                        </WiwaCheckBox>
                                    </div>

                                    <div className="mb-2">
                                        <WiwaCheckBox
                                            name="admin"
                                            value={admin}
                                            setValue={setAdmin}
                                            message=""
                                            disabled={false}
                                            required={false}
                                        >
                                        <span className="flex flex-row items-center justify-center gap-2">
                                            <Settings size="18"/>
                                            {t(RESOURCE.PAGE.USERS.DIALOG.EDIT_AUTHORITIES.FORM.ADMIN.LABEL)}
                                        </span>
                                        </WiwaCheckBox>
                                    </div>

                                    <WiwaButton
                                        type="submit"
                                        className="w-full"
                                    >
                                        {t(RESOURCE.ACTION.OK)}
                                    </WiwaButton>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default EditAuthoritiesDialog;
