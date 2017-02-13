window.billReceiveCreateComponent = Vue.extend({
    template: `
    <form name="form" @submit.prevent="submit">
        <legend>{{ legendForm }}</legend>
        <div class="form-group">
            <label for="vencimento">Data Pagamento</label>
            <input type="text" class="form-control" name="vencimento" id="vencimento" v-model="bill.date_due" placeholder="Ex: dd/mm/yyyy" required="required" />
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
            <input type="number" step="0.01" class="form-control" name="valor" id="valor" v-model="bill.value"  placeholder="Ex: 12,34" required="required" />
        </div>
        <div class="form-group">
            <div class="checkbox">
                <label>
                    <input type="checkbox" v-model="bill.done"> Recebida?
                </label>
            </div>
        </div>
        <button type="submit" class="btn btn-success btn-block"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span> Salvar</button>
    </form>
    `,
    data: function () {
        return {
            legendForm: 'Cadastrar Conta',
            formType: 'insert',
            names: [
                'Aluguel',
                'Emprestimo',
                'Folha de Pagamento',
                'Serviços',
                'Outros'
            ],
            bill: {
                date_due: '',
                name: '',
                value: '',
                done: false
            }
        };
    },
    created: function(){
        if(this.$route.name == 'bill-receive.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit: function () {
            var self = this;
            if(this.formType == 'insert'){
                BillReceive.save({}, this.bill).then(function (response) {
                    eventHub.$emit('change-info');
                    self.$router.push({name: 'bill-receive'});
                });
            }else{
                BillReceive.update({id: this.bill.id}, this.bill).then(function (response) {
                    eventHub.$emit('change-info');
                    self.$router.push({name: 'bill-receive'});
                });
            }
        },
        getBill: function (id) {
            var resource = this.$resource('bills{/id}');
            resource.get({id: id}).then(function (response) {
                this.bill = response.data;
            });
        }
    }
});