import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { UserAuth } from "../../Context/AuthContext";

const ExpenseItem = ({ title, amount, id }) => {
  const formattedDate = new Date().toLocaleDateString();
  const { deleteExpense } = UserAuth();

  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleDelete = () => {
    deleteExpense(id);
  };

  return (
    <div
      onMouseEnter={() => setShowDeleteButton(true)}
      onMouseLeave={() => setShowDeleteButton(false)}
    >
      <div className="line-2"></div>

      <div className="flex items-center justify-between">
        <div className="flex gap-[10px]">
          <div className="icon-container-expenses">
            <FontAwesomeIcon className="icon" icon={faCreditCard} />{" "}
          </div>
          <div className="flex flex-col">
            <h3 className="text-[18px] capitalize">{title}</h3>

            <p className="mt-[-5px] text-white">
              <span className="text-[12px] text-gray-400">Date:</span>
              {formattedDate}
            </p>
          </div>
        </div>
        <h4 className="text-[24px]">
          {amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}{" "}
        </h4>
      </div>
      {showDeleteButton && (
        <div className="">
          <button
            onClick={handleDelete}
            className=" my-[10px] text-black bg-[#ffe600] w-[100%] py-[5px] rounded-[5px] cursor-pointer"
          >
            Delete expense
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseItem;
