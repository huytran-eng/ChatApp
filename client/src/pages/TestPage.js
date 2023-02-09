export default function App() {
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div>
            {/* 👇️ open link in new tab */}
            <a href="https://google.com" target="_blank" rel="noopener noreferrer">
                Google
            </a>
            <hr />
            {/* 👇️ open link in new tab using a button */}
            <button onClick={() => openInNewTab('https://google.com')}>
                Google
            </button>
        </div>
    );
}