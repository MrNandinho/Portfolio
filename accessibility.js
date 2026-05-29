document.addEventListener('DOMContentLoaded', () => {
    const widget = document.querySelector('.accessibility-widget');
    const modal = document.getElementById('accessibilityModal');
    const closeBtn = document.getElementById('closeAccessibility');
    const slider = document.getElementById('fontSlider');
    const display = document.getElementById('fontSizeDisplay');
    const btnDecrease = document.getElementById('decreaseFont');
    const btnIncrease = document.getElementById('increaseFont');
    const btnReset = document.getElementById('resetAccessibility');

    // 1. Carregar tamanho guardado no navegador (se existir)
    const savedSize = localStorage.getItem('globalFontSize') || '100';
    updateFontSize(savedSize);

    // 2. Abrir / Fechar o Pop-up
    widget.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.classList.toggle('show');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Fechar se clicar fora do modal
    document.addEventListener('click', (e) => {
        if (modal.classList.contains('show') && !modal.contains(e.target) && !widget.contains(e.target)) {
            modal.classList.remove('show');
        }
    });

    // 3. Atualizar o tamanho ao mexer no Slider
    slider.addEventListener('input', (e) => {
        updateFontSize(e.target.value);
    });

    // 4. Botões de Clique (- e +)
    btnDecrease.addEventListener('click', () => {
        let current = parseInt(slider.value);
        if (current > parseInt(slider.min)) {
            updateFontSize(current - 5);
        }
    });

    btnIncrease.addEventListener('click', () => {
        let current = parseInt(slider.value);
        if (current < parseInt(slider.max)) {
            updateFontSize(current + 5);
        }
    });

    // 5. Botão de Repor Predefinição (100%)
    btnReset.addEventListener('click', () => {
        updateFontSize(100);
    });

    // Função central para aplicar as mudanças
    function updateFontSize(size) {
        // Altera o tamanho base do documento inteiro
        document.documentElement.style.fontSize = `${size}%`;
        
        // Atualiza os elementos visuais do pop-up
        slider.value = size;
        display.textContent = `${size}%`;
        
        // Guarda a escolha para persistir entre páginas
        localStorage.setItem('globalFontSize', size);
    }
});