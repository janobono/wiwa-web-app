import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RESOURCE } from '../../locale';

import { WiwaButton, WiwaInput } from '../../component/ui';
import { Edit, Search, UserMinus, UserPlus } from 'react-feather';
import { User } from '../../client/model';

const UsersPage: React.FC = () => {
    const {t} = useTranslation();

    const [selectedUser, setSelectedUser] = useState<User>();
    const [searchField, setSearchField] = useState<string>();

    return (
        <section className="w-full  min-h-[250px]">
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center mb-5">
                        {t(RESOURCE.PAGE.USERS.USERS.TITLE)}
                    </div>
                </div>

                <div className="flex flex-row gap-1 mb-5">
                    <WiwaInput
                        className="p-0.5"
                        type="text"
                        value={searchField}
                        onChange={event => setSearchField(event.target.value)}
                    />

                    <WiwaButton
                        title={t(RESOURCE.ACTION.SEARCH).toString()}
                        onClick={() => {
                        }}
                    >
                        <Search size="18"/>
                    </WiwaButton>

                    <div className="flex-grow">
                    </div>

                    <WiwaButton
                        title={t(RESOURCE.ACTION.ADD).toString()}
                        onClick={() => {
                        }}
                    >
                        <UserPlus size="18"/>
                    </WiwaButton>

                    <WiwaButton
                        disabled={selectedUser === undefined}
                        title={t(RESOURCE.ACTION.EDIT).toString()}
                        onClick={() => {
                        }}
                    >
                        <Edit size="18"/>
                    </WiwaButton>

                    <WiwaButton
                        disabled={selectedUser === undefined}
                        variant="error"
                        title={t(RESOURCE.ACTION.REMOVE).toString()}
                        onClick={() => {
                        }}
                    >
                        <UserMinus size="18"/>
                    </WiwaButton>
                </div>

            </div>
        </section>
    );
}

export default UsersPage;
