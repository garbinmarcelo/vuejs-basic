window.billReceiveListComponent = Vue.extend({
    template: `
    <table class="table table-hover table-bored">
        <thead>
            <tr>
                <th class="text-center">#</th>
                <th class="text-center">Data Pagamento</th>
                <th class="text-center">Nome</th>
                <th class="text-center">Valor</th>
                <th class="text-center">Recebida?</th>
                <th class="text-center">Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="billsCount === 0">
                <td colspan="6" class="text-center text-muted">Nenhuma conta cadastrada</td>
            </tr>
            <tr v-else v-for="(o, index) in bills">
                <td class="text-center">{{ index + 1 }}</td>
                <td class="text-center">{{ o.date_due }}</td>
                <td class="text-center">{{ o.name }}</td>
                <td class="text-center">{{ o.value | currency('pt-br') }}</td>
                <td width="180" class="text-center">
                    <div class="checkbox" :class="{'text-success': o.done, 'text-danger': !o.done}">
                        <label>
                            <input type="checkbox" v-model="o.done"> {{ o.done | doneLabel }}
                        </label>
                    </div>
                </td>
                <td width="180" class="text-center">
                    <router-link :to="{ name: 'bill-receive.update', params: {index: index} }" class="btn btn-sm btn-primary"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Editar</router-link>
                    <a href="#" class="btn btn-sm btn-danger" @click.prevent="delBill(index)"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Deletar</a>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="6" class="text-right"><small>Total de Contas: {{ billsCount }}</small></td>
            </tr>
        </tfoot>
    </table>
    `,
    data: function () {
        return {
            bills: this.$root.$children[0].billsReceive
        };
    },
    computed: {
        billsCount: function(){
            var bills = this.$root.$children[0].billsReceive.length;
            return bills;
        }
    },
    methods: {
        delBill: function (index) {
            var bills = this.$root.$children[0].billsReceive;

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
                 if(bills.splice(index, 1).length){
                     swal(
                         'Deletado!',
                         'Registro deletado com sucesso.',
                         'success'
                     );
                 }else{
                     swal(
                         'Erro!',
                         'Não foi possível deletar o registro.',
                         'error'
                     );
                 }
             }).catch(swal.noop);
        }
    }
});