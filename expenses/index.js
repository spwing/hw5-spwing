import { createApp } from "https://mavue.mavo.io/mavue.js";


globalThis.app = createApp({
	data: {
		expenses: [],
		my: {}
	},

	methods: {
		/**
		 * Currency convert function stub.
		 * In a real app, you would use an API to get the latest exchange rates,
		 * and we'd need to support all currency codes, not just EUR, USD and GBP.
		 * However, for the purposes of this assignment, this is fine.
		 * @param {"EUR" | "USD" | "GBP"} from - Currency code to convert from
		 * @param {"EUR" | "USD" | "GBP"} to - Currency code to convert to
		 * @param {number} amount - Amount to convert
		 * @returns {number} Converted amount
		 */
		currencyConvert(from, to, amount) {
			const rates = {
				USD: 1,
				EUR: 0.99,
				GBP: 0.85
			};

			let tot = amount * rates[to] / rates[from]
			if(isNaN(tot)){
				return "";
			}
			else{
				return tot.toFixed(2);
			}
			
		},
		addExpense() {
			this.expenses.unshift(this.my);
			this.my = {};


		},

		removeExpense(index) {
			this.previous = {
				value: this.expenses.splice(index, 1)[0],
				index: index
			};
		},
		forYourselfDropdown(tableNumber) {
			var x = document.getElementById("table"+tableNumber);
			if (x.style.display === "block") {
				x.style.display = "none";
			} else {
				x.style.display = "block";
			}
		},
		greaterThanZero(number) {
			if (number >= 0)
				return true;
			else
				return false;
		}
	},
	computed: {
		totalBalance () {
			let total = 0;

			for (let expense of this.expenses)
				total += expense.amount;

			return total;
		},
		totalBalanceTrinityPaid () {
			let total = 0;

			for (let expense of this.expenses) {
				if (!expense.neo_paid_bool)
					total += expense.amount;
			}
			return total;

		},
		totalBalanceNeoPaid() {
			let total = 0;

			for (let expense of this.expenses) {
				if (expense.neo_paid_bool)
					total += expense.amount;
			}
			return total;
		},
	
		totalTrinityOwes () {
			return (this.totalBalanceTrinityPaid - this.totalBalanceNeoPaid)/2
		},
		
		totalNeoOwes () {
			return (this.totalBalanceNeoPaid - this.totalBalanceTrinityPaid)/2
		},
	}

	

}, "#app");


