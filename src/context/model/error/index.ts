import { WiwaError } from '../../../api/model';

export interface ErrorState {
    data: WiwaError[],
    addError: (error?: WiwaError) => void,
    removeError: (index: number) => void
}
