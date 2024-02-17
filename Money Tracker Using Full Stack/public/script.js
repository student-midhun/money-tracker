document.getElementById('add-btn').addEventListener('click', async function() {
    const category = document.getElementById('category-select').value;
    const amount = Number(document.getElementById('amount-input').value);
    const date = document.getElementById('date-input').value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    const expense = { category, amount, date };

    try {
        // Send expense data to the server
        const response = await fetch('/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expense)
        });

        if (!response.ok) {
            throw new Error('Failed to add expense');
        }

        // Update UI with the newly added expense
        const totalAmountCell = document.getElementById('total-amount');
        let totalAmount = parseFloat(totalAmountCell.textContent);
        totalAmount += amount;
        totalAmountCell.textContent = totalAmount;

        const expenseTableBody = document.getElementById('expense-table-body');
        const newRow = expenseTableBody.insertRow();

        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            // Implement delete functionality here
        });

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;
        deleteCell.appendChild(deleteBtn);
    } catch (error) {
        console.error('Error adding expense:', error);
        alert('Failed to add expense');
    }
});
