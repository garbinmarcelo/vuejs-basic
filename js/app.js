var app = new Vue({
    el: '#app',
    data: {
        test: '',
        title: 'Contas a Pagar',
        legendForm: 'Cadastrar Conta',
        menus: [
            {id: 0, name: "Listar Contas"},
            {id: 1, name: "Criar Conta"}
        ],
        activedView: 0,
        formType: 'insert',
        bill: {
            date_due: '',
            name: '',
            value: 0,
            done: false
        },
        names: [
            'Conta de Luz',
            'Conta de Àgua',
            'Conta de Telefone',
            'Conta de Supermercado',
            'Cartão de Crédito',
            'Emprestimo',
            'Gasolina'
        ],
        bills: [
            {date_due: '20/08/2016', name: 'Conta de Luz', value: 25.99, done: true},
            {date_due: '20/09/2016', name: 'Conta de Luz', value: 35.99, done: false},
            {date_due: '20/10/2016', name: 'Conta de Luz', value: 45.99, done: false},
            {date_due: '20/11/2016', name: 'Conta de Luz', value: 55.99, done: false},
            {date_due: '20/12/2016', name: 'Conta de Luz', value: 95.99, done: false},
        ]
    },
    computed: {
        billsCount: function () {
            return this.bills.length;
        },
        billsUnpaid: function () {
            var count = 0;
            for(var i in this.bills){
                if(!this.bills[i].done){
                    count++;
                }
            }
            return count;
        }
    },
    methods: {
        clearForm: function () {
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            };
        },
        showView: function (id) {
            this.activedView = id;
            if(id == 1){
                this.formType = 'insert';
                this.legendForm = 'Cadastrar Conta';
                this.clearForm();
            }
        },
        submit: function () {
            if(this.formType == 'insert'){
                this.bills.push(this.bill);
            }
            this.clearForm();
            this.activedView = 0;
        },
        loadBill: function (bill) {
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update';
            this.legendForm = 'Editar Conta';
        },
        delBill: function (index) {
            swal({
                title: 'Tem certeza?',
                text: "Você não será capaz de reverter isso!",
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, Deletar registro!'
            }).then(function () {
                app.bills.splice(index, 1);
                swal(
                    'Deletado!',
                    'Registro deletado com sucesso.',
                    'success'
                );
            }).catch(swal.noop);
        }
    },
    filters: {
        currency: function (value, locale) {
            // numeral.js basic config
            numeral.locale(locale);
            numeral.defaultFormat('$0,0.00[00]');

            return numeral(value).format();
        },
        doneLabel: function (value) {
            if(value == 0){
                return 'Não Paga';
            }else{
                return 'Paga';
            }
        },
        statusBills: function (value, billsCount) {
            if(billsCount == 0){
                return '<span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span> Nenhuma conta cadastrada';
            }else if(value > 0){
                return  '<span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span> Existem <strong>' + value + '</strong> contas a serem pagas';
            }else{
                return '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span> Nenhuma conta a pagar';
            }
        }
    }
});