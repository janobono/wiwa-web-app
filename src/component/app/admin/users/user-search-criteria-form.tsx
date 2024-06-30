import { ReactNode, useContext, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'react-feather';

import WiwaFormInputString from '../../../ui/wiwa-form-input-string';
import WiwaInput from '../../../ui/wiwa-input';
import WiwaButton from '../../../ui/wiwa-button';
import { UserSearchCriteria } from '../../../../api/model/user';
import { ResourceContext } from '../../../../context';

const UserSearchCriteriaForm = ({searchHandler, children}: {
    searchHandler: (criteria: UserSearchCriteria) => void
    children?: ReactNode
}) => {
    const resourceState = useContext(ResourceContext);

    const [searchField, setSearchField] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();

    const [extended, setExtended] = useState(false);

    useEffect(() => {
        if (!extended) {
            setUsername(undefined);
            setEmail(undefined);
        }
    }, [extended]);

    return (
        <>
            <div className="flex flex-col md:flex-row gap-5 w-full">
                <div className="join join-vertical md:join-horizontal w-full">
                    <WiwaInput
                        className="join-item w-full"
                        placeholder={resourceState?.admin?.userCriteria.searchPlaceholder}
                        value={searchField}
                        onChange={event => setSearchField(event.target.value)}
                        onKeyUp={(event) => {
                            if (event.key === 'Enter') {
                                searchHandler({searchField, username, email});
                            }
                        }}
                    />
                    <WiwaButton
                        title={resourceState?.common?.action.search}
                        className="join-item"
                        onClick={() => searchHandler({searchField, username, email})}
                    ><Search size={18}/></WiwaButton>
                    <WiwaButton
                        title={resourceState?.common?.action.extendedSearch}
                        className="join-item"
                        onClick={() => setExtended(!extended)}
                    >{extended ?
                        <ChevronUp size={18}/>
                        :
                        <ChevronDown size={18}/>
                    }</WiwaButton>
                    {children}
                </div>
            </div>

            {extended &&
                <div className="flex flex-col md:flex-row gap-5 w-full">
                    <WiwaFormInputString
                        placeholder={resourceState?.admin?.userCriteria.usernamePlaceholder}
                        value={username}
                        setValue={setUsername}
                    />
                    <WiwaFormInputString
                        placeholder={resourceState?.admin?.userCriteria.emailPlaceholder}
                        value={email}
                        setValue={setEmail}
                    />
                </div>
            }
        </>
    )
}

export default UserSearchCriteriaForm;
