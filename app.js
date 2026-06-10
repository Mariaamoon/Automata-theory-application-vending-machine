const states = ["₹0", "₹5", "₹10", "₹15","₹20","₹25","₹0,deliver","₹5,deliver","₹10,deliver","₹15,deliver"];
const startState = "₹0";
const finalStates = ["₹0,deliver","₹5,deliver","₹10,deliver","₹15,deliver"]; 
const transitions = [
    { from: "₹0", to: "₹5", symbol: "₹5" },
    { from: "₹0", to: "₹10", symbol: "₹10" },
    { from: "₹0", to: "₹20", symbol: "₹20" },
    { from: "₹5", to: "₹10", symbol: "₹5" },
    { from: "₹5", to: "₹15", symbol: "₹10" },
    { from: "₹5", to: "₹25", symbol: "₹20" },
    { from: "₹10", to: "₹15", symbol: "₹5" },
    { from: "₹10", to: "₹20", symbol: "₹10" },
    { from: "₹10", to: "₹0,deliver", symbol: "₹20" },
    { from: "₹15", to: "₹20", symbol: "₹5" },
    { from: "₹15", to: "₹25", symbol: "₹10" },
    { from: "₹15", to: "₹5,deliver", symbol: "₹20" },
    { from: "₹20", to: "₹25", symbol: "₹5" },
    { from: "₹20", to: "₹0,deliver", symbol: "₹10" },
    { from: "₹20", to: "₹10,deliver", symbol: "₹20" },
    { from: "₹25", to: "₹0,deliver", symbol: "₹5" },
    { from: "₹25", to: "₹5,deliver", symbol: "₹10" },
    { from: "₹25", to: "₹15,deliver", symbol: "₹20" },
    { from: "₹0,deliver", to: "₹5", symbol: "₹5" },
    { from: "₹0,deliver", to: "₹10", symbol: "₹10" },
    { from: "₹0,deliver", to: "₹20", symbol: "₹20" },
    { from: "₹5,deliver", to: "₹10", symbol: "₹5" },
    { from: "₹5,deliver", to: "₹15", symbol: "₹10" },
    { from: "₹5,deliver", to: "₹25", symbol: "₹20" },
    { from: "₹10,deliver", to: "₹15", symbol: "₹5" },
    { from: "₹10,deliver", to: "₹20", symbol: "₹10" },
    { from: "₹10,deliver", to: "₹0,deliver", symbol: "₹20" },
    { from: "₹15,deliver", to: "₹20", symbol: "₹5" },
    { from: "₹15,deliver", to: "₹25", symbol: "₹10" },
    { from: "₹15,deliver", to: "₹5,deliver", symbol: "₹20" }

];
// =============================================================

let currentState = startState;

// Get SVG canvas
const svg = document.getElementById("dfaCanvas");

// Arrowhead definition
svg.innerHTML = `
<defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" 
            refX="10" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="white" />
    </marker>
</defs>
`;

//const centerX = 400, centerY = 200, radius = 150;
const centerX = 600;
const centerY = 350;
const radius = 250;
const statePositions = {};
states.forEach((state, i) => {
    const angle = (2 * Math.PI / states.length) * i;
    statePositions[state] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
    };
});

// Draw transitions
transitions.forEach(t => {
    const fromPos = statePositions[t.from];
    const toPos = statePositions[t.to];
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", fromPos.x);
    line.setAttribute("y1", fromPos.y);
    line.setAttribute("x2", toPos.x);
    line.setAttribute("y2", toPos.y);
    line.setAttribute("class", "arrow");
    svg.appendChild(line);

    const labelX = (fromPos.x + toPos.x) / 2;
    const labelY = (fromPos.y + toPos.y) / 2 - 10;
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", labelX);
    label.setAttribute("y", labelY);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("fill", "white");
    label.textContent = t.symbol;
    svg.appendChild(label);
});

// Draw states
const stateCircles = {};
states.forEach(state => {
    const pos = statePositions[state];
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", pos.x);
    circle.setAttribute("cy", pos.y);
    circle.setAttribute("r", 40);
    circle.setAttribute("class", "state" + (finalStates.includes(state) ? " final" : ""));
    svg.appendChild(circle);
    stateCircles[state] = circle;

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", pos.x);
    text.setAttribute("y", pos.y + 5);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("class", "label");
    text.textContent = state;
    svg.appendChild(text);
});

// Start arrow
const startPos = statePositions[startState];
const startArrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
startArrow.setAttribute("x1", startPos.x - 80);
startArrow.setAttribute("y1", startPos.y);
startArrow.setAttribute("x2", startPos.x - 40);
startArrow.setAttribute("y2", startPos.y);
startArrow.setAttribute("class", "arrow");
svg.appendChild(startArrow);

// Highlight current state
function highlightState(state) {
    Object.values(stateCircles).forEach(c => c.classList.remove("active"));
    stateCircles[state].classList.add("active");
}
highlightState(currentState);

// Insert coin logic
function insertCoin(amount) {
    let nextState = null;
    for (let t of transitions) {
        if (t.from === currentState && t.symbol === `₹${amount}`) {
            nextState = t.to;
            break;
        }
    }
    if (nextState) {
        currentState = nextState;
        highlightState(currentState);
        if (finalStates.includes(currentState)) {
            document.getElementById("status").textContent = "✅ Drink dispensed!";
        } else {
            document.getElementById("status").textContent = `Current balance: ${currentState}`;
        }
    } else {
        document.getElementById("status").textContent = "❌ Invalid coin for this state.";
    }
}

// Reset machine
function resetMachine() {
    currentState = startState;
    highlightState(currentState);
    document.getElementById("status").textContent = "Machine reset. Current balance: ₹0";
}