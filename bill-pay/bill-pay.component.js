window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
    },
    template: `
    <div class="row">
        <div class="col-md-12">
            <h1>
                {{ title }}
                <small v-html="this.$options.filters.statusGeneral(status, 'pay')" class="alert pull-right"
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
            title: 'Contas a Pagar'
        };
    },
    computed: {
        status: function () {
            var bills = this.$root.$children[0].billsPay;
            if(!bills.length){
                return false;
            }

            var count = 0;
            for(var i in bills){
                if(!bills[i].done){
                    count++;
                }
            }
            return count;
        },
    }
});