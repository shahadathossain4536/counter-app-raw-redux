// select dom elements
const counterEl = document.getElementById("counter");
const incrementEl = document.getElementById("increment");
const decrementEl = document.getElementById("decrement");
const addCounterEl = document.getElementById("addCounterBtn");
const counterDivEl = document.getElementById("counterDiv");
const resetBtnEl = document.getElementById("resetBtn");

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const COUNTER_DIV = "counterDiv";
const ADD_COUNTER = "addCounter";
const RESET_COUNTER = "resetCounterBtn";

// action creators
const increment = (id) => {
  console.log("increment action creators", id);
  return {
    type: INCREMENT,
    payload: id,
  };
};
const decrement = (id) => {
  return {
    type: DECREMENT,
    payload: id,
  };
};
const addCounter = () => {
  return {
    type: ADD_COUNTER,
  };
};
const resetCounter = () => {
  return {
    type: RESET_COUNTER,
    payload: null,
  };
};
//Initial State
let initialState = [{ id: 1, value: 0 }];

//  create reducer function

function counterReducer(state = initialState, action) {
  if (action.type === INCREMENT) {
    return state.map((counter) => {
      console.log("action.payload.id", action.payload);
      if (counter.id === action.payload) {
        return {
          ...counter,
          value: counter.value + 1,
        };
      } else return { ...counter };
    });
  } else if (action.type === DECREMENT) {
    return state.map((counter) => {
      console.log("action.payload.id", action.payload);
      if (counter.value === 0) {
        return {
          ...counter,
          value: 0,
        };
      }
      if (counter.id === action.payload) {
        return {
          ...counter,
          value: counter.value - 1,
        };
      } else return { ...counter };
    });
  } else if (action.type === ADD_COUNTER) {
    return [...state, { id: state.length + 1, value: 0 }];
  } else if (action.type === RESET_COUNTER) {
    return [{ id: 1, value: 0 }];
  } else {
    return state;
  }
}

// create store

const store = Redux.createStore(counterReducer);
const render = () => {
  const state = store.getState();

  let counterDivLet = " ";

  state.forEach((counter) => {
    counterDivLet += `<div
            
    class="p-4 mb-5 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
>
    <div id="counter" class="text-2xl font-semibold">${counter?.value}</div>
    <div class="flex space-x-3">
        <button
            id="increment"
            onclick="incrementListener(${counter?.id})"
            class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
         
        >
            Increment
        </button>
        <button
            id="decrement"
            onclick="decrementListener(${counter?.id})"
           
            class="bg-red-400 text-white px-3 py-2 rounded shadow"
      
        >
            Decrement
        </button>
    </div>
    
</div>`;
  });
  counterDivEl.innerHTML = counterDivLet;
};
store.subscribe(render);

// update UI initially
render();

//  button click listeners
resetBtnEl.addEventListener("click", () => {
  store.dispatch(resetCounter());
  console.log("store.dispatch(resetCounter());");
});
addCounterEl.addEventListener("click", () => {
  store.dispatch(addCounter());
});

function incrementListener(id) {
  console.log("incrementListener", id);
  store.dispatch(increment(id));
}
function decrementListener(id) {
  console.log("decrementListener", id);
  store.dispatch(decrement(id));
}

incrementEl.addEventListener("click", () => {});
decrementEl.addEventListener("click", () => {
  store.dispatch(decrement(2));
});
