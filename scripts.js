    // I have used $$ which is a shortcut for document.querySelector
    // The reason $$ is used is to make the code more readable, and similar to jQuery
    const $$ = (selector) => document.querySelector(selector);
    const getCurrentOutput = () => $$('#output span').innerText;
    const setCurrentOutput = (val) => $$('#output span').innerText = val;
    // Variables to store the input key and the previous key
    let inputKey = ""; // anytime the user clicks a key, the inputKey is updated
    let previousKey = ""; // anytime the user clicks a key, the previousKey is updated
    const operators = "/*-+"; // List of operators
    const calculator = $$ ("#calculator"); // The calculator div
    
    // As mentioned in week 4 class, I have used event delegation to handle the events on calculator div
    
    calculator.addEventListener('click', (e) => { // now on every click on the calculator div is handled
      // Here I check if the clicked element is a key 
      if(e.target && e.target.classList.contains('key')) {
        inputKey = e.target.innerText; // inputKey is set to the text of the clicked key
        
        // If the key is numeric (or a decimal point)
        if(!isNaN(parseInt(inputKey)) || inputKey === ".") {
          if(getCurrentOutput() === '0'){
            setCurrentOutput(inputKey);
          } else {
            setCurrentOutput(getCurrentOutput() + inputKey);
          }
          previousKey = inputKey;
        }
        
        // If the input key is an operator
        if(operators.includes(inputKey)) {
          if(!operators.includes(previousKey)) { 
            // If the previous key is not an operator
            setCurrentOutput(getCurrentOutput() + inputKey); // treat it as string and add the operator
          } else {
            // If the previous key is an operator
            // .slice(0, -1) will remove the previous operator
            setCurrentOutput(getCurrentOutput().slice(0, -1) + inputKey); // remove the previous operator and add the new operator
          }
          previousKey = inputKey;
        }
        
        // Evaluate expression on "="
        if(inputKey === '='){
          try {
            setCurrentOutput(eval(getCurrentOutput()));
          } catch(e) {
            setCurrentOutput("Error");
          }
        }
        
        // Clear on "AC"
        if(inputKey === 'AC'){
          setCurrentOutput('0');
        }
        
        // Toggle sign on "+/-"
        if(inputKey === '+/-'){
          setCurrentOutput(-1 * eval(getCurrentOutput()));
        }
        
        // Percentage on "%"
        if(inputKey === '%'){
          setCurrentOutput(eval(getCurrentOutput()) / 100);
        }

    


      }
    });
