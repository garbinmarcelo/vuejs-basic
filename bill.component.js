window.billComponent = Vue.extend({
    template: `
    <div>
        <nav>
            <ul class="nav nav-pills">
                <li v-for="o in menus">
                    <router-link :to="{ name: o.routeName }">{{ o.name }}</router-link>
                </li>
            </ul>
        </nav>
        <router-view></router-view>
    </div>
    `,
    data: function () {
        return {
            menus: [
                {name: "Dashboard", routeName: 'dashboard'},
                {name: "Contas a pagar", routeName: 'bill-pay.list'},
                {name: "Contas a receber", routeName: 'bill-receive'}
            ],
        };
    }
});