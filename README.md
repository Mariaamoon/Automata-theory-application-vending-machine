Vending Machine DFA Simulator
An interactive Deterministic Finite Automaton (DFA) model of a vending machine, built as a simple HTML web app.
It visually demonstrates how a vending machine processes coins and dispenses drinks based on defined states and transitions.

🎯 Purpose
This project is designed for educational purposes to help students understand:

The application of dfa in real life.
State transitions in a vending machine (e.g., inserting coins, dispensing).


✨ Features

Runs Instantly – Just open the HTML file in your browser.
Visual State Diagram – Shows the vending machine’s states and transitions.
Step-by-Step Simulation – Enter inputs (coins) and watch the DFA process them.
Clear Output – Displays whether the transaction is accepted or rejected.


🛠️ How It Works
The DFA represents the vending machine as:

States – Amount owned and delivering states ["₹0", "₹5", "₹10", "₹15","₹20","₹25","₹0,deliver","₹5,deliver","₹10,deliver","₹15,deliver"];


Alphabet – Inputs like " "₹5", "₹10","₹20""
Transitions – Move between states when coins are inserted or selections are made.
Accept State – The machine dispenses the product when enough money is inserted.

Example DFA logic:
const states = ["₹0", "₹5", "₹10", "₹15","₹20","₹25","₹0,deliver","₹5,deliver","₹10,deliver","₹15,deliver"];
const startState = "₹0";
const finalStates = ["₹0,deliver","₹5,deliver","₹10,deliver","₹15,deliver"]; 
const transitions = [
    { from: "₹0", to: "₹5", symbol: "₹5" },
    { from: "₹0", to: "₹10", symbol: "₹10" }, and...

🚀 Running the App

Download or clone the repository.
Open index.html in any modern web browser.
Start interacting with the vending machine simulation.


📂 Project Structure
vending-machine-dfa/
│── app.html      # Main app file
│── style.css       # Styling
│── app.js       # DFA logic & simulation
└── README.md


📜 License
MIT License – free to use, modify, and share.

