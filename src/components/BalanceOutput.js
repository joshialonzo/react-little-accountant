import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as utils from '../utils';

class BalanceOutput extends Component {
  render() {
    if (!this.props.userInput.format) {
      return null;
    }

    return (
      <div className='output'>
        <p>
          Total Debit: {this.props.totalDebit} Total Credit: {this.props.totalCredit}
          <br />
          Balance from account {this.props.userInput.startAccount || '*'}
          {' '}
          to {this.props.userInput.endAccount || '*'}
          {' '}
          from period {utils.dateToString(this.props.userInput.startPeriod)}
          {' '}
          to {utils.dateToString(this.props.userInput.endPeriod)}
        </p>
        {this.props.userInput.format === 'CSV' ? (
          <pre>{utils.toCSV(this.props.balance)}</pre>
        ) : null}
        {this.props.userInput.format === 'HTML' ? (
          <table className="table">
            <thead>
              <tr>
                <th>ACCOUNT</th>
                <th>DESCRIPTION</th>
                <th>DEBIT</th>
                <th>CREDIT</th>
                <th>BALANCE</th>
              </tr>
            </thead>
            <tbody>
              {this.props.balance.map((entry, i) => (
                <tr key={i}>
                  <th scope="row">{entry.ACCOUNT}</th>
                  <td>{entry.DESCRIPTION}</td>
                  <td>{entry.DEBIT}</td>
                  <td>{entry.CREDIT}</td>
                  <td>{entry.BALANCE}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    );
  }
}

BalanceOutput.propTypes = {
  balance: PropTypes.arrayOf(
    PropTypes.shape({
      ACCOUNT: PropTypes.number.isRequired,
      DESCRIPTION: PropTypes.string.isRequired,
      DEBIT: PropTypes.number.isRequired,
      CREDIT: PropTypes.number.isRequired,
      BALANCE: PropTypes.number.isRequired
    })
  ).isRequired,
  totalCredit: PropTypes.number.isRequired,
  totalDebit: PropTypes.number.isRequired,
  userInput: PropTypes.shape({
    startAccount: PropTypes.number,
    endAccount: PropTypes.number,
    startPeriod: PropTypes.date,
    endPeriod: PropTypes.date,
    format: PropTypes.string
  }).isRequired
};

export default connect(state => {
  let balance = [];

  /* YOUR CODE GOES HERE */

  // Map accounts to their labels
  let accountsMap = {};
  state.accounts.map((account) => {
    return accountsMap[account.ACCOUNT] = account.LABEL;
  });

  // Filter journal entries based on user input
  let filteredEntries = [];
  state.journalEntries.map((entry) => {
    if (
        (
          (
            state.userInput.startAccount <= entry.ACCOUNT
            &&
            entry.ACCOUNT <= state.userInput.endAccount
          )
          ||
          (
            isNaN(state.userInput.startAccount)
            &&
            entry.ACCOUNT <= state.userInput.endAccount
          )
          ||
          (
            isNaN(state.userInput.endAccount)
            &&
            state.userInput.startAccount <= entry.ACCOUNT
          )
          ||
          (
            isNaN(state.userInput.startAccount)
            &&
            isNaN(state.userInput.endAccount)
          )
        )
        &&
        (
          (
            state.userInput.startPeriod <= entry.PERIOD
            &&
            entry.PERIOD <= state.userInput.endPeriod
          )
          ||
          (
            state.userInput.startPeriod <= entry.PERIOD
            &&
            !utils.isValidDate(state.userInput.endPeriod)
          )
          ||
          (
            !utils.isValidDate(state.userInput.startPeriod)
            &&
            entry.PERIOD <= state.userInput.endPeriod
          )
          ||
          (
            !utils.isValidDate(state.userInput.startPeriod)
            &&
            !utils.isValidDate(state.userInput.endPeriod)
          )
        )
        &&
        accountsMap[entry.ACCOUNT]
      ) {
      filteredEntries.push({
        ACCOUNT: entry.ACCOUNT,
        DESCRIPTION: accountsMap[entry.ACCOUNT],
        DEBIT: entry.DEBIT,
        CREDIT: entry.CREDIT,
        BALANCE: entry.DEBIT - entry.CREDIT
      });
    }
    return null;
  });

  // Calculate balance
  let balanceMap = {};
  filteredEntries.map((entry) => {
    if (!balanceMap[entry.ACCOUNT]) {
      balanceMap[entry.ACCOUNT] = {
        ACCOUNT: entry.ACCOUNT,
        DESCRIPTION: entry.DESCRIPTION,
        DEBIT: 0,
        CREDIT: 0,
        BALANCE: 0
      };
    }
    balanceMap[entry.ACCOUNT].DEBIT += entry.DEBIT;
    balanceMap[entry.ACCOUNT].CREDIT += entry.CREDIT;
    balanceMap[entry.ACCOUNT].BALANCE += entry.DEBIT - entry.CREDIT;
    return null;
  });

  balance = Object.keys(balanceMap).map((key) => {
    return balanceMap[key];
  });

  const totalCredit = balance.reduce((acc, entry) => {
    return acc + entry.CREDIT;
  }, 0);
  
  const totalDebit = balance.reduce((acc, entry) => {
    return acc + entry.DEBIT;
  }, 0);

  return {
    balance,
    totalCredit,
    totalDebit,
    userInput: state.userInput
  };
})(BalanceOutput);
