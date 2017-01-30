var menuComponent = Vue.extend({
    template: `
    <nav>
        <ul class="nav nav-pills">
            <li v-for="o in menus">
                <a href="#" @click.prevent="showView(o.id)">{{ o.name }}</a>
            </li>
        </ul>
    </nav>
    `,
    data: function () {
        return {
            menus: [
                {id: 0, name: "Listar Contas"},
                {id: 1, name: "Criar Conta"}
            ],
        };
    },
    methods: {
        showView: function (id) {
            console.log(this.$dispatch);
            this.$dispatch('change-activedview', id);
            if(id == 1){
                this.$dispatch('change-formtype', 'insert');
                // this.$parent.formType = 'insert';
                this.$parent.legendForm = 'Cadastrar Conta';
                this.$parent.clearForm();
            }
        },
    }
});

var billListComponent = Vue.extend({
    template: `
    <table class="table table-hover table-bored">
        <thead>
            <tr>
                <th class="text-center">#</th>
                <th class="text-center">Vencimento</th>
                <th class="text-center">Nome</th>
                <th class="text-center">Valor</th>
                <th class="text-center">Paga?</th>
                <th class="text-center">Ações</th>
            </tr>
        </thead>
        <tbody>
            <!--<tr v-if="billsCount == 0">-->
                <!--<td colspan="6" class="text-center text-muted">Nenhuma conta cadastrada</td>-->
            <!--</tr>-->
            <!--<tr v-else v-for="(o, index) in bills">-->
            <tr v-for="(o, index) in bills">
                <td class="text-center">{{ index + 1 }}</td>
                <td class="text-center">{{ o.date_due }}</td>
                <td class="text-center">{{ o.name }}</td>
                <td class="text-center">{{ o.value | currency('pt-br') }}</td>
                <td class="text-center">
                    <div class="checkbox" :class="{'text-success': o.done, 'text-danger': !o.done}">
                        <label>
                            <input type="checkbox" v-model="o.done"> {{ o.done | doneLabel }}
                        </label>
                    </div>
                </td>
                <td width="200" class="text-center">
                    <a href="#" class="btn btn-sm btn-primary" @click.prevent="loadBill(o)"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Editar</a>
                    <a href="#" class="btn btn-sm btn-danger" @click.prevent="delBill(index)"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Deletar</a>
                </td>
            </tr>
        </tbody>
    </table>
    `,
    data: function () {
        return {
            bills: [
                {date_due: '20/08/2016', name: 'Conta de Luz', value: 25.99, done: true},
                {date_due: '20/09/2016', name: 'Conta de Luz', value: 35.99, done: false},
                {date_due: '20/10/2016', name: 'Conta de Luz', value: 45.99, done: false},
                {date_due: '20/11/2016', name: 'Conta de Luz', value: 55.99, done: false},
                {date_due: '20/12/2016', name: 'Conta de Luz', value: 95.99, done: false},
            ]
        };
    },
    methods: {
        loadBill: function (bill) {
            this.$parent.bill = bill;
            this.$parent.activedView = 1;
            this.$parent.formType = 'update';
            console.log(this.$parent);
            this.$parent.legendForm = 'Editar Conta';
        },
        delBill: function (index) {
            console.log('delete');
            this.bills.splice(index, 1);
            /*
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
             console.log('deleted');
             swal(
             'Deletado!',
             'Registro deletado com sucesso.',
             'success'
             );
             }).catch(swal.noop);*/
        }
    },
    filters: {
        doneLabel: function (value) {
            if(value == false){
                return 'Não Paga';
            }else{
                return 'Paga';
            }
        },
        currency: function (value, locale) {
            // numeral.js basic config
            numeral.locale(locale);
            numeral.defaultFormat('$0,0.00[00]');

            return numeral(value).format();
        }
    }
});

var billCreateComponent = Vue.extend({
    template: `
    <form name="form" @submit.prevent="submit">
        <legend>{{ legendForm }}</legend>
        <div class="form-group">
            <label for="vencimento">Vencimento</label>
            <input type="text" class="form-control" name="vencimento" id="vencimento" v-model="bill.date_due" placeholder="Ex: dd/mm/yyyy" />
        </div>
        <div class="form-group">
            <label for="name">Nome</label>
            <select name="name" id="name" class="form-control" v-model="bill.name">
                <option value="">-- Selecionar --</option>
                <option v-for="name in names" :value="name">{{ name }}</option>
            </select>
        </div>
        <div class="form-group">
            <label for="valor">Valor</label>
            <input type="text" class="form-control" name="valor" id="valor" v-model="bill.value" />
        </div>
        <div class="form-group">
            <div class="checkbox">
                <label>
                    <input type="checkbox" v-model="bill.done"> Paga?
                </label>
            </div>
        </div>
        <button type="submit" class="btn btn-success btn-block"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span> Salvar</button>
    </form>
    `,
    props: ['bill', 'formType', 'legendForm'],
    data: function () {
        return {
            names: [
                'Conta de Luz',
                'Conta de Àgua',
                'Conta de Telefone',
                'Conta de Supermercado',
                'Cartão de Crédito',
                'Emprestimo',
                'Gasolina'
            ],
        };
    },
    methods: {
        submit: function () {
            if(this.formType == 'insert'){
                this.$parent.$refs.billListComponent.bills.push(this.bill);
            }
            this.$parent.clearForm();
            this.$parent.activedView = 0;
        },
    }
});

var appComponent = Vue.extend({
    components: {
        'menu-component': menuComponent,
        'bill-list-component': billListComponent,
        'bill-create-component': billCreateComponent
    },
    template: `
    <div class="row">
        <div class="col-md-12">
            <h1>
                {{ title }}
                <small v-html="this.$options.filters.statusBills(billsUnpaid, billsCount)" class="alert pull-right"
                       :class="{
                       'well well-sm alert alert-default text-muted': billsCount == 0,
                       'alert alert-danger text-danger': billsUnpaid > 0,
                       'alert alert-success text-success': (billsCount > 0 && billsUnpaid == 0)
                       }">
                </small>
            </h1>
            <menu-component></menu-component>
        </div>
        <div class="col-md-12">
            <div v-show="activedView == 0">
                <bill-list-component ref="billListComponent"></bill-list-component>
                <smal class="well well-sm pull-right">Total de Contas: {{ billsCount }}</smal>
            </div>
            <div v-show="activedView == 1">
                <bill-create-component :bill.sync="bill" :form-type="formType" :legend-form="legendForm"></bill-create-component>
            </div>
        </div>
    </div>
    `,
    data: function() {
        return {
            test: '',
            title: 'Contas a Pagar',
            legendForm: 'Cadastrar Conta',
            activedView: 0,
            formType: 'insert',
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            },
        };
    },
    computed: {
        billsCount: function () {
            console.log('billsCount');
            console.log(this.$refs.billListComponent);
            return 0;
        },
        // return this.$refs.billListComponent.bills.length;
        billsUnpaid: function () {
            console.log('billsUnpaid');
            console.log(this.$refs.billListComponent);
            // var billListComponent = this.$refs.billListComponent;
            // var count = 0;
            // for(var i in billListComponent.bills){
            //     if(!billListCompnent.bills[i].done){
            //         count++;
            //     }
            // }
            // return count;
            return 0;
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
    },
    events:{
        'change-activedview': function (activedView) {
            this.activedView = activedView;
        },
        'change-formtype': function (formType) {
            this.formType = formType;
        }
    },
    filters: {
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

Vue.component('app-component', appComponent);
var app = new Vue({
    el: '#app',
});