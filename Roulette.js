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
        const totalItems = 60; 
        for (let i = 0; i < totalItems; i++) {
            displayItems.push(this.upgrades[Math.floor(Math.random() * this.upgrades.length)]);
        }

        displayItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'roulette-item';
            div.innerHTML = `<span style="font-size:10px; opacity:0.8;">EVOLVE</span>${item.label}`;
            this.strip.appendChild(div);
        });

        // --- 修正ポイント：インデックスの調整 ---
        // 50番目を当選と判定していた場合、見た目上のズレを補正するために
        // 実際に矢印の下に来るアイテムを resultIndex として固定します。
        const resultIndex = 50; 
        
        const containerWidth = 350; // CSSのwidth (固定値で計算したほうが安定します)
        const centerOfContainer = containerWidth / 2;

        // 【ここが重要】
        // -(resultIndex * itemWidth) で50番目の左端がコンテナの左端に来ます。
        // そこに (centerOfContainer - itemWidth / 2) を足すことで、
        // 50番目の中心がコンテナの中心（矢印）に重なります。
        const stopPos = -(resultIndex * this.itemWidth) + (centerOfContainer - this.itemWidth / 2);

        setTimeout(() => {
            this.strip.style.transition = "left 4s cubic-bezier(0.15, 0, 0.1, 1)";
            this.strip.style.left = stopPos + "px";
        }, 100);

        setTimeout(() => {
            // ここで displayItems[resultIndex] を使うことで、
            // 矢印が指している50番目のアイテムの効果を確実に発動させます。
            const result = displayItems[resultIndex];
            result.action(); 

            const finalItem = this.strip.children[resultIndex];
            finalItem.classList.add('winner');

            setTimeout(() => {
                this.container.classList.remove('show');
                this.isSpinning = false;
            }, 3000);
        }, 4500);
    }
}