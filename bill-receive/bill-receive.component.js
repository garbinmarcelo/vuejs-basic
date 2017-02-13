var eventHub = new Vue();

window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component': billReceiveMenuComponent
    },
    template: `
    <div class="row">
        <div class="col-md-12">
            <h1>
                {{ title }}
                <small :class="{'text-danger': total > 0 }">({{ total | currency }})</small>
                <small v-html="this.$options.filters.statusGeneral(status, 'receive')" class="alert pull-right"
                       :class="{
                       'well well-sm alert alert-default text-muted': status === false,
                       'alert alert-danger text-danger': status > 0,
                       'alert alert-success text-success': status === 0
                       }">
                </small>
            </h1>
            <menu-component></menu-component>
        </div>
        <div class="col-md-12">
            <router-view></router-view>
        </div>
    </div>
    `,
    data: function() {
        return {
            title: 'Contas a Receber',
            status: false,
            total: 0
        };
    },
    created: function() {
        eventHub.$on('change-info', this.updateStatus);
        eventHub.$on('change-info', this.updateTotal);
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculateStatus: function (bills) {
            if(!bills.length){
                this.status = false;
            }

            var count = 0;
            for(var i in bills){
                if(!bills[i].done){
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function () {
            var self = this;
            BillReceive.query().then(function (response) {
                self.calculateStatus(response.data);
            });
        },
        updateTotal: function () {
            var self = this;
            BillReceive.total().then(function (response) {
                self.total = response.data.total;
            });
        }
    }
});