# Josué Alonzo: Little Accountant

## Coding Challenge

Your task is to finish the Redux `mapStateToProps` function to a program to help an accountant to get balances from accounting journals.

## Getting started

Install modules by running `npm install` in the command line, then `npm run start`.

## Inputs & Outputs

Journal and Accounts input fields are already parsed and stored in the app's
Redux store.

User input has the following form:

    AAAA BBBB CCC-YY DDD-YY EEE

- AAAA is the starting account (* means first account of source file)
- BBBB is the ending account(* means last account of source file)
- CCC-YY is the first period (* means first period of source file)
- DDD-YY is the last period (* means last period of source file)
- EEE is output format (values can be HTML or CSV).

Examples of user inputs:

    1000 5000 MAR-16 JUL-16 HTML

This user request must output all accounts from acounts starting with "1000" to accounts starting with "5000", from period MAR-16 to JUL-16. Output should be formatted as an HTML table.

![1000 5000 MAR-16 JUL-16 HTML](/example-1.png)

    2000 * * MAY-16 CSV

This user request must output all accounts from accounts starting with "2000" to last account from source file, from first period of file to MAY-16. Output should be formatted as CSV.

![2000 * * MAY-16 CSV](/example-2.png)

## Challenge

Parsing input fields and storing in Redux has already been implemented; it's up to you to filter the journals and accounts to create the balance data set. This code should go into the selector function at the bottom of the BalanceOutput component. The BalanceOutput component expects balance to be an array of objects with the keys: ACCOUNT, DESCRIPTION, DEBIT, CREDIT, and BALANCE.

## Post challenge

After you're done, commit your changes, push to your GitHub and send us a link.

## Repository

* [Josué Alonzo: React Little Accountant](https://github.com/joshialonzo/react-little-accountant)

## References

* [How to Install Yarn on Debian 12](https://www.geeksforgeeks.org/how-to-install-yarn-on-debian-12/)
* [Yarn Usage](https://classic.yarnpkg.com/lang/en/docs/usage/)
* [Connect: Extracting Data with mapStateToProps](https://react-redux.js.org/using-react-redux/connect-mapstate)
* [React PropTypes](https://legacy.reactjs.org/docs/typechecking-with-proptypes.html)
* [How to create a Dictionary with Key/Value pairs](https://www.pietschsoft.com/post/2015/09/05/javascript-basics-how-to-create-a-dictionary-with-keyvalue-pairs)
* [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
* [Detecting an "invalid date" Date instance in JavaScript](https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript)