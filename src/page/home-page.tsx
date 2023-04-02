import React from 'react';

import { useUiState } from '../state';
import ApplicationInfoItemCard from '../component/application-info/application-info-item-card';

const HomePage: React.FC = () => {
    const uiState = useUiState();

    return (
        <section className="w-full">
            <div className="container p-5 mx-auto text-sm md:text-base text-center">
                {uiState?.welcomeText ? uiState.welcomeText : ''}
            </div>
            <div className="container pb-5 px-5 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {uiState?.applicationInfo ?
                        uiState.applicationInfo.items.map((item, index) => {
                            return <ApplicationInfoItemCard key={index} applicationInfoItem={item}/>
                        })
                        : <></>}
                </div>
            </div>
        </section>
    );
}

export default HomePage;
