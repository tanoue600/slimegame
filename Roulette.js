class Roulette {
    constructor(upgrades) {
        this.container = document.getElementById('roulette-container');
        this.strip = document.getElementById('roulette-strip');
        this.upgrades = upgrades;
        this.isSpinning = false;
        this.itemWidth = 120; // アイテム1つの幅
    }

    start() {
        if (this.isSpinning) return;
        this.isSpinning = true;

        this.container.classList.add('show');
        this.strip.style.transition = "none";
        this.strip.style.left = "0px";
        this.strip.innerHTML = "";

        const displayItems = [];
        const totalItems = 60; // 長めに回す
        for (let i = 0; i < totalItems; i++) {
            displayItems.push(this.upgrades[Math.floor(Math.random() * this.upgrades.length)]);
        }

        displayItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'roulette-item';
            div.innerHTML = `<span style="font-size:10px; opacity:0.8;">EVOLVE</span>${item.label}`;
            this.strip.appendChild(div);
        });

        // --- 修正ポイント：中央に合わせる計算 ---
        // 50番目のアイテムを「当たり」とする
        const resultIndex = 50; 
        
        // コンテナの真ん中の位置を取得
        const containerWidth = this.container.offsetWidth;
        const centerOfContainer = containerWidth / 2;

        // アイテムの左端からその中心までの距離は itemWidth / 2
        // 「当たり」アイテムの左端がくるべき位置を計算
        const stopPos = -(resultIndex * this.itemWidth) + (centerOfContainer - this.itemWidth / 2);

        setTimeout(() => {
            // カジノらしい、滑らかな減速（4秒かけて回転）
            this.strip.style.transition = "left 4s cubic-bezier(0.15, 0, 0.1, 1)";
            this.strip.style.left = stopPos + "px";
        }, 100);

        setTimeout(() => {
            const result = displayItems[resultIndex];
            result.action(); 

            // 当たったアイテムを強調
            const finalItem = this.strip.children[resultIndex];
            finalItem.classList.add('winner');

            setTimeout(() => {
                this.container.classList.remove('show');
                this.isSpinning = false;
            }, 3000);
        }, 4500); // アニメーション4s + 余裕0.5s
    }
}