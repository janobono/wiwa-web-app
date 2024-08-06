import { ReactNode } from 'react';

export interface BoardEditorProperties {
    edgeA1?: ReactNode,
    edgeA2?: ReactNode,
    edgeB1?: ReactNode,
    edgeB2?: ReactNode,
    board?: ReactNode,
    cornerA1B1?: ReactNode,
    cornerA1B2?: ReactNode,
    cornerA2B1?: ReactNode,
    cornerA2B2?: ReactNode
}

const PartGrid = (
    {
        edgeA1,
        edgeA2,
        edgeB1,
        edgeB2,
        board,
        cornerA1B1,
        cornerA1B2,
        cornerA2B1,
        cornerA2B2
    }: BoardEditorProperties
) => {
    return (
        <div className="grid grid-cols-3 gap-5 p-10 border-2 border-black w-full">
            <div className="flex flex-row items-center justify-center">{cornerA1B1}</div>
            <div className="flex flex-row items-center justify-center">{edgeA1}</div>
            <div className="flex flex-row items-center justify-center">{cornerA1B2}</div>

            <div className="flex flex-row items-center justify-center">{edgeB1}</div>
            <div className="flex flex-row items-center justify-center">{board}</div>
            <div className="flex flex-row items-center justify-center">{edgeB2}</div>

            <div className="flex flex-row items-center justify-center">{cornerA2B1}</div>
            <div className="flex flex-row items-center justify-center">{edgeA2}</div>
            <div className="flex flex-row items-center justify-center">{cornerA2B2}</div>
        </div>
    )
}

export default PartGrid;
