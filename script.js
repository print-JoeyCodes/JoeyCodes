// Sprite Sheet Setup
const farmSpriteSheet = new Image();
farmSpriteSheet.src = 'SimpleSpritesheet1.0.png';
const grassSpriteSheet = new Image();
grassSpriteSheet.src = 'Grass.png';
const masterSpriteSheet = new Image();
masterSpriteSheet.src = 'PixelAcresSpritesheet1.1.png'
const totalSpriteSheets = 3;
let spriteSheetsLoaded = 0;
const TILE_SIZE = 64;

// Store the original background tiles
let tileGrid = [];
let maxCols = 0;
let maxRows = 0;


// Variables
let totalGrain = 5;
let tool = 'seeds';
let timerLength = 0;
const grainTransferLink = 'https://script.google.com/macros/s/AKfycbw7IR9Q5h8ABNajPgK_V4WCzWRG9zk3mAAFp_gAgUafB0kOuK7Iop08PKyGPnscFOWr/exec'

// Canvas setup
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Responsive scaling
let scale = 1;
function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    scale = Math.min(canvas.width / 1500, canvas.height / 600);
    drawBackground();
    drawMenu(totalGrain);
    drawFarmlands();
}

// Add resize listener
window.addEventListener('resize', updateCanvasSize);

// Farmland grid setup
const farmlands = [];
const rows = 6;
const columns = 8;
const baseSpacing = 12;
const baseFarmlandWidth = 70;
const baseFarmlandHeight = 70;
const spacing = baseSpacing * scale;
const farmlandWidth = baseFarmlandWidth * scale;
const farmlandHeight = baseFarmlandHeight * scale;

let moldyGrainArray = [];

// Initialize farmlands
let cellNumber = 0;
for (let row = 0; row < rows; row++) {
    cellNumber + 8;
    for (let col = 0; col < columns; col++) {
        cellNumber ++;
        farmlands.push({
            x: (col * (farmlandWidth + spacing)) + 403 * scale,
            y: (row * (farmlandHeight + spacing)) + 100 * scale,
            w: farmlandWidth,
            h: farmlandHeight,
            state: 'dry soil',
            timer: null,
            farmlandNumber: cellNumber,
            fullyWatered: false,
            wasWatered: false,
            doubleCrop: false,
            originalTimerLength: null,
            timerStartTime: null,
            isMoldy: false
        });
    }
};

// Draw farmlands
function drawFarmlands() {
    ctx.save();
    ctx.scale(scale, scale);
    farmlands.forEach(farmland => {
        let spriteX, spriteY, seedling, grownGrain;
        if(farmland.state === 'seeds'){
            if (farmland.wasWatered === true){
                spriteX = 0;
                spriteY = 0;
                seedling = true;
            }
            else {
                spriteX = 70;
                spriteY = 70;
                seedling = true;
            }
        }
        else if(farmland.state === 'wet soil'){
            spriteX = 0;
            spriteY = 0;
        }
        else if(farmland.state === 'grain'){
            if (farmland.fullyWatered === true || farmland.wasWatered === true){
                spriteX = 0;
                spriteY = 0;
                grownGrain = true;
            }
            else {
                spriteX = 70;
                spriteY = 70;
                grownGrain = true;
            }
        }
        else if (farmland.state === 'dry soil'){
            spriteX = 70;
            spriteY = 70;
        }
        ctx.drawImage(
            farmSpriteSheet,
            spriteX, spriteY, farmlandWidth / scale, farmlandHeight / scale,
            farmland.x / scale, farmland.y / scale, farmland.w / scale, farmland.h / scale 
        );
        if (seedling === true){
            if(farmland.doubleCrop === true){
                ctx.drawImage(masterSpriteSheet,279,4,32,20,(farmland.x / scale + 10), (farmland.y / scale + 13), 32, 20)
                ctx.drawImage(masterSpriteSheet,279,4,32,20,(farmland.x / scale + 33), (farmland.y / scale + 37), 32, 20)
            }
            else{
                ctx.drawImage(masterSpriteSheet,279,4,32,20,(farmland.x / scale + 20), (farmland.y / scale + 25), 32, 20)
            }
        }
        else if(grownGrain === true){
            if(farmland.isMoldy === true){
                if(farmland.doubleCrop === true){
                    ctx.drawImage(masterSpriteSheet,279,60,32,20,(farmland.x / scale + 10), (farmland.y / scale + 13), 32, 20)
                    ctx.drawImage(masterSpriteSheet,279,60,32,20,(farmland.x / scale + 33), (farmland.y / scale + 37), 32, 20)
                }
                else{
                    ctx.drawImage(masterSpriteSheet,279,60,32,20,(farmland.x / scale + 20), (farmland.y / scale + 25), 32, 20)
                }
            }
            else{
                if(farmland.doubleCrop === true){
                    ctx.drawImage(masterSpriteSheet,279,32,32,20,(farmland.x / scale + 10), (farmland.y / scale + 13), 32, 20)
                    ctx.drawImage(masterSpriteSheet,279,32,32,20,(farmland.x / scale + 33), (farmland.y / scale + 37), 32, 20)
                }
                else{
                    ctx.drawImage(masterSpriteSheet,279,32,32,20,(farmland.x / scale + 20), (farmland.y / scale + 25), 32, 20)
                }
            }
        }
    });
    ctx.restore();
}

// Draw menu and buttons
function drawMenu(grainAmount) {
    ctx.save();
    ctx.scale(scale, scale);
    ctx.fillStyle = '#90625d';
    ctx.fillRect(50, 70, 200, 500);
    ctx.fillStyle = '#c49a6c';
    ctx.fillRect(55, 75, 190, 490);
    if (tool === 'water bucket') {
        ctx.drawImage(masterSpriteSheet,4,100,84,84,110,294,84,84);
    }
    else {
        ctx.drawImage(masterSpriteSheet,4,4,84,88,110,290,84,88);
    };
    if (tool === 'seeds') {
        ctx.drawImage(masterSpriteSheet,187,100,84,84,110,94,84,84);
    }
    else {
        ctx.drawImage(masterSpriteSheet,187,4,84,88,110,90,84,88);
    };
    if (tool === 'scythe') {
        ctx.drawImage(masterSpriteSheet,96,100,84,84,110,194,84,84);
    }
    else {
        ctx.drawImage(masterSpriteSheet,95,4,84,88,110,190,84,88);
    }
    ctx.fillStyle = '#c49a6c';
    ctx.fillRect(70,500,160,40);
    ctx.fillStyle = 'black';
    ctx.font = '26px Arial';
    let displayGrain = Math.floor(totalGrain);
    ctx.fillText(displayGrain + ' Grain', 82, 528);
    ctx.fillStyle = '#6b4b5b';
    ctx.fillRect(70,475,160,10);
    ctx.restore();
};

// Handle tool selection
function handleToolSelection(mouseX, mouseY, buttonPressed) {
    if (mouseX >= 110 && mouseX <= 192 && mouseY >= 90 && mouseY <= 178 || buttonPressed === '1') {
        tool = 'seeds';
        drawMenu(totalGrain);
    } 
    else if (mouseX >= 110 && mouseX <= 192 && mouseY >= 190 && mouseY <= 278 || buttonPressed === '2') {
        tool = 'scythe';
        drawMenu(totalGrain);
    }
    else if(mouseX >= 110 && mouseX <= 192 && mouseY >= 290 && mouseY <= 378 || buttonPressed === '3') {
        tool = 'water bucket'
        drawMenu(totalGrain);
    }
};

// Handle farmland clicks
function handleFarmlandClick(mouseX, mouseY) {
    farmlands.forEach(farmland => {
        if (mouseX >= farmland.x / scale && mouseX <= (farmland.x / scale + farmland.w / scale) &&
        mouseY >= farmland.y / scale && mouseY <= (farmland.y / scale + farmland.h / scale)) {
            handleMoldyGrain(farmland, 'click');
            if (farmland.state === 'grain' && tool === 'scythe') {
                clearTimeout(farmland.timer);
                if (farmland.isMoldy) {
                    moldyGrainArray = moldyGrainArray.filter(item => 
                        item.farmlandNumber !== farmland.farmlandNumber
                    );
                    farmland.isMoldy = false;
                }
                farmland.timer = null;
                if(farmland.fullyWatered === true){
                    farmland.state = 'wet soil';
                    farmland.fullyWatered = false;
                    farmland.wasWatered = true;
                }
                else{
                    farmland.wasWatered = false;
                    farmland.state = 'dry soil';
                }
                if(farmland.doubleCrop === true){
                    totalGrain += 2;
                    drawMenu(totalGrain);
                }
                else{
                    totalGrain += 1;
                    drawMenu(totalGrain);
                }
            } 
            else if (tool === 'seeds' && totalGrain > 0 && (farmland.state === 'dry soil' || farmland.state === 'wet soil')) {
                totalGrain = totalGrain - .5;
                doubleCropRandomizer(farmland);
                drawMenu(totalGrain)
                if (farmland.state === 'wet soil') {
                    timerLength = (Math.floor(Math.random() * 26) + 10) * 1000; 
                } 
                else {
                    timerLength = (Math.floor(Math.random() * 26) + 25) * 1000;
                }
                farmland.state = 'seeds';
                farmland.originalTimerLength = timerLength
                farmland.timerStartTime = Date.now();
                farmland.timer = setTimeout(() => {
                    farmland.state = 'grain';
                    farmland.timer = null;
                    farmland.wasWatered = false;
                    if(farmland.fullyWatered === true && Math.random() < .15){
                        farmland.wasWatered = true;
                        farmland.isMoldy = true;
                        handleMoldyGrain(farmland, 'fully watered');
                    }
                    drawFarmlands();
                }, timerLength);
            }
            else if (farmland.state === 'dry soil' && tool === 'water bucket') {
                waterFarmlands(farmland.farmlandNumber);
            }
            else if (farmland.wasWatered === false && farmland.state === 'seeds' && tool === 'water bucket'){
                farmland.wasWatered = true;
                if(Math.random() < .5){
                    farmland.fullyWatered = true;
                };
                clearTimeout(farmland.timer);
                farmland.timer = null;
                const elapsedTime = Date.now() - farmland.timerStartTime;
                const remainingTime = farmland.originalTimerLength - elapsedTime;
                const newRemainingTime = remainingTime * .85;
                farmland.timer = setTimeout(() => {
                    farmland.state = 'grain';
                    farmland.timer = null;
                    if(farmland.fullyWatered === true && Math.random() > .45){
                        farmland.wasWatered = true;
                        farmland.isMoldy = true;
                        handleMoldyGrain(farmland, 'watered');
                    }
                    else{
                        farmland.wasWatered = false;
                    }
                    drawFarmlands();
                }, newRemainingTime);
            };
            drawFarmlands();
        };
    });
};

function handleMoldyGrain(farmland, origin){
    if(origin === 'watered'){
        moldyGrainArray.push({farmlandNumber: farmland.farmlandNumber, moldyGrainCount: 7});
    }
    else if(origin === 'fully watered'){
        moldyGrainArray.push({farmlandNumber: farmland.farmlandNumber, moldyGrainCount: 10});
    }
    else if(origin === 'click'){
        moldyGrainArray.forEach(item => {
            if (item.moldyGrainCount > 1) {
                item.moldyGrainCount -= 1;
            };
        });
        for (let i = 0; i < moldyGrainArray.length; i++) {
            if (moldyGrainArray[i].moldyGrainCount === 1) {
                const index = moldyGrainArray[i].farmlandNumber - 1;
                farmlands[index].isMoldy = false;
                farmlands[index].state = 'wet soil';
                farmlands[index].wasWatered = true;
                farmlands[index].fullyWatered = false;
            }
        }
        moldyGrainArray = moldyGrainArray.filter(item => {
            if (item.moldyGrainCount === 1) {
                return false; 
            }
            return true;
        });
    };
    drawFarmlands();
};

function doubleCropRandomizer(farmland){
    randomChance = Math.random();
    if(farmland.state === 'wet soil'){
        if(randomChance < .05){
            farmland.doubleCrop = true;
        }
        else{
            return;
        }
    }
    else{
        if(randomChance < .20){
            farmland.doubleCrop = true;
        }
        else{
            return;
        }
    };
};

canvas.addEventListener('touchstart', (event) => {
    event.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches[0];
    const mouseX = (touch.clientX - rect.left) / scale;
    const mouseY = (touch.clientY - rect.top) / scale;
    
    handleToolSelection(mouseX, mouseY);
    handleFarmlandClick(mouseX, mouseY);
});

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) / scale;
    const mouseY = (event.clientY - rect.top) / scale;
    handleToolSelection(mouseX, mouseY);
    handleFarmlandClick(mouseX, mouseY);
});

window.addEventListener('keydown', (event) => {
    const buttonPressed = event.key;
    if (['1', '2', '3'].includes(buttonPressed)) {
        handleToolSelection(null, null, buttonPressed);
    }
    else if(event.code === 'Space' && spacePressed === false){
        handleFarmlandClick(lastMouseX, lastMouseY);
        spacePressed = true;
    }
});

window.addEventListener('keyup', (event) => {
    if(event.code === 'Space' && spacePressed === true){
        spacePressed = false;
    }
})

let spacePressed = false;
let lastMouseX = 0;
let lastMouseY = 0;

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    lastMouseX = (event.clientX - rect.left) / scale;
    lastMouseY = (event.clientY - rect.top) / scale;
});

// Funtion to determine farmlands to water
function waterFarmlands(wateredFarmland) {
    const targetCell = wateredFarmland;
    const topCell = targetCell - columns;
    const bottomCell = targetCell + columns;
    const leftCell = targetCell - 1;
    const rightCell = targetCell + 1;
    const cellsToUpdate = [targetCell, topCell, bottomCell, leftCell, rightCell];

    // Modify the state for the targeted cells
    cellsToUpdate.forEach((cellNumber) => {
        const isSameRow = Math.floor((cellNumber - 1) / columns) === Math.floor((targetCell - 1) / columns);
        if (cellNumber === targetCell || isSameRow || cellNumber === topCell || cellNumber === bottomCell) {
        const farmland = farmlands.find(f => f.farmlandNumber === cellNumber);
            if (farmland) {
                if (farmland.state === 'dry soil'){
                    farmland.wasWatered = true;
                    farmland.state = "wet soil";
                }
                if (cellNumber === targetCell){
                    farmland.fullyWatered = true;
                }
            }
        }
    });
};
 
window.addEventListener('beforeunload', (event) => {
    totalGrain = totalGrain - 5;
    if(totalGrain > 0.5){
        const data = new URLSearchParams({ grain: totalGrain });
        navigator.sendBeacon(grainTransferLink, data);
    }
    else{
        return;
    };
});


// Wait for the sprite sheet to load before drawing
farmSpriteSheet.onload = checkLoadedSpriteSheets;
grassSpriteSheet.onload = checkLoadedSpriteSheets;
masterSpriteSheet.onload = checkLoadedSpriteSheets;
function checkLoadedSpriteSheets(){
    spriteSheetsLoaded++;
    if (spriteSheetsLoaded === totalSpriteSheets){
        initBackground();
        drawMenu(totalGrain);
        drawFarmlands();
        spriteSheetsLoaded = 0
    };
};

function initBackground() {
    // Initial canvas setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate initial tile grid
    maxCols = Math.ceil(canvas.width / TILE_SIZE);
    maxRows = Math.ceil(canvas.height / TILE_SIZE);
    generateTileGrid(maxCols, maxRows);
    drawBackground();
};

function generateTileGrid(cols, rows) {
    // Only create new tiles for expanded areas
    for(let y = 0; y < rows; y++) {
        if(!tileGrid[y]) tileGrid[y] = [];
        for(let x = 0; x < cols; x++) {
            if(!tileGrid[y][x]) {
               tileGrid[y][x] = Math.floor(Math.random() * 8);
            }
        }
    }
};

function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const visibleCols = Math.ceil(canvas.width / TILE_SIZE);
    const visibleRows = Math.ceil(canvas.height / TILE_SIZE);

    for(let y = 0; y < visibleRows; y++) {
        for(let x = 0; x < visibleCols; x++) {
            drawTile(tileGrid[y][x], x * TILE_SIZE, y * TILE_SIZE);
        }
    }
    ctx.fillStyle = '#D3B683';
    ctx.fillRect(365, 70, 714, 545);
};

function drawTile(tileIndex, x, y) {
    const TILES_PER_ROW = 4;
    const sheetX = (tileIndex % TILES_PER_ROW) * TILE_SIZE;
    const sheetY = Math.floor(tileIndex / TILES_PER_ROW) * TILE_SIZE;

    ctx.drawImage(
        grassSpriteSheet,
        sheetX, sheetY, TILE_SIZE, TILE_SIZE,
        x, y, TILE_SIZE, TILE_SIZE
    );
};