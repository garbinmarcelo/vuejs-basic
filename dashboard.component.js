window.dashboardComponent = Vue.extend({
    template: `
    <div class="row">
        <div class="col-md-6">
            <div class="alert alert-success" role="alert">
                <h3>Saldo Contas a Receber</h3>
                <hr />
                <ul class="list-unstyled">
                    <li>Total de Contas Recebidas: <strong>{{ billsTotal(billsReceive) | currency }}</strong></li>
                    <li class="text-danger">Total de Contas Faltantes: <strong>{{ billsTotal(billsReceive, false) | currency }}</strong></li>
                </ul>
            </div>
        </div>
        <div class="col-md-6">
            <div class="alert alert-danger" role="alert">
                <h3>Saldo Contas a Pagar</h3>
                <hr />
                <ul class="list-unstyled">
                    <li class="text-success">Total de Contas Pagas: <strong>{{ billsTotal(billsPay) | currency }}</strong></li>
                    <li>Total de Contas Faltantes: <strong>{{ billsTotal(billsPay, false) | currency }}</strong></li>
                </ul>
            </div>
        </div>
        <div class="col-md-12">
            <div class="alert alert-info" role="alert">
                <h3>Saldo em Caixa</h3>
                <hr />
                <h4>Saldo: <strong :class="{
                                        'text-danger': billsTotalBalance(billsReceive, billsPay) < 0, 
                                        'text-success': billsTotalBalance(billsReceive, billsPay) > 0}">
                    {{ billsTotalBalance(billsReceive, billsPay) | currency }}
                </h4>
            </div>
        </div>
    </div>
    `,
    data: function () {
        return {
            billsReceive: 0,
            billsPay: 0
        };
    },
    created: function () {
        var self = this;
        BillPay.query().then(function (response) {
            self.billsPay = response.data;
        });
        BillReceive.query().then(function (response) {
            self.billsReceive = response.data;
        });
    },
    methods:{
        billsTotal: function (bills, positive = true) {
            var balance = 0;

            for(i = 0; i < bills.length; i++){
                if(bills[i].done === true && positive === true){
                    balance += bills[i].value;
                }else if(bills[i].done === false && positive === false){
                    balance += bills[i].value;
                }
            }
            return balance;
        },
        billsTotalBalance: function (billsReceive, billsPay) {
            var balance = 0;
            var receive = 0;
            var pay = 0;

            for(i = 0; i < billsReceive.length; i++){
                if(billsReceive[i].done === true){
                    receive += billsReceive[i].value;
                }
            }

            for(i = 0; i < billsPay.length; i++){
                if(billsPay[i].done === true){
                    pay += billsPay[i].value;
                }
            }

            balance = receive - pay;

            return balance;
        }
    }
});