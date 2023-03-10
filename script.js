'use strict';

/////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////

const accounts = [
  {
    owner: 'Mubasshir Ahmed c',
    movements: [2500, 500, -750, 1200, 3200, -1500, 500, 1200, -1750, 1800],
    interestRate: 1.5, // %
    password: 1234,
    // movementsDates: [
    //   '2021-11-18T21:31:17.178Z',
    //   '2021-12-23T07:42:02.383Z',
    //   '2022-01-28T09:15:04.904Z',
    //   '2022-04-01T10:17:24.185Z',
    //   '2022-07-08T14:11:59.604Z',
    //   '2022-09-18T17:01:17.194Z',
    //   '2022-09-21T23:36:17.929Z',
    //   '2022-09-25T12:51:31.398Z',
    //   '2022-09-28T06:41:26.190Z',
    //   '2022-09-29T08:11:36.678Z',
    // ],
    currency: 'USD',
    locale: 'en-US',
  },
  {
    owner: 'Abrar n chmed',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -300, 1500, -1850],
    interestRate: 1.3, // %
    password: 1234,
    // movementsDates: [
    //   '2021-12-11T21:31:17.671Z',
    //   '2021-12-27T07:42:02.184Z',
    //   '2022-01-05T09:15:04.805Z',
    //   '2022-02-14T10:17:24.687Z',
    //   '2022-03-12T14:11:59.203Z',
    //   '2022-05-19T17:01:17.392Z',
    //   '2022-08-22T23:36:17.522Z',
    //   '2022-09-25T12:51:31.491Z',
    //   '2022-09-28T06:41:26.394Z',
    //   '2022-09-29T08:11:36.276Z',
    // ],
    currency: 'EUR',
    locale: 'en-GB',
  },
];

/////////////////////////////////////////////////////////////
// Elements
/////////////////////////////////////////////////////////////

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance-value');
const labelSumIn = document.querySelector('.summary-value-in');
const labelSumOut = document.querySelector('.summary-value-out');
const labelSumInterest = document.querySelector('.summary-value-interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login-btn');
const btnTransfer = document.querySelector('.form-btn-transfer');
const btnLoan = document.querySelector('.form-btn-loan');
const btnClose = document.querySelector('.form-btn-close');
const btnSort = document.querySelector('.btn-sort');

const inputLoginUsername = document.querySelector('.login-input-username');
const inputLoginPassword = document.querySelector('.login-input-password');
const inputTransferTo = document.querySelector('.form-input-to');
const inputTransferAmount = document.querySelector('.form-input-amount');
const inputLoanAmount = document.querySelector('.form-input-loan-amount');
const inputCloseUsername = document.querySelector('.form-input-username');
const inputClosePassword = document.querySelector('.form-input-password');

// /////////////MOVEMENTS/////////////

function displayMovements(account) {
  containerMovements.innerHTML = '';
  const moves = account.movements;
  moves.forEach((move, i) => {
    const type = move > 0 ? 'deposit' : 'withdrawal';
    const moveHTML = `
       <div class="movements-row">
          <div class="movements-type movements-type-${type}">${
      i + 1
    }. ${type}</div>
          <div class="movements-date">5 days ago</div>
          <div class="movements-value">$${move}</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', moveHTML);
  });
}
displayMovements(accounts[0]);

// /////////////SUMMARY/////////////
function displaySummary(account) {
  // INCOME
  const incomes = account.movements
    .filter((move) => move > 0)
    .reduce((acc, deposit) => acc + deposit, 0);
  labelSumIn.textContent = `$${incomes}`;
  // OUTCOME
  const outcomes = account.movements
    .filter((move) => move < 0)
    .reduce((acc, withdrawal) => acc + withdrawal, 0);
  labelSumOut.textContent = `$${Math.abs(outcomes)}`;
  // ///////INTEREST////////;
  const interest = account.movements
    .filter((move) => move > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = `$${interest}`;
}
displaySummary(accounts[0]);

// ///////BALANCE////////;
function displayBalance(account) {
  account.balance = account.movements.reduce((acc, move) => acc + move, 0);
  labelBalance.textContent = `$${account.balance}`;
}
displayBalance(accounts[0]);

// ///////USERNAME////////;

function createUserNames(accounts) {
  accounts.forEach((account) => {
    account.userName = account.owner
      .toLowerCase()
      .split(' ')
      .map((word) => word.at(0))
      .join('');
  });
}
createUserNames(accounts);

// ///////LOGIN////////;
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  accounts.find((account) => account.userName === inputLoginUsername.value);
});
