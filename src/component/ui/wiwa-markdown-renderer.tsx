import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

interface WiwaMarkdownRendererProps {
    className?: string
    md?: string
}

const WiwaMarkdownRenderer: React.FC<WiwaMarkdownRendererProps> = (props) => {
    return (
        props.md ? <ReactMarkdown remarkPlugins={[gfm]} className={props.className} children={props.md}/> : <></>
    )
}

export default WiwaMarkdownRenderer;
