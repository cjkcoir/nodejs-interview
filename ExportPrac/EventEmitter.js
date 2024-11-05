const EventEmitter = require("events"); // Import the events module which provides the EventEmitter class
const myEmitter = new EventEmitter(); // Create an instance of EventEmitter

// Register an event listener for the "Pizza-Ordered" event
myEmitter.on("Pizza-Ordered", (size, toppings) => {
  // Log a message when the "Pizza-Ordered" event is triggered
  console.log(`Order received. Baking: ${size} pizza with ${toppings} topping`);
});

// Emit the "Pizza-Ordered" event with the arguments "Long-sized" and "Cheese"
myEmitter.emit("Pizza-Ordered", "Long-sized", "Cheese");
