window.billPayListComponent = Vue.extend({
    template: `
    <table class="table table-hover table-bored">
        <thead>
            <tr>
                <th class="text-center">#</th>
                <th class="text-center">Código</th>
                <th class="text-center">Vencimento</th>
                <th class="text-center">Nome</th>
                <th class="text-center">Valor</th>
                <th class="text-center">Paga?</th>
                <th class="text-center">Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="billsCount === 0">
                <td colspan="7" class="text-center text-muted">Nenhuma conta cadastrada</td>
            </tr>
            <tr v-else v-for="(o, index) in bills">
                <td class="text-center">{{ index + 1 }}</td>
                <td class="text-center">{{ o.id }}</td>
                <td class="text-center">{{ o.date_due }}</td>
                <td class="text-center">{{ o.name }}</td>
                <td class="text-center">{{ o.value | currency('pt-br') }}</td>
                <td width="180" class="text-center">
                    <div class="checkbox" :class="{'text-success': o.done, 'text-danger': !o.done}">
                        <label>
                            <input type="checkbox" v-model="o.done" @click="doneBill(o)"> {{ o.done | doneLabel }}
                        </label>
                    </div>
                </td>
                <td width="180" class="text-center">
                    <router-link :to="{ name: 'bill-pay.update', params: {id: o.id} }" class="btn btn-sm btn-primary"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Editar</router-link>
                    <a href="#" class="btn btn-sm btn-danger" @click.prevent="delBill(o, index)"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Deletar</a>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="7" class="text-right"><small>Total de Contas: {{ billsCount() }}</small></td>
            </tr>
        </tfoot>
    </table>
    `,
    data: function () {
        return {
            bills: [],
            totalBills: 0
        };
    },
    created: function () {
        eventHub.$emit('change-info');
        var self = this;
        BillPay.query().then(function (response) {
            self.bills = response.data;
        });
    },
    methods: {
        billsCount: function(){
            var self = this;
            BillPay.query().then(function (response) {
                self.totalBills = response.data.length;
            });
            return self.totalBills;
        },
        doneBill: function (bill) {
            BillPay.update({id: bill.id}, bill).then(function (response) {
                eventHub.$emit('change-info');
            });
        },
        delBill: function (bill, index) {
            var self = this;
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
                BillPay.delete({id: bill.id}).then(function (response) {
                    self.bills.splice(index, 1);
                    self.billsCount();
                    eventHub.$emit('change-info');
                    swal(
                        'Deletado!',
                        'Registro deletado com sucesso.',
                        'success'
                    );
                });
             }).catch(swal.noop);
        }
    }
});