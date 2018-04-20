/* global localStorage */
const Vue = require('vue/dist/vue.common');
const utils = require('../lib/utils');

module.exports = Vue.component('wallet-card', {
	template: `
	<div class="card box-shadow">
		<div class="card-header">
			<h4 class="my-0 font-weight-normal">Wallet</h4>
		</div>
		<div class="card-body">
			<h1 class="card-title pricing-card-title">{{minerOutput.shares}}
				<small class="text-muted">accepted shares</small>
			</h1>
			<button type="button"
				class="btn btn-lg btn-block btn-outline-primary"
				v-on:click="openExternal(\`https://zcash.flypool.org/miners/\${address}/dashboard\`)"
				v-bind:disabled="!addressIsValid">View Dashboard
			</button>
		</div>
		<input type="text"
			placeholder="Your ZEC Address (e.g. t1hASvMj8e6TXWryuB3L5TKXJB7XfNioZP3)"
			class="form-control"
			v-bind:class="{ 'is-valid': addressIsValid, 'is-invalid': !addressIsValid}"
			style="margin-bottom: 10px; width:100%;"
			v-model.trim="address"
			v-bind:disabled="mining"
		 >
	</div>
	`,
	props: ['mineroutput', 'mining'],
	data: () => ({
		address: ''
	}),
	computed: {
		addressIsValid() {
			return utils.isAddress(this.address);
		},
		minerOutput() {
			return this.mineroutput;
		}
	},
	watch: {
		address() {
			this.$emit('address-change', this.address);
		}
	},
	created() {
		this.address = localStorage.getItem('address') || '';
	}
});
