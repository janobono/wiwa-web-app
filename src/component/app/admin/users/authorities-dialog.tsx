import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { PieChart, Settings, ShoppingCart, Tool } from 'react-feather';

import BaseDialog from '../../../dialog/base-dialog';
import WiwaButton from '../../../ui/wiwa-button';
import { Authority, containsAuthority } from '../../../../api/model';
import { DialogContext, ResourceContext } from '../../../../context';

const AuthoritiesDialog = ({dialogId, showDialog, authorities, okHandler, cancelHandler}: {
    dialogId: string,
    showDialog: boolean,
    authorities: Authority[],
    okHandler: (authorities: Authority[]) => void,
    cancelHandler: () => void
}) => {
    const dialogState = useContext(DialogContext);
    const resourceState = useContext(ResourceContext);

    const [customerAuthority, setCustomerAuthority] = useState(false);
    const [employeeAuthority, setEmployeeAuthority] = useState(false);
    const [managerAuthority, setManagerAuthority] = useState(false);
    const [adminAuthority, setAdminAuthority] = useState(false);

    useEffect(() => {
        setCustomerAuthority(containsAuthority(authorities, Authority.W_CUSTOMER));
        setEmployeeAuthority(containsAuthority(authorities, Authority.W_EMPLOYEE));
        setManagerAuthority(containsAuthority(authorities, Authority.W_MANAGER));
        setAdminAuthority(containsAuthority(authorities, Authority.W_ADMIN));
    }, [showDialog, authorities]);

    return (!dialogState?.modalRoot ? null : createPortal(
        <BaseDialog id={dialogId} showDialog={showDialog} closeHandler={cancelHandler}>
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center">
                        {resourceState?.admin?.users.userAuthorities.title}
                    </div>
                    <form
                        className="max-w-sm"
                        onSubmit={(event => {
                            event.preventDefault();
                            const authorities = [];
                            if (customerAuthority) {
                                authorities.push(Authority.W_CUSTOMER);
                            }
                            if (employeeAuthority) {
                                authorities.push(Authority.W_EMPLOYEE);
                            }
                            if (managerAuthority) {
                                authorities.push(Authority.W_MANAGER);
                            }
                            if (adminAuthority) {
                                authorities.push(Authority.W_ADMIN);
                            }
                            okHandler(authorities);
                        })}>

                        <div className="form-control w-full pt-5">
                            <div className="flex flex-row items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={customerAuthority}
                                    onChange={() => setCustomerAuthority(!customerAuthority)}
                                    className="checkbox"
                                />
                                <ShoppingCart size="18"/>
                                <span>{resourceState?.admin?.users.userAuthorities.customer}</span>
                            </div>
                        </div>

                        <div className="form-control w-full pt-5">
                            <div className="flex flex-row items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={employeeAuthority}
                                    onChange={() => setEmployeeAuthority(!employeeAuthority)}
                                    className="checkbox"
                                />
                                <Tool size="18"/>
                                <span>{resourceState?.admin?.users.userAuthorities.employee}</span>
                            </div>
                        </div>

                        <div className="form-control w-full pt-5">
                            <div className="flex flex-row items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={managerAuthority}
                                    onChange={() => setManagerAuthority(!managerAuthority)}
                                    className="checkbox"
                                />
                                <PieChart size="18"/>
                                <span>{resourceState?.admin?.users.userAuthorities.manager}</span>
                            </div>
                        </div>

                        <div className="form-control w-full pt-5">
                            <div className="flex flex-row items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={adminAuthority}
                                    onChange={() => setAdminAuthority(!adminAuthority)}
                                    className="checkbox"
                                />
                                <Settings size="18"/>
                                <span>{resourceState?.admin?.users.userAuthorities.admin}</span>
                            </div>
                        </div>

                        <div className="join pt-5">
                            <WiwaButton
                                className="btn-primary join-item"
                                type="submit"
                            >{resourceState?.common?.action.submit}
                            </WiwaButton>
                            <WiwaButton
                                className="btn-accent join-item"
                                onClick={() => {
                                    cancelHandler();
                                }}
                            >{resourceState?.common?.action.cancel}
                            </WiwaButton>
                        </div>
                    </form>
                </div>
            </div>
        </BaseDialog>
        , dialogState.modalRoot))
}

export default AuthoritiesDialog;
