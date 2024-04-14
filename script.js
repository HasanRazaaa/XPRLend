// Fetch XRP price from a cryptocurrency API
function fetchXrpPrice() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            const xrpPrice = data.ripple.usd;
            document.getElementById('xrp-price').textContent = `$${xrpPrice}`;
        })
        .catch(error => {
            console.error('Error fetching XRP price:', error);
            document.getElementById('xrp-price').textContent = 'Error fetching price';
        });
}

// Call fetchXrpPrice function when the page loads
window.addEventListener('load', fetchXrpPrice);

// Initialize TradingView chart
new TradingView.widget(
    {
        "autosize": true,
        "symbol": "COINBASE:XRPUSD",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "hide_legend": true,
        "studies": [
            "MAWeighted@tv-basicstudies"
        ],
        "container_id": "tradingview-widget-container"
    }
);
