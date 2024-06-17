import { ReactNode, useEffect, useState } from 'react';
import WiwaInput from '../ui/wiwa-input.tsx';
import WiwaButton from '../ui/wiwa-button.tsx';
import { ChevronDown, ChevronUp, Search } from 'react-feather';
import { useResourceState } from '../../state/resource';
import { UserSearchCriteria } from '../../api/model/user';
import WiwaFormInput from '../ui/wiwa-form-input.tsx';

const UserSearchCriteriaForm = ({searchHandler, children}: {
    searchHandler: (criteria: UserSearchCriteria) => void
    children?: ReactNode
}) => {
    const resourceState = useResourceState();

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
        <div className="flex flex-col w-full items-center justify-center pb-5 gap-5">
            <div className="flex w-2/3">
                <div className="join w-full">
                    <WiwaInput
                        className="join-item w-full"
                        placeholder={resourceState?.common?.userCriteria.searchPlaceholder}
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
                </div>
                {children}
            </div>

            {extended &&
                <div className="flex flex-row gap-5 w-2/3">
                    <WiwaFormInput
                        placeholder={resourceState?.common?.userCriteria.usernamePlaceholder}
                        value={username}
                        setValue={setUsername}
                    />

                    <WiwaFormInput
                        placeholder={resourceState?.common?.userCriteria.emailPlaceholder}
                        value={email}
                        setValue={setEmail}
                    />
                </div>
            }
        </div>
    )
}

export default UserSearchCriteriaForm;
