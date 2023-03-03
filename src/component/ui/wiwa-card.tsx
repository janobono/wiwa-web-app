import React from 'react'

interface WiwaCardProps {
    image: string,
    title: string,
    text: string
}

const WiwaCard: React.FC<WiwaCardProps> = (props) => {
    return (
        <>
            <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
                <img
                    className="aspect-video w-full"
                    src={props.image}
                    alt={props.title}
                />
                <div className="p-5">
                    <div className="mb-5">
                        <h3 className="text-xl font-medium text-slate-700">{props.title}</h3>
                    </div>
                    <div className="text-justify text-sm">{props.text}</div>
                </div>
            </div>
        </>
    )
}

export default WiwaCard;
