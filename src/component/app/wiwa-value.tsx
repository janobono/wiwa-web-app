import { useResourceState } from '../state/resource-state-provider';

const WiwaValue = ({value}: { value: string }) => {
    const resourceState = useResourceState();

    const translate = (value: string) => {
        if (value === 'true') {
            return resourceState?.common?.value.yes;
        }
        if (value === 'false') {
            return resourceState?.common?.value.no;
        }
        return value;
    }

    return (
        <>
            {translate(value)}
        </>
    )
}

export default WiwaValue;
