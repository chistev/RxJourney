<script>
    export let flutterwaveUrl = "https://flutterwave.com/donate/nxlpmfy1jibs";
    export let usdcAddress = "0x66D3D43e4603acfD9D74E89A68647946a93C2EAd";

    let copied = false;

    function copyAddress() {
        navigator.clipboard.writeText(usdcAddress);
        copied = true;
        
        setTimeout(() => {
            copied = false;
        }, 2000);
    }
</script>

<style>
    .support-container {
        text-align: center;
        margin-top: 30px;
        padding: 20px;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        background-color: #f9f9f9;
    }

    .support-container h3 {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 700;
        font-size: 22px;
        color: #242424;
        margin-bottom: 15px;
    }

    .support-container p {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 400;
        font-size: 16px;
        color: #6b6b6b;
        margin-bottom: 20px;
    }

    .support-buttons {
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
    }

    .support-button {
        display: inline-flex;
        align-items: center;
        padding: 10px 20px;
        font-size: 16px;
        color: #ffffff;
        background-color: #ff5a5f;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        text-decoration: none;
    }

    .support-button:hover {
        background-color: #e44c4c;
    }

    .flutterwave-button {
        background-color: #f4a261;
    }

    .flutterwave-button:hover {
        background-color: #e98b3b;
    }

    .crypto-option {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 10px 18px;
        background-color: #f0f8ff;
        border: 2px solid #4a90e2;
        border-radius: 5px;
        font-size: 16px;
    }

    .crypto-address {
        font-family: monospace;
        font-size: 15px;
        background: white;
        padding: 6px 10px;
        border-radius: 4px;
        border: 1px solid #ddd;
        word-break: break-all;
        max-width: 220px;
    }

    .copy-btn {
        background: #4a90e2;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
    }

    .copy-btn:hover {
        background: #357abd;
    }

    .copied {
        background: #27ae60 !important;
    }

    .copy-feedback {
        color: #27ae60;
        font-weight: 600;
        font-size: 14px;
        margin-top: 5px;
    }
</style>

<div class="support-container">
    <h3>Enjoyed the post? ☕</h3>
    <p>If you had a good time and if you're feeling extra generous, you can leave a donation to show some love. No pressure, but your support does fuel more awesome content! 😉</p>
    
    <div class="support-buttons">
        <!-- Crypto Option -->
        <div class="crypto-option">
            <strong>💎 USDC (BEP-20)</strong>
            <div class="crypto-address">
                {usdcAddress}
            </div>
            <button 
                class="copy-btn" 
                class:copied
                on:click={copyAddress}
            >
                📋 {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>

        <!-- Naira Option -->
        <a href={flutterwaveUrl} class="support-button flutterwave-button" target="_blank">
            <i class="bi bi-credit-card-fill"></i> Send Naira
        </a>
    </div>

    {#if copied}
        <div class="copy-feedback">✅ USDC address copied to clipboard!</div>
    {/if}
</div>