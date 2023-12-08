import datetime

# Function to add a new transaction
def add_transaction(transactions):
    date_input = input("Enter the date of the transaction (YYYY-MM-DD): ")
    try:
        date = datetime.datetime.strptime(date_input, "%Y-%m-%d").date()
    except ValueError:
        print("Invalid date format. Please use YYYY-MM-DD.")
        return transactions

    try:
        amount = float(input("Enter the transaction amount: "))
    except ValueError:
        print("Invalid amount. Please enter a number.")
        return transactions

    category = input("Enter the transaction category: ")
    description = input("Enter a description for the transaction: ")

    transaction = {
        "date": date,
        "amount": amount,
        "category": category,
        "description": description
    }

    transactions.append(transaction)
    print("Transaction added successfully.")
    return transactions

# Function to display summary of transactions
def display_summary(transactions):
    if not transactions:
        print("No transactions to display.")
        return

    total_expense = sum(t["amount"] for t in transactions)
    print(f"\nTotal Expense: {total_expense}")

    # Expenses by category
    category_expenses = {}
    for t in transactions:
        category_expenses[t["category"]] = category_expenses.get(t["category"], 0) + t["amount"]

    print("\nExpenses by Category:")
    for category, amount in category_expenses.items():
        print(f"{category}: {amount}")

# Main loop
def run_finance_tracker():
    transactions = []
    while True:
        print("\nFinance Tracker")
        print("1. Add a new transaction")
        print("2. Display summary")
        print("3. Exit")
        choice = input("Enter your choice: ")

        if choice == "1":
            transactions = add_transaction(transactions)
        elif choice == "2":
            display_summary(transactions)
        elif choice == "3":
            print("Exiting Finance Tracker.")
            break
        else:
            print("Invalid choice. Please enter 1, 2, or 3.")

if __name__ == "__main__":
    run_finance_tracker()
