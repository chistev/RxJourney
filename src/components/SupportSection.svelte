<script>
    export let coffeeUrl = "https://buymeacoffee.com/chistev12";
    export let flutterwaveUrl = "https://flutterwave.com/donate/nxlpmfy1jibs";
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

    .support-button i {
        margin-right: 10px;
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
</style>

<div class="support-container">
    <h3>Enjoyed the post? ☕</h3>
    <p>If you had a good time and if you're feeling extra generous, you can leave a donation to show some love. No pressure, but your support does fuel more awesome content! 😉</p>
    <div class="support-buttons">
        <a href={coffeeUrl} class="support-button" target="_blank">
            <i class="bi bi-cup-fill"></i> Buy Me a Coffee
        </a>
        <a href={flutterwaveUrl} class="support-button flutterwave-button" target="_blank">
            <i class="bi bi-credit-card-fill"></i> Send donation
        </a>
    </div>
</div>
