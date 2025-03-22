const element = document.querySelector('.contain-flex');
const gridInput = document.querySelector("#grid-num");
const btn = document.querySelector('.newlienzo');
const borrar = document.querySelector('.borrador');
const rgbMode = document.querySelector('.rgbmode');
const lapiz = document.querySelector('.lapiz')

lapiz.addEventListener('click', (e) => {
    lapiz.classList.toggle('grayscale');
    rgbMode.classList.remove('RGB');
});

rgbMode.addEventListener('click', () => {
    rgbMode.classList.toggle('RGB');
    lapiz.classList.remove('grayscale');
});

gridInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        addGrid();
    }
});

function grid(n) {
    for (let i = 1; i <= n * n ; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');

        element.appendChild(cell);

        cell.addEventListener('mouseover', color);

        function color(e) {
            cell.style.backgroundColor = 'black';

            if(rgbMode.classList.contains('RGB')) {
                cell.style.backgroundColor = `hsl(${Math.random() * 360}, 85%, 55%)`;
            }

            if(lapiz.classList.contains('grayscale')) {
                cell.style.opacity = '0.2';
                cell.style.backgroundColor = 'black';

                cell.addEventListener('mouseover', () => {
                    let currentOpacity = parseFloat(cell.style.opacity) || 0.2;
                    
                    if (currentOpacity < 1) {
                        cell.style.opacity = currentOpacity + 0.1;
                    }
                });
            }
        }

        borrar.addEventListener('click', () => {
            cell.style.backgroundColor = 'white';
            cell.style.opacity = 1;
        });
    }
    document.documentElement.style.setProperty('--rowN', n);
    document.documentElement.style.setProperty('--colN', n);
}

grid(16);

btn.addEventListener('click', addGrid);

function addGrid() {
    let gridNumber = Number(gridInput.value);

    if(gridNumber != 0 && gridNumber <= 100) {
        element.innerText = '';

        function grid(n) {
            for (let i = 1; i <= n * n; i++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');

                element.appendChild(cell);

                cell.addEventListener('mouseover', color);

                function color(e) {
                    e.target.style.backgroundColor = 'black';

                    if (rgbMode.classList.contains('RGB')) {
                        e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 85%, 55%)`;
                    }
                }

                if (lapiz.classList.contains('grayscale')) {
                    cell.style.opacity = '0.2';
                    cell.style.backgroundColor = 'black';

                    cell.addEventListener('mouseover', () => {
                        let currentOpacity = parseFloat(cell.style.opacity) || 0.2;

                        if (currentOpacity < 1) {
                            cell.style.opacity = currentOpacity + 0.1;
                        }
                    });
                }

                borrar.addEventListener('click', () => {
                    cell.style.backgroundColor = 'white';
                    cell.style.opacity = 1;
                });

                document.documentElement.style.setProperty('--row', n);
                document.documentElement.style.setProperty('--colN', n);
            }
        }
        grid(gridNumber);
    } else {
        alert('Por favor coloque un valor entre 1 y 100');
    }
    gridInput.value = '';
}



