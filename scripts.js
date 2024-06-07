document.addEventListener('DOMContentLoaded', function () {
    const meterInput = document.getElementById('meterInput');
    const priceList = document.getElementById('price-list');
    const result = document.getElementById('result');
    const warning = document.getElementById('warning');

    function updatePrices() {
        const meters = parseFloat(meterInput.value);
        const stoneType = document.querySelector('input[name="stoneType"]:checked');

        if (isNaN(meters) || meters <= 0 || !stoneType) {
            result.innerHTML = '';
            warning.innerHTML = '';
            return;
        }

        const price = parseFloat(stoneType.dataset.price);
        const totalPrice = price * meters;
        const intermediaryPrice = totalPrice * 1.3;
        const discountedPrice = meters >= 10 ? totalPrice * 0.9 : null;

        const resultHTML = `
            <p>Наша цена за ${meters} погонных метра искуственного камня марки ${stoneType.value} от <span class="text-success">${totalPrice.toLocaleString()}</span> теңге *</p>
            ${discountedPrice ? `<p class="discounted-price text-success">Цена со скидкой: от ${discountedPrice.toLocaleString()} теңге - скидка 10% при заказе от 10 пог.м. *</p>` : ''}
            <p>Цена того же камня если закажете через посредника от <span class="text-danger">${intermediaryPrice.toLocaleString()} теңге</span> *</p>
        `;

        result.innerHTML = resultHTML;
        warning.innerHTML = '*Это примерные цены. Точную цену уточняйте у консультанта по телефону.';
    }

    meterInput.addEventListener('input', function () {
        meterInput.value = meterInput.value.replace(/[^0-9]/g, '');
        updatePrices();
    });

    document.querySelectorAll('input[name="stoneType"]').forEach(radio => {
        radio.addEventListener('change', updatePrices);
    });

    meterInput.addEventListener('focus', function () {
        this.value = '';
        result.innerHTML = '';
        warning.innerHTML = '';
    });
});
