import { BreadcrumbData } from '../../model/ui';
import WiwaMenuItem from './wiwa-menu-item';

const WiwaBreadcrumb = ({breadcrumbs}: { breadcrumbs: BreadcrumbData[] }) => {
    return (
        <div className="flex w-full px-5">
            <div className="text-sm breadcrumbs">
                <ul>
                    {breadcrumbs.map(item =>
                        <WiwaMenuItem
                            key={item.key}
                            label={item.label} to={item.to || ''}
                            disabled={item.to === undefined}
                        />
                    )}
                </ul>
            </div>
        </div>
    )
}

export default WiwaBreadcrumb;
