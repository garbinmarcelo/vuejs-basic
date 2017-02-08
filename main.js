var mainComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: `<bill-component></bill-component>`,
    data: function () {
        return {
            billsPay: [
                {date_due: '20/12/2016', name: 'Conta de Luz', value: 25.99, done: true},
                {date_due: '20/01/2017', name: 'Conta de Luz', value: 35.99, done: false},
                {date_due: '20/02/2017', name: 'Conta de Luz', value: 45.99, done: false},
                {date_due: '20/03/2017', name: 'Conta de Luz', value: 55.99, done: false},
                {date_due: '20/04/2017', name: 'Conta de Luz', value: 95.99, done: false},
            ],
            billsReceive: [
                {date_due: '20/11/2016', name: 'Folha de Pagamento', value: 783.20, done: true},
                {date_due: '20/12/2016', name: 'Folha de Pagamento', value: 783.20, done: false},
                {date_due: '20/01/2017', name: 'Folha de Pagamento', value: 783.20, done: false},
                {date_due: '20/02/2017', name: 'Folha de Pagamento', value: 833.93, done: false},
                {date_due: '20/03/2017', name: 'Folha de Pagamento', value: 833.93, done: false},
            ]
        };
    }
});


const router = new VueRouter({
    routes: [
        {
            path: '/', component: dashboardComponent,
            name: 'dashboard'
        },
        {
            path: '/bill-pays', component: billPayComponent,
            children: [
                { path: '',
                    component: billPayListComponent,
                    name: 'bill-pay.list'
                },
                { path: 'create',
                    component: billPayCreateComponent,
                    name: 'bill-pay.create'
                },
                { path: ':index/update',
                    component: billPayCreateComponent,
                    name: 'bill-pay.update'
                }
            ]
        },
        {
            path: '/bill-receives', component: billReceiveComponent,
            children: [
                { path: '',
                    component: billReceiveListComponent,
                    name: 'bill-receive'
                },
                { path: 'create',
                    component: billReceiveCreateComponent,
                    name: 'bill-receive.create'
                },
                { path: ':index/update',
                    component: billReceiveCreateComponent,
                    name: 'bill-receive.update'
                }
            ]
        },
        { path: '*',
            redirect: '/'
        }
    ]
});

const app = new Vue({
    router: router,
    components: {
        'main-component': mainComponent
    }
}).$mount('#app');