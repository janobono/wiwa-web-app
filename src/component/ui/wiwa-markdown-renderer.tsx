import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const WiwaMarkdownRenderer = ({className, md}: { className?: string, md?: string }) => {
    return (
        md ? <ReactMarkdown remarkPlugins={[gfm]} className={className} children={md}/> : <></>
    )
}

export default WiwaMarkdownRenderer;
