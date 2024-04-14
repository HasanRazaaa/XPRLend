// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

// Token contract for XRPLend
contract XRPLendToken is ERC20, ERC20Permit {
    constructor() ERC20("XRPLendToken", "LEND") ERC20Permit("XRPLendToken") {}
}

// Interface for the XRPLend platform events 
interface IXRPLend {
    event OwnerChanged(address indexed oldOwner, address indexed newOwner);
}

// Loan management contract
contract XRPLendPlatform {
    struct Loan {
        uint id;
        uint amount;
        address payable borrower;
        address payable lender;
        uint interestRate;  // Interest rate as a percentage
        uint repaymentAmount;
        bool isFunded;
        bool isRepaid;
    }

    uint public nextLoanId;
    mapping(uint => Loan) public loans;

    function applyForLoan(uint amount, uint interestRate) external {
        // Calculate the repayment amount including interest
        uint repaymentAmount = amount + (amount * interestRate / 100);
        loans[nextLoanId] = Loan(nextLoanId, amount, payable(msg.sender), payable(address(0)), interestRate, repaymentAmount, false, false);
        nextLoanId++;
    }

    function fundLoan(uint loanId) external payable {
        Loan storage loan = loans[loanId];
        require(msg.value == loan.amount, "Please fund the exact loan amount");
        require(loan.lender == address(0), "Loan already funded");
        loan.lender = payable(msg.sender);
        loan.isFunded = true;
        loan.borrower.transfer(msg.value);
    }

    function repayLoan(uint loanId) external payable {
        Loan storage loan = loans[loanId];
        require(loan.isFunded, "Loan not funded");
        require(msg.sender == loan.borrower, "Only borrower can repay");
        require(msg.value == loan.repaymentAmount, "Incorrect repayment amount");
        loan.isRepaid = true;
        loan.lender.transfer(msg.value);
    }
}