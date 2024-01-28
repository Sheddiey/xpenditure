import React, { useState } from 'react'
import { UserAuth } from '../../Context/AuthContext';
import { addDoc } from 'firebase/firestore';
import { auth } from '../../firebase';

const ExpenseForm = ({onClose}) => {
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');

  const { getUserExpenses, expensesCollectionRef } = UserAuth();

  const handleSaveClick = async (e) => {
    e.preventDefault();
    if (title.trim() === "" || cost.trim() === "") {
      alert("Please enter both title and cost");
      return;
    }
    try {
      await addDoc(expensesCollectionRef, {
        expenseTitle: title,
        expenseAmount: Number(cost),
        userId: auth?.currentUser?.uid,
      });
      getUserExpenses();
      console.log("UserExpenses added succesfully")
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div className="grid gap-[10px] ">
      <input
        className="bg-transparent p-[5px]  border border-dotted outline-none"
        type="text"
        placeholder="Input expense title"
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="bg-transparent p-[5px]  border border-dotted outline-none"
        type="number"
        min="1"
        placeholder="Input expense cost"
        onChange={(e) => setCost(e.target.value)}
        required
      />
      <div className="flex gap-[10px]">
        <input
          className=" text-black bg-[#ffe600] w-[100%] py-[5px] rounded-[5px] cursor-pointer"
          type="submit"
          value="Save Expense"
          onClick={handleSaveClick}
        />
        <input
          className=" text-black bg-[#ffe600] w-[100%] py-[5px] rounded-[5px] cursor-pointer"
          type="submit"
          value="Cancel"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default ExpenseForm
