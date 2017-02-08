window.billPayMenuComponent = Vue.extend({
    template: `
    <nav>
        <ul class="nav nav-pills">
            <li v-for="o in menus">
                <router-link :to="{ name: o.routeName }">{{ o.name }}</router-link>
            </li>
        </ul>
    </nav>
    `,
    data: function () {
        return {
            menus: [
                {id: 0, name: "Listar Contas", routeName: 'bill-pay.list'},
                {id: 1, name: "Criar Conta", routeName: 'bill-pay.create'}
            ],
        };
    }
});